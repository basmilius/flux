import { writeGenerated } from './files';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { format } from '../../docs/node_modules/prettier';
import ts from '../../packages/react/node_modules/typescript';
import { root, options } from './api';
import { convert } from './convert';
import { unsupported } from './notes';

const files = [...new Bun.Glob('**/*.vue').scanSync(resolve(root, 'docs/code'))].sort();
const examples: Record<string, { file?: string; reason?: string }> = {};
const output = resolve(root, 'docs/react-examples/generated');
const generated: string[] = [resolve(root, 'docs/react-examples/env.d.ts')];
for (const file of new Bun.Glob('**/*.tsx').scanSync(resolve(root, 'docs/react-examples'))) {
    if (file.startsWith('generated/') || files.includes(file.replace(/\.tsx$/, '.vue'))) continue;
    const source = resolve(root, 'docs/react-examples', file);
    const target = resolve(output, file);
    const content = readFileSync(source, 'utf8');
    mkdirSync(dirname(target), {recursive: true});
    writeGenerated(target, content);
    for (const match of content.matchAll(/from ['"]([^'"\n]+\.scss)['"]|import ['"]([^'"\n]+\.scss)['"]/g)) {
        const stylesheet = match[1] ?? match[2];
        writeGenerated(resolve(dirname(target), stylesheet), readFileSync(resolve(dirname(source), stylesheet), 'utf8'));
    }
    generated.push(target);
}
for (const file of files) {
    const override = resolve(root, 'docs/react-examples', file.replace(/\.vue$/, '.tsx'));
    const target = resolve(output, file.replace(/\.vue$/, '.tsx'));
    try {
        const content = Bun.file(override).size
            ? readFileSync(override, 'utf8')
            : convert(
                  readFileSync(resolve(root, 'docs/code', file), 'utf8'),
                  file,
                  (name, content) => {
                      mkdirSync(dirname(target), { recursive: true });
                      writeGenerated(resolve(dirname(target), name), content);
                  }
              );
        mkdirSync(dirname(target), { recursive: true });
        if (Bun.file(override).size) {
            for (const match of content.matchAll(
                /from ['"]([^'"\n]+\.scss)['"]|import ['"]([^'"\n]+\.scss)['"]/g
            )) {
                const stylesheet = match[1] ?? match[2];
                writeGenerated(
                    resolve(dirname(target), stylesheet),
                    readFileSync(resolve(dirname(override), stylesheet), 'utf8')
                );
            }
        }
        writeGenerated(
            target,
            await format(content, {
                parser: 'typescript',
                tabWidth: 4,
                singleQuote: true,
                trailingComma: 'none',
                printWidth: 100
            })
        );
        examples[file] = { file: target };
        generated.push(target);
    } catch (error) {
        if (existsSync(target)) unlinkSync(target);
        examples[file] = { reason: String((error as Error).message) };
    }
}
const program = ts.createProgram(generated, {
    ...options,
    resolveJsonModule: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    emitDeclarationOnly: false,
    rootDir: root,
    paths: {
        '/assets/*': [resolve(root, 'docs/assets/*')],
        '@flux-ui/react': [resolve(root, 'packages/react/src/index.ts')],
        react: [resolve(root, 'packages/react/node_modules/@types/react')],
        'react/jsx-runtime': [
            resolve(root, 'packages/react/node_modules/@types/react/jsx-runtime.d.ts')
        ],
        'react-dom': [resolve(root, 'packages/react/node_modules/@types/react-dom')],
        luxon: [resolve(root, 'packages/react/node_modules/@types/luxon')],
        clsx: [resolve(root, 'packages/react/node_modules/clsx')],
        '@basmilius/utils': [resolve(root, 'docs/node_modules/@basmilius/utils')]
    },
    types: [],
    noUncheckedSideEffectImports: false
});
const diagnostics = ts.getPreEmitDiagnostics(program);
const failures = new Map<string, string[]>();
for (const diagnostic of diagnostics) {
    if (!diagnostic.file?.fileName.startsWith(output)) continue;
    const file = diagnostic.file.fileName.slice(output.length + 1).replace(/\.tsx$/, '.vue');
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ');
    failures.set(file, [...(failures.get(file) ?? []), message]);
    examples[file] = { reason: 'This example uses an API that differs in the React port.' };
}
let changed = true;
while (changed) {
    changed = false;
    for (const [file, example] of Object.entries(examples)) {
        if (!example.file) continue;
        const source = program.getSourceFile(example.file);
        for (const statement of source?.statements ?? []) {
            if (
                !ts.isImportDeclaration(statement) ||
                !ts.isStringLiteral(statement.moduleSpecifier)
            )
                continue;
            const specifier = statement.moduleSpecifier.text;
            if (!specifier.startsWith('.') || /\.(scss|css|json)$/.test(specifier)) continue;
            const target = resolve(dirname(example.file), specifier.replace(/\.tsx$/, '') + '.tsx');
            const dependency = target.slice(output.length + 1).replace(/\.tsx$/, '.vue');
            if (!examples[dependency] || examples[dependency].file) continue;
            examples[file] = { reason: `Depends on unavailable example ${dependency}.` };
            failures.set(file, [examples[file].reason!]);
            changed = true;
            break;
        }
    }
}
for (const file of failures.keys()) {
    const target = resolve(output, file.replace(/\.vue$/, '.tsx'));
    if (existsSync(target)) unlinkSync(target);
}
writeGenerated(
    resolve(root, 'docs/.vitepress/react/examples.json'),
    JSON.stringify(examples, null, 2) + '\n'
);
writeGenerated(
    resolve(root, 'docs/.vitepress/react/diagnostics.json'),
    JSON.stringify(Object.fromEntries(failures), null, 2) + '\n'
);
console.log(
    `React examples: ${Object.values(examples).filter((v) => v.file).length}/${files.length} typechecked.`
);
const unexpected = Object.entries(examples).filter(
    ([file, example]) => !example.file && !unsupported[file]
);
if (unexpected.length) {
    throw new Error(
        'React examples need attention:\n' +
            unexpected
                .map(
                    ([file, example]) =>
                        `${file}: ${(failures.get(file) ?? [example.reason]).join(' ')}`
                )
                .join('\n')
    );
}
