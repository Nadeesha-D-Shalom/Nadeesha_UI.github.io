import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// Single source of truth for the portfolio version.
// Change only this value, then run: npm run version:sync
export const VERSION = '5.0.1';

const root = fileURLToPath(new URL('.', import.meta.url));
const args = new Set(process.argv.slice(2));
const semverPattern = /^\d+\.\d+\.\d+$/;
const managedFiles = ['version.js', 'package.json', 'package-lock.json', 'README.md'];

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function expectedFiles() {
  const packageJson = readJson('./package.json');
  const packageLock = readJson('./package-lock.json');
  let readme = readFileSync(new URL('./README.md', import.meta.url), 'utf8');

  packageJson.version = VERSION;
  packageLock.version = VERSION;
  packageLock.packages[''].version = VERSION;
  readme = readme
    .replace(/badge\/version-\d+\.\d+\.\d+-/g, `badge/version-${VERSION}-`)
    .replace(/releases\/tag\/v\d+\.\d+\.\d+/g, `releases/tag/v${VERSION}`);

  return new Map([
    ['package.json', serializeJson(packageJson)],
    ['package-lock.json', serializeJson(packageLock)],
    ['README.md', readme],
  ]);
}

function syncVersion({ check = false } = {}) {
  if (!semverPattern.test(VERSION)) {
    throw new Error(`VERSION must use MAJOR.MINOR.PATCH format. Received: ${VERSION}`);
  }

  const files = expectedFiles();
  const mismatches = [];

  for (const [path, expected] of files) {
    const url = new URL(`./${path}`, import.meta.url);
    const current = readFileSync(url, 'utf8');
    if (current === expected) continue;
    mismatches.push(path);
    if (!check) writeFileSync(url, expected);
  }

  if (check && mismatches.length) {
    throw new Error(`Version ${VERSION} is not synchronized in: ${mismatches.join(', ')}`);
  }

  console.log(check
    ? `Version ${VERSION} is synchronized.`
    : `Synchronized portfolio version ${VERSION} across package files and README.`);
}

function git(...parameters) {
  return execFileSync('git', parameters, { cwd: root, encoding: 'utf8' }).trimEnd();
}

function prepareRelease() {
  syncVersion();

  const changed = git('status', '--short')
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => line.slice(3).replace(/^"|"$/g, ''));
  const unrelated = changed.filter(path => !managedFiles.includes(path));

  if (unrelated.length) {
    throw new Error(`Commit or stash unrelated changes before releasing: ${unrelated.join(', ')}`);
  }

  execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });

  const tag = `v${VERSION}`;
  if (git('tag', '--list', tag)) {
    throw new Error(`Tag ${tag} already exists. Increase VERSION before creating another release.`);
  }

  git('add', ...managedFiles);
  git('commit', '-m', `release: Nadeesha Portfolio ${tag}`);
  git('tag', '-a', tag, '-m', `Nadeesha Portfolio ${tag}`);
  console.log(`Created release commit and local tag ${tag}.`);
  console.log('Publish with: git push origin main --follow-tags');
}

const isMainModule = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  if (args.has('--check')) {
    syncVersion({ check: true });
  } else if (args.has('--release')) {
    prepareRelease();
  } else {
    syncVersion();
  }
}
