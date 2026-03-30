# SkillsHub 私有部署方案文档

## 项目概述

将 skills CLI 适配到私有仓库，支持内网环境下的技能发现和安装，同时保留官方仓库的使用方式。

---

## 需求分析

### 1. 适配私有仓库

**目标**: 让 `npx skills add` 命令能够从私有 Git 仓库安装技能。

**解决方案**:
- 使用 Git URL 方式安装：`npx skills add https://your-repo.git --skill <name> --full-depth`
- 支持 GitHub、Gitee、私有 Git 服务器

**验证命令**:
```bash
# 列出私有仓库技能
npx skills add https://github.com/bugger168/skillsHub.git --list --full-depth

# 安装技能
npx skills add https://github.com/bugger168/skillsHub.git --skill python -g -y --full-depth
```

---

### 2. 保留官方仓库用法

**目标**: 用户仍可使用官方 skills.sh 仓库。

**解决方案**:
- 默认情况下 `npx skills find` 搜索官方仓库
- 通过设置环境变量 `SKILLS_API_URL` 切换到私有 API

**验证命令**:
```bash
# 官方仓库
npx skills find python

# 私有仓库
SKILLS_API_URL=http://localhost:3000 npx skills find python
```

---

### 3. skills find 适配私有仓库

**目标**: `npx skills find` 能够搜索私有仓库中的技能。

**解决方案**:
- 部署本地 API 服务（server/server.js）
- 设置 `SKILLS_API_URL` 环境变量
- 创建包装脚本简化使用

**API 接口设计**:
```
GET /api/search?q=<query>&limit=10  # 搜索技能（兼容 skills CLI）
GET /api/skills                      # 列出所有技能
POST /api/skills                     # 添加技能
PUT /api/skills/:name                # 更新技能
DELETE /api/skills/:name             # 删除技能
```

**部署方式**:
```bash
# 方式 1: 直接运行
cd server && node server.js

# 方式 2: Docker
cd server && docker-compose up -d
```

**验证命令**:
```bash
# 测试 API
curl http://localhost:3000/api/search?q=python

# 使用自定义 CLI
./cli/bin/sh-find.js python
```

---

### 4. SKILL.md 不包含具体描述

**目标**: 技能描述完全通过仓库获取，SKILL.md 只作为索引。

**实现方式**:

**仓库根目录 SKILL.md（索引文件）**:
```markdown
---
name: skills-hub
description: 自定义技能仓库
---

# Skills Hub

技能列表见下方或通过 API 获取。

## 技能列表

| 技能 | 分类 | 描述 |
|-----|------|------|
| python | development | Python开发最佳实践 |
...
```

**具体技能 SKILL.md**:
```markdown
---
name: python
description: Python开发最佳实践。用于编写或修改Python代码。
votes: 0
category: development
source: skillsHub
---

# Python Guidelines

[具体技能内容...]
```

**API 数据文件 server/skills.json**:
```json
{
  "skills": [
    {
      "id": "skillsHub/python",
      "name": "python",
      "description": "Python开发最佳实践",
      "installs": 200,
      "source": "skillsHub"
    }
  ]
}
```

---

## 仓库结构

```
skillsHub/
├── SKILL.md                         # 仓库索引
├── .well-known/agent-skills/
│   └── index.json                   # Skills CLI 发现索引
├── skills/                          # 技能定义目录
│   ├── code-review/SKILL.md
│   ├── debugging/SKILL.md
│   ├── frontend-design/SKILL.md
│   ├── git-workflow/SKILL.md
│   ├── python/SKILL.md
│   ├── security-review/SKILL.md
│   └── test-driven-development/SKILL.md
├── server/                          # API 服务端
│   ├── server.js                    # Express API
│   ├── skills.json                  # 技能数据
│   ├── package.json
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── start.bat                    # Windows 启动脚本
│   ├── stop.bat
│   ├── status.bat
│   ├── setup-env.bat                # 环境变量设置
│   ├── skills-find.bat              # 搜索包装脚本
│   └── skills-find                  # Linux/Mac 脚本
├── cli/                             # 自定义 CLI
│   └── bin/skillshub.js
├── data/
│   └── votes.json                   # 投票数据
├── categories.json                  # 分类定义
└── README.md
```

---

## 使用指南

### 管理员：部署服务

```bash
# 1. 克隆仓库
git clone https://github.com/your-org/skillsHub.git
cd skillsHub/server

# 2. 安装依赖
npm install

# 3. 启动服务
node server.js

# 或使用 Docker
docker-compose up -d
```

### 开发者：搜索技能

```bash
# 方式 1: 使用包装脚本
./server/skills-find python

# 方式 2: 设置环境变量
export SKILLS_API_URL=http://your-server:3000
npx skills find python

# 方式 3: 临时指定
SKILLS_API_URL=http://your-server:3000 npx skills find python
```

### 开发者：安装技能

```bash
# 从私有仓库安装
npx skills add https://your-server/skillsHub.git --skill python -g -y --full-depth

# 安装所有技能
npx skills add https://your-server/skillsHub.git --all --full-depth
```

### 管理员：添加新技能

```bash
# 方式 1: 通过 API
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -d '{"name":"new-skill","description":"新技能描述","category":"utility"}'

# 方式 2: 编辑文件
# 1. 创建 skills/new-skill/SKILL.md
# 2. 更新 server/skills.json
# 3. 更新 .well-known/agent-skills/index.json
# 4. 推送到仓库
```

---

## 环境变量

| 变量 | 默认值 | 说明 |
|-----|-------|------|
| `SKILLS_API_URL` | https://skills.sh | API 服务地址 |
| `PORT` | 3000 | API 服务端口 |

---

## 常见问题

### Q1: npx skills find 还是搜索官方仓库？

**原因**: 环境变量未生效。

**解决**:
```bash
# 方式 1: 同一行设置
SKILLS_API_URL=http://localhost:3000 npx skills find python

# 方式 2: 使用包装脚本
./server/skills-find python

# 方式 3: Windows 永久设置
运行 server/setup-env.bat
```

### Q2: 安装时找不到技能？

**原因**: 需要 `--full-depth` 参数。

**解决**:
```bash
npx skills add https://your-repo.git --skill python --full-depth
```

### Q3: 如何切换回官方仓库？

**解决**:
```bash
# 不设置环境变量即可
npx skills find python

# 或清空环境变量
unset SKILLS_API_URL
```

---

## 技术要点

### skills CLI 兼容性

- `SKILLS_API_URL` 环境变量被 skills CLI 源码支持（find.ts:15）
- API 返回格式必须包含 `skills` 数组
- 每个技能需要 `id`, `name`, `installs`, `source` 字段

### Docker 部署

```yaml
# docker-compose.yml
services:
  skillshub-api:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./skills.json:/app/skills.json
    restart: unless-stopped
```

---

## 后续优化

- [ ] 添加 API 认证
- [ ] 实现投票功能 API
- [ ] 添加技能分类筛选
- [ ] 支持技能依赖关系
- [ ] 添加技能版本管理

---

## 参考链接

- 官方 Skills CLI: https://github.com/vercel-labs/skills
- 官方 Skills 仓库: https://skills.sh
- 本项目 GitHub: https://github.com/bugger168/skillsHub
- 本项目 Gitee: https://gitee.com/ai-coding-id/skillsHub