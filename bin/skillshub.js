#!/usr/bin/env node

/**
 * SkillsHub CLI - Custom skills finder
 * Supports both public and private GitHub/Gitee deployments
 *
 * Usage:
 *   npx skillshub find python
 *   npx skillshub list
 *   npx skillshub install <skill-name>
 *   skillshub config set repo <url>   # Configure custom repo URL
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Config file path
const CONFIG_DIR = path.join(os.homedir(), '.skillshub');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

// Default configuration
const DEFAULT_CONFIG = {
  repoUrl: 'https://github.com/bugger168/skillsHub.git',
  skills: [
    {
      "id": "skillsHub/code-review",
      "name": "code-review",
      "description": "代码审查 - 质量与安全",
      "installs": 100,
      "category": "utility"
    },
    {
      "id": "skillsHub/debugging",
      "name": "debugging",
      "description": "系统化调试方法论",
      "installs": 85,
      "category": "utility"
    },
    {
      "id": "skillsHub/git-workflow",
      "name": "git-workflow",
      "description": "Git工作流管理",
      "installs": 120,
      "category": "utility"
    },
    {
      "id": "skillsHub/python",
      "name": "python",
      "description": "Python开发最佳实践",
      "installs": 200,
      "category": "development"
    },
    {
      "id": "skillsHub/security-review",
      "name": "security-review",
      "description": "安全漏洞审查",
      "installs": 75,
      "category": "development"
    },
    {
      "id": "skillsHub/frontend-design",
      "name": "frontend-design",
      "description": "前端界面设计",
      "installs": 150,
      "category": "design"
    },
    {
      "id": "skillsHub/test-driven-development",
      "name": "test-driven-development",
      "description": "测试驱动开发 (TDD)",
      "installs": 180,
      "category": "testing"
    }
  ]
};

// Load or create config
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch (e) {
    // Ignore errors
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(config) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function findSkills(config, query) {
  if (!query) return config.skills;
  const q = query.toLowerCase();
  return config.skills.filter(s =>
    s.name.includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.category.includes(q)
  );
}

function printSkill(skill) {
  console.log(`\x1b[38;5;145m${skill.name}\x1b[0m \x1b[36m${skill.installs} installs\x1b[0m`);
  console.log(`\x1b[38;5;102m└ ${skill.description}\x1b[0m`);
  console.log();
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help' || cmd === '--help') {
    console.log(`
\x1b[1mSkillsHub CLI\x1b[0m - Custom skills finder

\x1b[1mUsage:\x1b[0m
  skillshub find [query]     Search for skills
  skillshub list             List all skills
  skillshub install <name>   Install a skill
  skillshub config           Show current config
  skillshub config set repo <url>   Set custom repo URL

\x1b[1mExamples:\x1b[0m
  skillshub find python
  skillshub install frontend-design
  skillshub config set repo https://github.mycompany.com/skills/skillsHub.git

\x1b[1mFor private GitHub:\x1b[0m
  1. Fork this repo to your private GitHub
  2. Run: skillshub config set repo <your-private-repo-url>
  3. Use skillshub find/install normally
`);
    return;
  }

  const config = loadConfig();

  if (cmd === 'config') {
    const subCmd = args[1];

    if (subCmd === 'set' && args[2] === 'repo' && args[3]) {
      config.repoUrl = args[3];
      saveConfig(config);
      console.log(`\x1b[32m✓ Repository URL set to: ${args[3]}\x1b[0m`);
      return;
    }

    // Show current config
    console.log('\x1b[1mCurrent configuration:\x1b[0m');
    console.log(`  Repository: ${config.repoUrl}`);
    console.log(`  Skills count: ${config.skills.length}`);
    console.log();
    console.log(`Config file: ${CONFIG_FILE}`);
    return;
  }

  if (cmd === 'find' || cmd === 'search') {
    const query = args.slice(1).join(' ');
    const results = findSkills(config, query);

    if (results.length === 0) {
      console.log(`\x1b[38;5;102mNo skills found for "${query}"\x1b[0m`);
      return;
    }

    console.log(`\x1b[38;5;102mInstall with\x1b[0m npx skills add ${config.repoUrl} --skill <name> -g -y --full-depth`);
    console.log();

    results.forEach(printSkill);
    return;
  }

  if (cmd === 'list' || cmd === 'ls') {
    console.log(`\x1b[38;5;102mAvailable skills (${config.skills.length}):\x1b[0m`);
    console.log(`\x1b[38;5;102mRepository: ${config.repoUrl}\x1b[0m`);
    console.log();
    config.skills.forEach(printSkill);
    return;
  }

  if (cmd === 'install') {
    const skillName = args[1];
    if (!skillName) {
      console.log('\x1b[31mError: Please specify a skill name\x1b[0m');
      return;
    }

    const skill = config.skills.find(s => s.name === skillName);
    if (!skill) {
      console.log(`\x1b[31mError: Skill "${skillName}" not found\x1b[0m`);
      return;
    }

    console.log(`\x1b[38;5;145mInstalling ${skill.name}...\x1b[0m`);
    console.log();

    const { spawn } = require('child_process');
    const child = spawn('npx', [
      'skills', 'add', config.repoUrl,
      '--skill', skillName,
      '-g', '-y', '--full-depth'
    ], { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code === 0) {
        console.log();
        console.log(`\x1b[32m✓ ${skill.name} installed successfully!\x1b[0m`);
      }
    });
    return;
  }

  console.log(`\x1b[31mUnknown command: ${cmd}\x1b[0m`);
  console.log('Run `skillshub help` for usage.');
}

main();