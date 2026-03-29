# Skills Hub

自定义 Claude Code 技能仓库，支持投票和分类功能。

## 功能特点

- 自定义技能仓库，可托管你自己的技能
- 投票功能：记录每个技能的受欢迎程度
- 分类功能：按类别组织技能便于查找

## 仓库结构

```
skillsHub/
├── SKILL.md                         # 技能仓库索引
├── skills/                          # 技能目录
│   ├── code-review/SKILL.md
│   ├── debugging/SKILL.md
│   ├── frontend-design/SKILL.md
│   ├── git-workflow/SKILL.md
│   ├── python/SKILL.md
│   ├── security-review/SKILL.md
│   └── test-driven-development/SKILL.md
├── data/
│   └── votes.json                   # 投票数据
├── README.md                        # 说明文档
└── categories.json                  # 分类定义
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

## 如何安装技能

由于 `npx skills` CLI 不支持 Gitee，请使用以下方法安装：

### 方法 1: 让 Claude 直接安装（推荐）

在 Claude Code 中说："帮我安装 frontend-design 技能"，Claude 会自动完成安装。

### 方法 2: 手动安装

```bash
# 1. 克隆仓库到临时目录
git clone https://gitee.com/ai-coding-id/skillsHub.git /tmp/skillsHub-temp --depth 1

# 2. 复制技能到 Claude skills 目录
mkdir -p ~/.claude/skills/<skill-name>
cp /tmp/skillsHub-temp/skills/<skill-name>/SKILL.md ~/.claude/skills/<skill-name>/SKILL.md

# 3. 清理临时目录
rm -rf /tmp/skillsHub-temp
```

### 示例：安装 frontend-design

```bash
git clone https://gitee.com/ai-coding-id/skillsHub.git /tmp/skillsHub-temp --depth 1
mkdir -p ~/.claude/skills/frontend-design
cp /tmp/skillsHub-temp/skills/frontend-design/SKILL.md ~/.claude/skills/frontend-design/SKILL.md
rm -rf /tmp/skillsHub-temp
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
3. 更新根目录 `SKILL.md` 的技能列表
4. 更新 `data/votes.json` 添加投票记录
5. 推送到 Gitee

## 后续优化计划

- [ ] 实现投票 API 接口
- [ ] 添加技能评分系统
- [ ] 支持技能依赖关系
- [ ] 添加技能标签系统

---