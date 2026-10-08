import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export function writeGenerated(path: string, content: string): void {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) writeFileSync(path, content);
}
