#!/usr/bin/env node
/**
 * add-project.js
 * Run from your project root: node scripts/add-project.js
 *
 * Interactively prompts you for project or collaborator info
 * and writes it into src/assets/data/projects.json or collaborators.json.
 *
 * No extra dependencies — uses only Node built-ins (readline, fs, path).
 */

const readline = require('readline');
const fs        = require('fs');
const path      = require('path');

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT             = path.resolve(__dirname, '..');
const PROJECTS_PATH    = path.join(ROOT, 'src/assets/data/projects.json');
const COLLAB_PATH      = path.join(ROOT, 'src/assets/data/collaborators.json');

// ── Terminal colours ──────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  yellow: '\x1b[33m',
  green:  '\x1b[32m',
  blue:   '\x1b[34m',
  red:    '\x1b[31m',
  dim:    '\x1b[2m',
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Promisified question so we can use async/await
function ask(question, defaultVal = '') {
  return new Promise(resolve => {
    const hint = defaultVal ? ` ${c.dim}[${defaultVal}]${c.reset}` : '';
    rl.question(`${question}${hint}: `, answer => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

// Ask for a comma-separated list, return trimmed string array
async function askList(question, example = '') {
  const raw = await ask(`${question} ${c.dim}(comma-separated${example ? `, e.g. ${example}` : ''})${c.reset}`);
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

// Read JSON safely
function readJSON(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

// Write JSON with 2-space indent + trailing newline
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ── Banner ────────────────────────────────────────────────────────────────────
function banner() {
  console.log(`
${c.yellow}${c.bold}╔═══════════════════════════════════════╗
║     Huy Nguyen — Portfolio Manager    ║
╚═══════════════════════════════════════╝${c.reset}
`);
}

// ── Add Project ───────────────────────────────────────────────────────────────
async function addProject() {
  console.log(`\n${c.blue}${c.bold}── New Project ─────────────────────────${c.reset}\n`);

  const data     = readJSON(PROJECTS_PATH, { projects: [] });
  const projects = data.projects || [];
  const nextId   = String(projects.length + 1).padStart(2, '0');

  // ── Core fields ──────────────────────────────────────────────────────────
  const name        = await ask(`${c.bold}Project name${c.reset}`);
  const preview     = await ask(`${c.bold}One-line preview${c.reset}`);
  const description = await ask(`${c.bold}Full description${c.reset}`);
  const status      = await ask(`${c.bold}Status${c.reset}`, 'In Progress');
  const image       = await ask(`${c.bold}Image path${c.reset}`, `services/${name.toLowerCase().replace(/\s+/g, '-')}.png`);
  const link        = await ask(`${c.bold}Live link${c.reset}`, '');
  const github      = await ask(`${c.bold}GitHub link${c.reset}`, '');

  // ── Dates ─────────────────────────────────────────────────────────────────
  const startDate = await ask(`${c.bold}Start date${c.reset}`, new Date().toISOString().slice(0, 10));
  const endDate   = await ask(`${c.bold}End date${c.reset}`,   'Present');

  // ── Arrays ────────────────────────────────────────────────────────────────
  const tags         = await askList(`${c.bold}Tags${c.reset}`,         'Unity, Game Development');
  const technologies = await askList(`${c.bold}Technologies${c.reset}`, 'Unity, C#, Python');

  // ── Contributors — loop until done ────────────────────────────────────────
  const contributors = [];
  console.log(`\n${c.dim}Add contributors one by one. Leave name blank to stop.${c.reset}`);
  while (true) {
    const contributor = await ask(`  Contributor name`);
    if (!contributor) break;
    const role = await ask(`  Role for ${contributor}`);
    contributors.push({ contributor, role });
  }

  // ── Build entry ───────────────────────────────────────────────────────────
  const entry = {
    id: nextId,
    name, preview, description, status, image, link, github,
    tags, startDate, endDate, contributors, technologies,
  };

  projects.push(entry);
  writeJSON(PROJECTS_PATH, { projects });

  console.log(`\n${c.green}${c.bold}✓ Project "${name}" added (id: ${nextId})${c.reset}`);
  console.log(`${c.dim}  → ${PROJECTS_PATH}${c.reset}\n`);
}

// ── Edit existing project ─────────────────────────────────────────────────────
async function editProject() {
  const data     = readJSON(PROJECTS_PATH, { projects: [] });
  const projects = data.projects || [];

  if (!projects.length) {
    console.log(`\n${c.red}No projects found.${c.reset}\n`);
    return;
  }

  console.log(`\n${c.blue}${c.bold}── Existing Projects ───────────────────${c.reset}`);
  projects.forEach((p, i) => console.log(`  ${c.yellow}${i + 1}${c.reset}. ${p.name}  ${c.dim}[${p.id}]${c.reset}`));
  console.log();

  const choice = parseInt(await ask(`${c.bold}Which project to edit? (number)${c.reset}`), 10);
  if (isNaN(choice) || choice < 1 || choice > projects.length) {
    console.log(`${c.red}Invalid choice.${c.reset}\n`);
    return;
  }

  const proj = projects[choice - 1];
  console.log(`\n${c.dim}Press Enter to keep existing value.${c.reset}\n`);

  proj.name        = await ask(`${c.bold}Name${c.reset}`,        proj.name);
  proj.preview     = await ask(`${c.bold}Preview${c.reset}`,     proj.preview);
  proj.description = await ask(`${c.bold}Description${c.reset}`, proj.description);
  proj.status      = await ask(`${c.bold}Status${c.reset}`,      proj.status);
  proj.link        = await ask(`${c.bold}Live link${c.reset}`,   proj.link);
  proj.github      = await ask(`${c.bold}GitHub${c.reset}`,      proj.github);
  proj.startDate   = await ask(`${c.bold}Start date${c.reset}`,  proj.startDate);
  proj.endDate     = await ask(`${c.bold}End date${c.reset}`,    proj.endDate);

  const tagsInput  = await ask(`${c.bold}Tags${c.reset} ${c.dim}(comma-sep, blank to keep)${c.reset}`);
  if (tagsInput) proj.tags = tagsInput.split(',').map(s => s.trim()).filter(Boolean);

  const techInput  = await ask(`${c.bold}Technologies${c.reset} ${c.dim}(comma-sep, blank to keep)${c.reset}`);
  if (techInput) proj.technologies = techInput.split(',').map(s => s.trim()).filter(Boolean);

  writeJSON(PROJECTS_PATH, { projects });
  console.log(`\n${c.green}${c.bold}✓ "${proj.name}" updated${c.reset}\n`);
}

// ── Add Collaborator ──────────────────────────────────────────────────────────
async function addCollaborator() {
  console.log(`\n${c.blue}${c.bold}── New Collaborator ────────────────────${c.reset}\n`);

  const data  = readJSON(COLLAB_PATH, { collaborators: [] });
  const colls = data.collaborators || [];

  const name        = await ask(`${c.bold}Full name${c.reset}`);
  const title       = await ask(`${c.bold}Title / role${c.reset}`,        'Collaborator');
  const affiliation = await ask(`${c.bold}Affiliation (university/company)${c.reset}`, '');
  const project     = await ask(`${c.bold}Project you worked together on${c.reset}`,  '');
  const linkedin    = await ask(`${c.bold}LinkedIn URL${c.reset}`,         '');
  const avatar      = await ask(`${c.bold}Avatar image path${c.reset}`,   `collaborators/${name.split(' ')[0].toLowerCase()}.jpg`);
  const note        = await ask(`${c.bold}Short note about them${c.reset}`, '');
  const notable     = (await ask(`${c.bold}Mark as notable/featured?${c.reset}`, 'y')).toLowerCase() === 'y';

  colls.push({ name, title, affiliation, project, linkedin, avatar, note, notable });
  writeJSON(COLLAB_PATH, { collaborators: colls });

  console.log(`\n${c.green}${c.bold}✓ Collaborator "${name}" added${c.reset}`);
  console.log(`${c.dim}  → ${COLLAB_PATH}${c.reset}\n`);
}

// ── List everything ───────────────────────────────────────────────────────────
function listAll() {
  const { projects = [] } = readJSON(PROJECTS_PATH, { projects: [] });
  const { collaborators = [] } = readJSON(COLLAB_PATH, { collaborators: [] });

  console.log(`\n${c.yellow}${c.bold}Projects (${projects.length})${c.reset}`);
  projects.forEach(p => console.log(`  ${c.dim}${p.id}${c.reset}  ${p.name}  ${c.dim}— ${p.status}${c.reset}`));

  console.log(`\n${c.yellow}${c.bold}Collaborators (${collaborators.length})${c.reset}`);
  collaborators.forEach(c2 => console.log(`  ${c2.name}  ${c.dim}— ${c2.title} @ ${c2.affiliation}${c.reset}`));
  console.log();
}

// ── Main menu ─────────────────────────────────────────────────────────────────
async function main() {
  banner();

  const choice = await ask(
    `${c.bold}What would you like to do?${c.reset}\n` +
    `  ${c.yellow}1${c.reset}  Add a new project\n` +
    `  ${c.yellow}2${c.reset}  Edit an existing project\n` +
    `  ${c.yellow}3${c.reset}  Add a collaborator\n` +
    `  ${c.yellow}4${c.reset}  List all projects & collaborators\n` +
    `  ${c.yellow}q${c.reset}  Quit\n\n` +
    `Choice`
  );

  switch (choice) {
    case '1': await addProject();     break;
    case '2': await editProject();    break;
    case '3': await addCollaborator(); break;
    case '4': listAll();              break;
    case 'q':
    case 'Q': console.log(`\n${c.dim}Bye.${c.reset}\n`); break;
    default:  console.log(`${c.red}Unknown option.${c.reset}\n`);
  }

  rl.close();
}

main().catch(err => {
  console.error(`${c.red}Error: ${err.message}${c.reset}`);
  rl.close();
  process.exit(1);
});