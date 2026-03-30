# Skills Hub

自定义 Claude Code 技能仓库，支持投票和分类功能。

## 功能特点

- 自定义技能仓库，可托管你自己的技能
- 投票功能：记录每个技能的受欢迎程度
- 分类功能：按类别组织技能便于查找
- 兼容 `npx skills` CLI

## 如何使用

### 列出可用技能

**Gitee:**
```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --list --full-depth
```

**GitHub:**
```bash
npx skills add https://github.com/bugger168/skillsHub --list
```

### 安装特定技能

**Gitee:**
```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --skill <skill-name> -g -y --full-depth
```

**GitHub:**
```bash
npx skills add https://github.com/bugger168/skillsHub --skill <skill-name> -g -y
```

### 安装所有技能

**Gitee:**
```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --all --full-depth
```

**GitHub:**
```bash
npx skills add https://github.com/bugger168/skillsHub --all
```

## 技能分类

| 分类标识 | 中文名 | 描述 |
|---------|-------|------|
| utility | 实用工具 | 通用辅助工具 |
| development | 开发辅助 | 编程开发相关 |
| testing | 测试相关 | 测试框架和工具 |
| deployment | 部署运维 | CI/CD、容器、云服务 |
| documentation | 文档生成 | README、文档工具 |
| design | UI/UX 设计 | 界面设计和无障碍 |

## 仓库结构

```
skillsHub/
├── SKILL.md                              # 技能仓库索引
├── .well-known/agent-skills/index.json   # Skills CLI 索引
├── skills/                               # 技能目录
│   ├── code-review/SKILL.md
│   ├── debugging/SKILL.md
│   ├── frontend-design/SKILL.md
│   ├── git-workflow/SKILL.md
│   ├── python/SKILL.md
│   ├── security-review/SKILL.md
│   └── test-driven-development/SKILL.md
├── data/
│   └── votes.json                        # 投票数据
├── README.md                             # 说明文档
└── categories.json                       # 分类定义
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

## 如何添加新技能

1. 在 `skills/` 目录下创建新的技能文件夹
2. 编写 `SKILL.md` 文件
3. 更新 `data/votes.json` 添加投票记录
4. 更新 `.well-known/agent-skills/index.json`
5. 推送到 Gitee 和 GitHub

## 仓库地址

| 平台 | 地址 |
|-----|------|
| Gitee | https://gitee.com/ai-coding-id/skillsHub |
| GitHub | https://github.com/bugger168/skillsHub |

---