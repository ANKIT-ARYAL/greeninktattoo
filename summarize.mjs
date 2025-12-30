import fs from 'fs';
import path from 'path';

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', '.vercel', 'public'];
const TARGET_FILE = 'PROJECT_SUMMARY.md';

function buildTree(dir, prefix = '') {
  let tree = '';
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
      if (IGNORE_DIRS.includes(file)) return;
      const isLast = index === files.length - 1;
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      tree += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;
      if (stats.isDirectory()) {
        tree += buildTree(filePath, `${prefix}${isLast ? '    ' : '│   '}`);
      }
    });
  } catch (e) { return 'Error building tree'; }
  return tree;
}

function getFileSnapshot(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Grabs the first 60 lines to avoid hitting token limits while giving deep context
  const lines = content.split('\n').slice(0, 60).join('\n');
  const todos = content.match(/\/\/ TODO: (.*)/g) || [];
  return { lines, todos };
}

function generateSummary() {
  console.log('🚀 Deep Analysis in progress...');
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  let summary = `# 🧠 Deep Project Intelligence\n\nGenerated: ${new Date().toLocaleString()}\n\n`;

  // 1. System Context
  summary += `## 🛠️ Stack\n- Next.js: ${pkg.dependencies.next}\n- DB: ${pkg.dependencies['@prisma/client'] ? 'Prisma' : 'Other'}\n\n`;
  
  // 2. Structural Map
  summary += `## 📂 Structure\n\`\`\`\n${buildTree('./')}\`\`\`\n\n`;

  // 3. Deep File Analysis
  summary += `## 📄 Logic & Code Implementation\n`;
  
  const foldersToAnalyze = ['./app', './prisma', './lib'];
  
  const walk = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (IGNORE_DIRS.some(d => fullPath.includes(d))) return;

      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (/\.(ts|tsx|prisma)$/.test(file)) {
        const snapshot = getFileSnapshot(fullPath);
        summary += `### 📝 File: ${fullPath}\n`;
        if (snapshot.todos.length > 0) {
          summary += `**Pending:** ${snapshot.todos.join(', ')}\n`;
        }
        summary += `\`\`\`typescript\n${snapshot.lines}\n\`\`\`\n\n---\n`;
      }
    });
  };

  foldersToAnalyze.forEach(folder => {
    if (fs.existsSync(folder)) walk(folder);
  });

  fs.writeFileSync(TARGET_FILE, summary);
  console.log(`✅ Deep Summary generated at ${TARGET_FILE}`);
}

generateSummary();