# Skills Hub

自定义 Claude Code 技能仓库，支持投票和分类功能。

## 功能特点

- 自定义技能仓库，可托管你自己的技能
- 投票功能：记录每个技能的受欢迎程度
- 分类功能：按类别组织技能便于查找
- 兼容 `npx skills` CLI

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

## 如何使用

### 列出可用技能

```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --list --full-depth
```

### 安装特定技能

```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --skill <skill-name> -g -y --full-depth
```

**示例 - 安装 frontend-design:**
```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --skill frontend-design -g -y --full-depth
```

### 安装所有技能

```bash
npx skills add https://gitee.com/ai-coding-id/skillsHub.git --all --full-depth
```

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