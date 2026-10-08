import ts from '../../packages/react/node_modules/typescript';
import { resolve } from 'node:path';

export const root = resolve(import.meta.dir, '../..');
export const config = ts.readConfigFile(
    resolve(root, 'packages/react/tsconfig.json'),
    ts.sys.readFile
).config;
export const options = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    resolve(root, 'packages/react')
).options;
const program = ts.createProgram([resolve(root, 'packages/react/src/index.ts')], options);
const checker = program.getTypeChecker();
const entry = program.getSourceFile(resolve(root, 'packages/react/src/index.ts'))!;
export const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(entry)!);
export const api = new Map<
    string,
    {
        signature: string;
        props: {
            name: string;
            type: string;
            optional: boolean;
            native: boolean;
            default?: string;
        }[];
    }
>();

for (const symbol of exports) {
    const type = checker.getTypeOfSymbolAtLocation(symbol, entry);
    const signature = type.getCallSignatures()[0];
    if (!signature) continue;
    const parameter = signature.parameters[0];
    const defaults = new Map<string, string>();
    const declaration = signature.getDeclaration();
    const binding = declaration?.parameters[0]?.name;
    if (binding && ts.isObjectBindingPattern(binding)) {
        for (const element of binding.elements) {
            if (element.initializer)
                defaults.set(
                    element.propertyName?.getText() ?? element.name.getText(),
                    element.initializer.getText()
                );
        }
    }
    api.set(symbol.name, {
        signature: checker.signatureToString(signature, undefined, ts.TypeFormatFlags.NoTruncation),
        props: parameter
            ? checker
                  .getTypeOfSymbolAtLocation(parameter, entry)
                  .getProperties()
                  .map((property) => ({
                      name: property.name,
                      type: checker.typeToString(
                          checker.getTypeOfSymbolAtLocation(property, entry),
                          undefined,
                          ts.TypeFormatFlags.NoTruncation
                      ),
                      optional: Boolean(property.flags & ts.SymbolFlags.Optional),
                      native: !property.declarations?.some((d) =>
                          d.getSourceFile().fileName.includes('/packages/react/src/')
                      ),
                      default: defaults.get(property.name)
                  }))
            : []
    });
}
