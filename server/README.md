# SkillsHub API Server

私有部署的 Skills API 服务，兼容 `npx skills find` 命令。

## 快速开始

### 方式 1: 直接运行

```bash
cd server
npm install
npm start
```

### 方式 2: Docker 部署

```bash
cd server
docker-compose up -d
```

### 方式 3: Docker 手动构建

```bash
cd server
docker build -t skillshub-api .
docker run -d -p 3000:3000 skillshub-api
```

## 使用方法

### 配置环境变量

```bash
# 设置 API 地址（指向你的内网服务器）
export SKILLS_API_URL=http://your-server:3000

# 然后正常使用 skills CLI
npx skills find python
npx skills find frontend
```

### 永久配置

在 `~/.bashrc` 或 `~/.zshrc` 中添加：

```bash
export SKILLS_API_URL=http://your-server:3000
```

## API 接口

| 接口 | 方法 | 说明 |
|-----|------|------|
| `/api/search?q=query&limit=10` | GET | 搜索技能（兼容 skills CLI） |
| `/api/skills` | GET | 列出所有技能 |
| `/api/skills/:name` | GET | 获取单个技能 |
| `/api/skills` | POST | 添加新技能 |
| `/api/skills/:name` | PUT | 更新技能 |
| `/api/skills/:name` | DELETE | 删除技能 |
| `/api/skills/:name/install` | POST | 增加安装计数 |

### 添加技能示例

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-custom-skill",
    "description": "我的自定义技能",
    "source": "mycompany/skills",
    "category": "utility",
    "installs": 0
  }'
```

## 数据存储

技能数据存储在 `skills.json` 文件中。可以：

1. 直接编辑 `skills.json` 文件
2. 通过 API 接口管理
3. 使用 Docker volume 持久化数据

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

## 环境变量

| 变量 | 默认值 | 说明 |
|-----|-------|------|
| `PORT` | 3000 | 服务端口 |

## 安全建议

1. 使用 Nginx 反向代理配置 HTTPS
2. 添加 API 认证（如 API Key）
3. 限制内网访问（防火墙规则）