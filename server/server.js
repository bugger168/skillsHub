/**
 * SkillsHub API Server
 *
 * Compatible with skills CLI (npx skills find)
 * Deploy this server in your private network
 *
 * Usage:
 *   SKILLS_API_URL=http://your-server:3000 npx skills find python
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'skills.json');

// Middleware
app.use(express.json());

// Load skills from file
function loadSkills() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading skills:', e);
  }
  return { skills: [] };
}

// Save skills to file
function saveSkills(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Initialize with default skills if empty
function initSkills() {
  const data = loadSkills();
  if (data.skills.length === 0) {
    data.skills = [
      {
        id: "skillsHub/code-review",
        name: "code-review",
        description: "代码审查 - 质量与安全",
        installs: 100,
        source: "skillsHub"
      },
      {
        id: "skillsHub/debugging",
        name: "debugging",
        description: "系统化调试方法论",
        installs: 85,
        source: "skillsHub"
      },
      {
        id: "skillsHub/git-workflow",
        name: "git-workflow",
        description: "Git工作流管理",
        installs: 120,
        source: "skillsHub"
      },
      {
        id: "skillsHub/python",
        name: "python",
        description: "Python开发最佳实践",
        installs: 200,
        source: "skillsHub"
      },
      {
        id: "skillsHub/security-review",
        name: "security-review",
        description: "安全漏洞审查",
        installs: 75,
        source: "skillsHub"
      },
      {
        id: "skillsHub/frontend-design",
        name: "frontend-design",
        description: "前端界面设计",
        installs: 150,
        source: "skillsHub"
      },
      {
        id: "skillsHub/test-driven-development",
        name: "test-driven-development",
        description: "测试驱动开发 (TDD)",
        installs: 180,
        source: "skillsHub"
      }
    ];
    saveSkills(data);
  }
  return data;
}

// =====================================================
// API Routes - Compatible with skills CLI
// =====================================================

/**
 * Search API - Compatible with npx skills find
 * GET /api/search?q=query&limit=10
 */
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const limit = parseInt(req.query.limit) || 10;

  const data = loadSkills();

  let results = data.skills;
  if (query) {
    results = results.filter(skill =>
      skill.name.toLowerCase().includes(query) ||
      (skill.description && skill.description.toLowerCase().includes(query))
    );
  }

  res.json({
    skills: results.slice(0, limit)
  });
});

/**
 * List all skills
 * GET /api/skills
 */
app.get('/api/skills', (req, res) => {
  const data = loadSkills();
  res.json(data);
});

/**
 * Get a single skill
 * GET /api/skills/:name
 */
app.get('/api/skills/:name', (req, res) => {
  const data = loadSkills();
  const skill = data.skills.find(s => s.name === req.params.name);

  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  res.json(skill);
});

/**
 * Add a new skill (for internal use)
 * POST /api/skills
 * Body: { name, description, source, ... }
 */
app.post('/api/skills', (req, res) => {
  const { name, description, source, category, installs } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Skill name is required' });
  }

  const data = loadSkills();

  // Check if already exists
  const existing = data.skills.find(s => s.name === name);
  if (existing) {
    // Update existing
    Object.assign(existing, req.body);
    saveSkills(data);
    return res.json(existing);
  }

  // Add new skill
  const skill = {
    id: `${source || 'skillsHub'}/${name}`,
    name,
    description: description || '',
    installs: installs || 0,
    source: source || 'skillsHub',
    category: category || 'utility',
    ...req.body
  };

  data.skills.push(skill);
  saveSkills(data);

  res.status(201).json(skill);
});

/**
 * Update a skill
 * PUT /api/skills/:name
 */
app.put('/api/skills/:name', (req, res) => {
  const data = loadSkills();
  const index = data.skills.findIndex(s => s.name === req.params.name);

  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  data.skills[index] = { ...data.skills[index], ...req.body };
  saveSkills(data);

  res.json(data.skills[index]);
});

/**
 * Delete a skill
 * DELETE /api/skills/:name
 */
app.delete('/api/skills/:name', (req, res) => {
  const data = loadSkills();
  const index = data.skills.findIndex(s => s.name === req.params.name);

  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  data.skills.splice(index, 1);
  saveSkills(data);

  res.json({ success: true });
});

/**
 * Increment install count
 * POST /api/skills/:name/install
 */
app.post('/api/skills/:name/install', (req, res) => {
  const data = loadSkills();
  const skill = data.skills.find(s => s.name === req.params.name);

  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  skill.installs = (skill.installs || 0) + 1;
  saveSkills(data);

  res.json(skill);
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Web UI (optional)
 */
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>SkillsHub API</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #333; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 8px; overflow-x: auto; }
    .endpoint { margin: 10px 0; padding: 10px; background: #e8f4f8; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>🚀 SkillsHub API Server</h1>
  <p>Your private skills registry is running!</p>

  <h2>Usage with skills CLI</h2>
  <pre>export SKILLS_API_URL=http://your-server:${PORT}
npx skills find python
npx skills find frontend</pre>

  <h2>API Endpoints</h2>
  <div class="endpoint"><code>GET /api/search?q=query&limit=10</code> - Search skills</div>
  <div class="endpoint"><code>GET /api/skills</code> - List all skills</div>
  <div class="endpoint"><code>POST /api/skills</code> - Add new skill</div>
  <div class="endpoint"><code>PUT /api/skills/:name</code> - Update skill</div>
  <div class="endpoint"><code>DELETE /api/skills/:name</code> - Delete skill</div>
</body>
</html>
  `);
});

// Start server
initSkills();
app.listen(PORT, () => {
  console.log(``);
  console.log(`🚀 SkillsHub API Server running on http://localhost:${PORT}`);
  console.log(``);
  console.log(`Usage with skills CLI:`);
  console.log(`  export SKILLS_API_URL=http://your-server:${PORT}`);
  console.log(`  npx skills find python`);
  console.log(``);
});