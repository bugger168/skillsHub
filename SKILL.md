---
name: skills-hub
description: 自定义技能仓库 - 支持投票和分类功能
author: haidoon
version: 1.0.0
source: haidoon/skillsHub
---

# Skills Hub

这是一个自定义的 Claude Code 技能仓库，扩展支持以下功能：

- **Vote 投票功能**: 用户可以对技能进行投票，反映技能受欢迎程度
- **Category 分类功能**: 技能按类别组织，便于查找

## 安装技能

使用 skills CLI 从本仓库安装技能：

```bash
npx skills add haidoon/skillsHub@skill-name -g -y
```

## 技能列表

| 技能名称 | 分类 | 描述 | 投票数 |
|---------|------|------|--------|
| [find-skills-custom](./skills/find-skills-custom/SKILL.md) | utility | 自定义技能搜索工具 | 0 |
| [code-review](./skills/code-review/SKILL.md) | utility | 代码审查 - 质量与安全 | 0 |
| [debugging](./skills/debugging/SKILL.md) | utility | 系统化调试方法论 | 0 |
| [git-workflow](./skills/git-workflow/SKILL.md) | utility | Git工作流管理 | 0 |
| [python](./skills/python/SKILL.md) | development | Python开发最佳实践 | 0 |
| [security-review](./skills/security-review/SKILL.md) | development | 安全漏洞审查 | 0 |
| [frontend-design](./skills/frontend-design/SKILL.md) | design | 前端界面设计 | 0 |
| [test-driven-development](./skills/test-driven-development/SKILL.md) | testing | 测试驱动开发 (TDD) | 0 |

## 技能分类

- `utility` - 实用工具类技能
- `development` - 开发辅助技能
- `testing` - 测试相关技能
- `deployment` - 部署运维技能
- `documentation` - 文档生成技能
- `design` - UI/UX 设计技能

## 添加新技能

1. 在 `skills/` 目录下创建技能文件夹
2. 添加 `SKILL.md` 文件，包含必要的 frontmatter 字段：
   ```yaml
   ---
   name: skill-name
   description: 技能描述
   votes: 0
   category: utility|development|testing|deployment|documentation|design
   source: haidoon/skillsHub
   ---
   ```
3. 更新本索引文件的技能列表
4. 更新 `data/votes.json` 添加投票记录

## 投票机制

技能的投票数存储在技能元数据和 `data/votes.json` 中，可通过外部系统同步更新。

---