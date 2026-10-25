import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const packageRoot = path.resolve(import.meta.dirname, "..", "..");

function resolveModule(from, specifier) {
    if (!specifier.startsWith(".")) return null;

    const base = path.resolve(path.dirname(from), specifier);
    const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.d.ts`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
    return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) ?? null;
}

function collectExports(entry, visited = new Set()) {
    const filename = path.resolve(entry);
    if (visited.has(filename)) return new Set();
    visited.add(filename);

    const source = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true, filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const exports = new Set();

    for (const statement of source.statements) {
        if (ts.isExportDeclaration(statement)) {
            if (statement.exportClause) {
                if (ts.isNamespaceExport(statement.exportClause)) exports.add(statement.exportClause.name.text);
                else for (const element of statement.exportClause.elements) exports.add(element.name.text);
            } else if (statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)) {
                const resolved = resolveModule(filename, statement.moduleSpecifier.text);
                if (resolved) for (const name of collectExports(resolved, visited)) exports.add(name);
            }
            continue;
        }

        const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined;
        if (!modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;

        if ("name" in statement && statement.name && ts.isIdentifier(statement.name)) exports.add(statement.name.text);
        if (ts.isVariableStatement(statement)) {
            for (const declaration of statement.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name)) exports.add(declaration.name.text);
                else if (ts.isArrayBindingPattern(declaration.name)) {
                    for (const element of declaration.name.elements) if (ts.isBindingElement(element) && ts.isIdentifier(element.name)) exports.add(element.name.text);
                }
            }
        }
    }

    return exports;
}

const upstreamPackages = ["components", "application", "ai", "flow", "statistics", "visuals", "internals", "types"];
const expected = new Map();
for (const packageName of upstreamPackages) {
    const names = collectExports(path.join(packageRoot, packageName, "src", "index.ts"));
    for (const name of names) {
        const packages = expected.get(name) ?? [];
        packages.push(packageName);
        expected.set(name, packages);
    }
}

const actual = collectExports(path.join(packageRoot, "react", "src", "index.ts"));
const missing = [...expected].filter(([name]) => !actual.has(name)).sort(([a], [b]) => a.localeCompare(b));

if (missing.length) {
    console.error(`Missing ${missing.length} upstream exports:`);
    for (const [name, packages] of missing) console.error(`- ${name} (${packages.join(", ")})`);
    process.exitCode = 1;
} else {
    console.log(`React exports cover all ${expected.size} public upstream symbols (${actual.size} exports total).`);
}
