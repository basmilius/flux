import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const checks = ['playground', 'menus', 'menu-spacing', 'animations', 'open-close', 'menu-prediction', 'form-motion', 'breadcrumbs', 'highlighters', 'sheets', 'calendars', 'overlays', 'tree-select', 'filters', 'kanban', 'charts', 'chart-tooltips', 'tables', 'flow', 'split-view', 'swipe-actions', 'selection', 'window', 'ai', 'focal-point', 'tour', 'toolbars'];
const failures = [];
for (const check of checks) {
    console.log(`\nRunning ${check}`);
    const result = spawnSync(process.execPath, [fileURLToPath(new URL(`./${check}.mjs`, import.meta.url))], {stdio: 'inherit', cwd: fileURLToPath(new URL('../../../', import.meta.url)), env: process.env});
    if (result.status !== 0) failures.push(check);
}
console.log(`${checks.length - failures.length}/${checks.length} browser checks passed.`);
if (failures.length) {console.error('Failed:', failures.join(', ')); process.exitCode = 1;}
