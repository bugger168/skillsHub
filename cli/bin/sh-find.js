#!/usr/bin/env node
/**
 * SkillsHub Find CLI
 *
 * Usage:
 *   sh-find python
 *   sh-find code
 */

const http = require('http');
const https = require('https');

// Configuration
const API_URL = process.env.SKILLS_API_URL || 'http://localhost:3000';
const REPO_URL = process.env.SKILLS_REPO_URL || 'https://github.com/bugger168/skillsHub.git';

// Colors
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[38;5;102m';
const TEXT = '\x1b[38;5;145m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';

// Format installs
function formatInstalls(count) {
  if (!count || count <= 0) return '';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1).replace(/\.0$/, '')}M installs`;
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K installs`;
  return `${count} installs`;
}

// Fetch skills from API
function fetchSkills(query) {
  return new Promise((resolve, reject) => {
    const url = `${API_URL}/api/search?q=${encodeURIComponent(query)}&limit=10`;

    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).skills || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Print banner
function printBanner() {
  console.log(`
${DIM}███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝${RESET}
`);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  const query = args.join(' ') || '';

  printBanner();

  if (!query) {
    console.log(`${DIM}Usage: sh-find <query>${RESET}`);
    console.log(`${DIM}Example: sh-find python${RESET}`);
    console.log();
    return;
  }

  console.log(`${DIM}Install with${RESET} npx skills add ${REPO_URL} --skill <name> -g -y --full-depth`);
  console.log();

  try {
    const skills = await fetchSkills(query);

    if (skills.length === 0) {
      console.log(`${DIM}No skills found for "${query}"${RESET}`);
      return;
    }

    for (const skill of skills) {
      const installs = formatInstalls(skill.installs);
      console.log(`${TEXT}${skill.source || 'skillsHub'}@${skill.name}${RESET}${installs ? ` ${CYAN}${installs}${RESET}` : ''}`);
      console.log(`${DIM}└ ${skill.description || 'No description'}${RESET}`);
      console.log();
    }

    console.log(`${GREEN}✓ Found ${skills.length} skill(s) from ${API_URL}${RESET}`);

  } catch (e) {
    console.log(`${DIM}Error: ${e.message}${RESET}`);
    console.log(`${DIM}Make sure the API server is running at ${API_URL}${RESET}`);
  }
}

main();