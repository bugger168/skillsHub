#!/usr/bin/env node

/**
 * SkillsHub CLI - Custom skills finder
 * Usage:
 *   npx skillshub find python
 *   npx skillshub list
 *   npx skillshub install <skill-name>
 */

const SKILLS = [
  {
    "id": "ai-coding-id/skillsHub/code-review",
    "name": "code-review",
    "description": "代码审查 - 质量与安全",
    "installs": 100,
    "category": "utility",
    "source": "ai-coding-id/skillsHub"
  },
  {
    "id": "ai-coding-id/skillsHub/debugging",
    "name": "debugging",
    "description": "系统化调试方法论",
    "installs": 85,
    "category": "utility",
    "source": "ai-coding-id/skillsHub"
  },
  {
    "id": "ai-coding-id/skillsHub/git-workflow",
    "name": "git-workflow",
    "description": "Git工作流管理",
    "installs": 120,
    "category": "utility",
    "source": "ai-coding-id/skillsHub"
  },
  {
    "id": "ai-coding-id/skillsHub/python",
    "name": "python",
    "description": "Python开发最佳实践",
    "installs": 200,
    "category": "development",
    "source": "ai-coding-id/skillsHub"
  },
  {
    "id": "ai-coding-id/skillsHub/security-review",
    "name": "security-review",
    "description": "安全漏洞审查",
    "installs": 75,
    "category": "development",
    "source": "ai-coding-id/skillsHub"
  },
  {
    "id": "ai-coding-id/skillsHub/frontend-design",
    "name": "frontend-design",
    "description": "前端界面设计",
    "installs": 150,
    "category": "design",
    "source": "ai-coding-id/skillsHub"
  },
  {
    "id": "ai-coding-id/skillsHub/test-driven-development",
    "name": "test-driven-development",
    "description": "测试驱动开发 (TDD)",
    "installs": 180,
    "category": "testing",
    "source": "ai-coding-id/skillsHub"
  }
];

const REPO_URL = "https://gitee.com/ai-coding-id/skillsHub.git";
const GITHUB_URL = "https://github.com/bugger168/skillsHub.git";

function findSkills(query) {
  if (!query) return SKILLS;
  const q = query.toLowerCase();
  return SKILLS.filter(s =>
    s.name.includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.category.includes(q)
  );
}

function printSkill(skill) {
  console.log(`\x1b[38;5;145m${skill.source}@${skill.name}\x1b[0m \x1b[36m${skill.installs} installs\x1b[0m`);
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

\x1b[1mExamples:\x1b[0m
  skillshub find python
  skillshub install frontend-design
`);
    return;
  }

  if (cmd === 'find' || cmd === 'search') {
    const query = args.slice(1).join(' ');
    const results = findSkills(query);

    if (results.length === 0) {
      console.log(`\x1b[38;5;102mNo skills found for "${query}"\x1b[0m`);
      return;
    }

    console.log(`\x1b[38;5;102mInstall with\x1b[0m npx skills add ${GITHUB_URL} --skill <name> -g -y --full-depth`);
    console.log();

    results.forEach(printSkill);
    return;
  }

  if (cmd === 'list' || cmd === 'ls') {
    console.log(`\x1b[38;5;102mAvailable skills (${SKILLS.length}):\x1b[0m`);
    console.log();
    SKILLS.forEach(printSkill);
    return;
  }

  if (cmd === 'install') {
    const skillName = args[1];
    if (!skillName) {
      console.log('\x1b[31mError: Please specify a skill name\x1b[0m');
      return;
    }

    const skill = SKILLS.find(s => s.name === skillName);
    if (!skill) {
      console.log(`\x1b[31mError: Skill "${skillName}" not found\x1b[0m`);
      return;
    }

    console.log(`\x1b[38;5;145mInstalling ${skill.name}...\x1b[0m`);
    console.log();

    // Use npx skills to install
    const { spawn } = require('child_process');
    const child = spawn('npx', [
      'skills', 'add', GITHUB_URL,
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