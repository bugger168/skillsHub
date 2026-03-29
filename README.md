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
│   └── find-skills-custom/
│       └── SKILL.md                 # 技能定义
├── data/                            # 数据目录（可选）
│   └── votes.json                   # 投票数据
├── README.md                        # 说明文档
└── categories.json                  # 分类定义
```

## 技能元数据格式

每个技能的 SKILL.md 使用以下 frontmatter 字段：

```yaml
---
name: skill-name                    # 技能名称（必填）
description: 技能描述                # 简短描述（必填）
author: 作者名                      # 作者（必填）
version: 1.0.0                      # 版本号
install_count: 0                    # 安装次数
votes: 0                            # 投票数
category: utility                   # 分类
source: owner/repo                  # 来源仓库
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

## 如何使用

1. Fork 或克隆本仓库
2. 推送到你的 GitHub
3. 在 Claude Code 中安装技能：

```bash
npx skills add your-username/skillsHub@skill-name -g -y
```

## 如何添加新技能

1. 在 `skills/` 目录下创建新的技能文件夹
2. 编写 `SKILL.md` 文件
3. 更新根目录 `SKILL.md` 的技能列表
4. 推送到 GitHub

## 后续优化计划

- [ ] 实现投票 API 接口
- [ ] 添加技能评分系统
- [ ] 支持技能依赖关系
- [ ] 添加技能标签系统

---