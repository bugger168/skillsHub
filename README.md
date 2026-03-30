# Skills Hub

自定义 Claude Code 技能仓库，支持投票和分类功能。

## 部署方式

### 方式 1: 内网私有部署（推荐）

部署 API 服务到内网，使用 `npx skills find` 直接搜索。

```bash
# 1. 部署服务端
cd server
docker-compose up -d

# 2. 配置环境变量（在开发者机器上）
export SKILLS_API_URL=http://your-server:3000

# 3. 使用 skills CLI
npx skills find python
npx skills find frontend
```

详见 [server/README.md](server/README.md)

### 方式 2: 直接使用仓库

```bash
# 列出技能
npx skills add https://github.com/bugger168/skillsHub --list --full-depth

# 安装技能
npx skills add https://github.com/bugger168/skillsHub --skill python -g -y --full-depth
```

## 技能列表

| 技能 | 分类 | 描述 |
|-----|------|------|
| code-review | utility | 代码审查 - 质量与安全 |
| debugging | utility | 系统化调试方法论 |
| git-workflow | utility | Git工作流管理 |
| python | development | Python开发最佳实践 |
| security-review | development | 安全漏洞审查 |
| frontend-design | design | 前端界面设计 |
| test-driven-development | testing | 测试驱动开发 (TDD) |

## 仓库结构

```
skillsHub/
├── server/                        # API 服务端（内网部署）
│   ├── server.js                  # Express API 服务
│   ├── Dockerfile                 # Docker 镜像
│   ├── docker-compose.yml         # Docker Compose
│   └── README.md                  # 部署文档
├── bin/
│   └── skillshub.js               # 自定义 CLI（可选）
├── skills/                        # 技能目录
│   ├── code-review/SKILL.md
│   ├── debugging/SKILL.md
│   ├── frontend-design/SKILL.md
│   ├── git-workflow/SKILL.md
│   ├── python/SKILL.md
│   ├── security-review/SKILL.md
│   └── test-driven-development/SKILL.md
├── data/
│   └── votes.json                 # 投票数据
├── .well-known/agent-skills/
│   └── index.json                 # Skills CLI 索引
├── SKILL.md                       # 技能仓库索引
└── README.md                      # 说明文档
```

## 内网部署架构

```
┌─────────────────────────────────────────────────────────┐
│                    公司内网                              │
│                                                         │
│  ┌─────────────┐        ┌─────────────────────────────┐ │
│  │ 开发者机器   │        │    SkillsHub API Server     │ │
│  │             │        │    (http://skillshub:3000)   │ │
│  │ SKILLS_API_ │ ──────▶│                             │ │
│  │ URL=...     │        │    - /api/search            │ │
│  │             │        │    - /api/skills            │ │
│  │ npx skills  │        │    - skills.json            │ │
│  │ find python │        │                             │ │
│  └─────────────┘        └─────────────────────────────┘ │
│                                        │                │
│                                        ▼                │
│                              ┌─────────────────────┐   │
│                              │  私有 Git 仓库       │   │
│                              │  (技能源代码)        │   │
│                              └─────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 技能元数据格式

每个技能的 SKILL.md 使用以下 frontmatter 字段：

```yaml
---
name: skill-name                    # 技能名称（必填）
description: 技能描述                # 简短描述（必填）
votes: 0                            # 投票数
category: utility                   # 分类
source: ai-coding-id/skillsHub      # 来源仓库
---
```

## 分类定义

| 分类标识 | 中文名 | 描述 |
|---------|-------|------|
| utility | 实用工具 | 通用辅助工具 |
| development | 开发辅助 | 编程开发相关 |
| testing | 测试相关 | 测试框架和工具 |
| deployment | 部署运维 | CI/CD、容器、云服务 |
| documentation | 文档生成 | README、文档工具 |
| design | UI/UX 设计 | 界面设计和无障碍 |

## 如何添加新技能

1. 在 `skills/` 目录下创建新的技能文件夹
2. 编写 `SKILL.md` 文件
3. 更新 `data/votes.json` 添加投票记录
4. 更新 `.well-known/agent-skills/index.json`
5. 更新 `server/skills.json`（如果使用 API 服务）
6. 推送到 Gitee 和 GitHub

## 仓库地址

| 平台 | 地址 |
|-----|------|
| Gitee | https://gitee.com/ai-coding-id/skillsHub |
| GitHub | https://github.com/bugger168/skillsHub |

---