import {cssFiles, gridReport} from './density-css';

const args = process.argv.slice(2);
const unknown = args.filter(arg => arg.startsWith('--') && !['--check', '--json'].includes(arg));
if (unknown.length) throw new Error(`Unknown options: ${unknown.join(', ')}`);
const files = cssFiles(args.filter(arg => !arg.startsWith('--')).length ? args.filter(arg => !arg.startsWith('--')) : undefined);
const report = gridReport(files);

if (args.includes('--json')) {
    console.log(JSON.stringify(report, null, 4));
} else {
    console.table(report.counts);
    for (const hit of report.hits) console.log(hit);
    console.log(`${report.hits.length} off-grid px values (${args.includes('--check') ? 'check' : 'report'} mode).`);
}

process.exitCode = args.includes('--check') && report.hits.length ? 1 : 0;
