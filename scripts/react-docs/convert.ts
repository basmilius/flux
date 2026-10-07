import { parse } from '../../docs/node_modules/vue/compiler-sfc';
import ts from '../../packages/react/node_modules/typescript';
import { api } from './api';

const camel = (value: string) => value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
const upper = (value: string) => value[0].toUpperCase() + value.slice(1);
const nativeNames: Record<string, string> = {
    class: 'className',
    for: 'htmlFor',
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    autofocus: 'autoFocus',
    autocomplete: 'autoComplete',
    maxlength: 'maxLength',
    minlength: 'minLength',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule'
};
const eventNames: Record<string, string> = {
    mouseenter: 'MouseEnter',
    mouseleave: 'MouseLeave',
    keydown: 'KeyDown',
    keyup: 'KeyUp',
    dblclick: 'DoubleClick',
    mousedown: 'MouseDown',
    mouseup: 'MouseUp',
    pointerdown: 'PointerDown',
    pointerup: 'PointerUp',
    focusin: 'Focus',
    focusout: 'Blur'
};

export function convert(
    source: string,
    filename: string,
    emitStyle: (name: string, content: string) => void
): string {
    const { descriptor, errors } = parse(source, { filename });
    if (errors.length || !descriptor.template?.ast) throw new Error('Example could not be parsed.');

    const script = ts.createSourceFile(
        filename + '.ts',
        descriptor.scriptSetup?.content ?? descriptor.script?.content ?? '',
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );
    const states = new Set<string>();
    const collections = new Map<string, 'Set' | 'Map'>();
    const refStates = new Set<string>();
    const refs = new Map<string, string>();
    const domRefTags = new Map<string, string>();
    const domRefs = new Map<string, string>();
    const derived = new Set<string>();
    const modelTypes = new Map<string, string>();
    function collectModels(node: any): void {
        for (const prop of node.props ?? []) {
            if (prop.type === 6 && prop.name === 'ref' && /^[a-z]/.test(node.tag))
                domRefTags.set(prop.value.content, node.tag);
            if (
                prop.type === 7 &&
                prop.name === 'model' &&
                /^[a-zA-Z_$][\w$]*$/.test(prop.exp?.content ?? '')
            ) {
                const name = propName(prop.arg?.content ?? 'model-value', node.tag);
                if (api.get(node.tag)?.props.some((p) => p.name === name))
                    modelTypes.set(
                        prop.exp.content,
                        `Exclude<ComponentProps<typeof ${node.tag}>['${name}'], undefined>`
                    );
            }
        }
        for (const child of node.children ?? []) collectModels(child);
    }
    collectModels(descriptor.template.ast);
    const imports = new Set<string>();
    const body: string[] = [];
    const printer = ts.createPrinter();
    const hooks = new Set<string>();
    const extraImports: string[] = [];
    let needsStyleParser = false;
    let generatedState = 0;
    let generatedBranch = 0;
    let createElement = false;

    function expression(text: string, template = false): string {
        const file = ts.createSourceFile(
            'expression.ts',
            text.trim().startsWith('{') ? '(' + text + ')' : text,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS
        );
        const result = ts.transform(file, [
            (context) => {
                function stateRoot(node: ts.Node): string | undefined {
                    while (
                        ts.isPropertyAccessExpression(node) ||
                        ts.isElementAccessExpression(node)
                    )
                        node = node.expression;
                    return ts.isIdentifier(node) && states.has(node.text) ? node.text : undefined;
                }
                const visit: ts.Visitor = (node) => {
                    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && ['add', 'delete', 'clear', 'set'].includes(node.expression.name.text)) {
                        const root = stateRoot(node.expression.expression);
                        if (root) {
                            const kind = collections.get(root);
                            if (!kind || !ts.isExpressionStatement(node.parent)) throw new Error('This example needs immutable React state updates.');
                            const next = ts.factory.createIdentifier('next');
                            return ts.factory.createCallExpression(ts.factory.createIdentifier('set' + upper(root)), undefined, [
                                ts.factory.createArrowFunction(undefined, undefined, [ts.factory.createParameterDeclaration(undefined, undefined, 'current')], undefined, ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), ts.factory.createBlock([
                                    ts.factory.createVariableStatement(undefined, ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration(next, undefined, undefined, ts.factory.createNewExpression(ts.factory.createIdentifier(kind), undefined, [ts.factory.createIdentifier('current')]))], ts.NodeFlags.Const)),
                                    ts.factory.createExpressionStatement(ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(next, node.expression.name), undefined, node.arguments.map(argument => ts.visitNode(argument, visit) as ts.Expression))),
                                    ts.factory.createReturnStatement(next)
                                ], true))
                            ]);
                        }
                    }
                    if (
                        template &&
                        ts.isIdentifier(node) &&
                        refs.has(node.text) &&
                        !domRefs.has(node.text) &&
                        !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node)
                    )
                        return ts.factory.createPropertyAccessExpression(node, 'current');
                    if (
                        ts.isCallExpression(node) &&
                        ts.isPropertyAccessExpression(node.expression) &&
                        ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].includes(
                            node.expression.name.text
                        ) &&
                        stateRoot(node.expression.expression)
                    )
                        throw new Error('This example needs immutable React state updates.');
                    if (
                        ts.isBinaryExpression(node) &&
                        node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
                        node.operatorToken.kind <= ts.SyntaxKind.LastAssignment &&
                        (ts.isPropertyAccessExpression(node.left) ||
                            ts.isElementAccessExpression(node.left))
                    ) {
                        const root = stateRoot(node.left);
                        const refAssignment =
                            ts.isPropertyAccessExpression(node.left) &&
                            ts.isIdentifier(node.left.expression) &&
                            refStates.has(node.left.expression.text) &&
                            node.left.name.text === 'value';
                        if (root && !refAssignment)
                            throw new Error('This example needs immutable React state updates.');
                    }
                    if (
                        ts.isPropertyAccessExpression(node) &&
                        node.name.text === 'value' &&
                        ts.isIdentifier(node.expression)
                    ) {
                        const name = node.expression.text;
                        if (domRefs.has(name)) return ts.factory.createIdentifier(name);
                        if (refStates.has(name)) return ts.factory.createIdentifier(name);
                        if (refs.has(name))
                            return ts.factory.createPropertyAccessExpression(
                                node.expression,
                                'current'
                            );
                        if (derived.has(name)) return node.expression;
                    }
                    if (
                        ts.isBinaryExpression(node) &&
                        node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
                        node.operatorToken.kind <= ts.SyntaxKind.LastAssignment
                    ) {
                        const name = ts.isIdentifier(node.left)
                            ? node.left.text
                            : ts.isPropertyAccessExpression(node.left) &&
                                node.left.name.text === 'value'
                              ? node.left.expression.getText(file)
                              : '';
                        if (states.has(name)) {
                            const rhs = ts.visitNode(node.right, visit) as ts.Expression;
                            const value =
                                node.operatorToken.kind === ts.SyntaxKind.EqualsToken
                                    ? rhs
                                    : ts.factory.createBinaryExpression(
                                          ts.factory.createIdentifier(name),
                                          node.operatorToken.kind -
                                              ts.SyntaxKind.PlusEqualsToken +
                                              ts.SyntaxKind.PlusToken,
                                          rhs
                                      );
                            return ts.factory.createCallExpression(
                                ts.factory.createIdentifier('set' + upper(name)),
                                undefined,
                                [value]
                            );
                        }
                    }
                    if (
                        (ts.isPostfixUnaryExpression(node) || ts.isPrefixUnaryExpression(node)) &&
                        (node.operator === ts.SyntaxKind.PlusPlusToken ||
                            node.operator === ts.SyntaxKind.MinusMinusToken)
                    ) {
                        const name = node.operand.getText(file).replace(/\.value$/, '');
                        if (states.has(name))
                            return ts.factory.createCallExpression(
                                ts.factory.createIdentifier('set' + upper(name)),
                                undefined,
                                [
                                    ts.factory.createBinaryExpression(
                                        ts.factory.createIdentifier(name),
                                        node.operator === ts.SyntaxKind.PlusPlusToken
                                            ? ts.SyntaxKind.PlusToken
                                            : ts.SyntaxKind.MinusToken,
                                        ts.factory.createNumericLiteral(1)
                                    )
                                ]
                            );
                    }
                    if (
                        ts.isCallExpression(node) &&
                        ts.isIdentifier(node.expression) &&
                        node.expression.text === 'unref'
                    )
                        return ts.visitNode(node.arguments[0], visit);
                    if (
                        createElement &&
                        ts.isCallExpression(node) &&
                        ts.isIdentifier(node.expression) &&
                        node.expression.text === 'h'
                    )
                        return ts.factory.updateCallExpression(
                            node,
                            ts.factory.createIdentifier('createElement'),
                            node.typeArguments,
                            node.arguments.map((arg) => ts.visitNode(arg, visit) as ts.Expression)
                        );
                    return ts.visitEachChild(node, visit, context);
                };
                return (node) => ts.visitNode(node, visit) as ts.SourceFile;
            }
        ]);
        const printed = printer
            .printFile(result.transformed[0] as ts.SourceFile)
            .trim()
            .replace(/;$/, '');
        result.dispose();
        return printed;
    }

    for (const statement of script.statements) {
        if (ts.isVariableStatement(statement))
            for (const item of statement.declarationList.declarations) {
                if (
                    !ts.isIdentifier(item.name) ||
                    !item.initializer ||
                    !ts.isCallExpression(item.initializer)
                )
                    continue;
                if (
                    ['ref', 'shallowRef', 'reactive'].includes(
                        item.initializer.expression.getText(script)
                    )
                ) {
                    states.add(item.name.text);
                    const initial = item.initializer.arguments[0];
                    if (initial && ts.isNewExpression(initial) && ts.isIdentifier(initial.expression) && ['Set', 'Map'].includes(initial.expression.text)) collections.set(item.name.text, initial.expression.text as 'Set' | 'Map');
                }
                if (['ref', 'shallowRef'].includes(item.initializer.expression.getText(script)))
                    refStates.add(item.name.text);
                if (item.initializer.expression.getText(script) === 'useTemplateRef')
                    refs.set(
                        item.name.text,
                        item.initializer.arguments[0]?.getText(script).replace(/['"]/g, '') ??
                            item.name.text
                    );
                if (item.initializer.expression.getText(script) === 'computed')
                    derived.add(item.name.text);
            }
    }
    for (const [name, templateName] of refs) {
        const tag = domRefTags.get(templateName);
        if (tag) domRefs.set(name, tag);
    }
    for (const statement of script.statements) {
        if (ts.isImportDeclaration(statement)) {
            const module = (statement.moduleSpecifier as ts.StringLiteral).text;
            if (module === 'vue') {
                const bindings = statement.importClause?.namedBindings;
                if (
                    bindings &&
                    ts.isNamedImports(bindings) &&
                    bindings.elements.some((element) => element.name.text === 'h')
                ) {
                    createElement = true;
                    hooks.add('createElement');
                }
                continue;
            }
            if (
                module === '@basmilius/common' &&
                statement.importClause?.namedBindings &&
                ts.isNamedImports(statement.importClause.namedBindings) &&
                statement.importClause.namedBindings.elements.every(
                    (e) => e.name.text === 'useInterval'
                )
            )
                continue;
            if (module.startsWith('@flux-ui/')) {
                if (
                    statement.importClause?.namedBindings &&
                    ts.isNamedImports(statement.importClause.namedBindings)
                ) {
                    for (const element of statement.importClause.namedBindings.elements)
                        imports.add(
                            (statement.importClause.isTypeOnly || element.isTypeOnly
                                ? 'type '
                                : '') + element.getText(script).replace(/^type /, '')
                        );
                }
            } else if (module.startsWith('.') && module.endsWith('.vue')) {
                extraImports.push(statement.getText(script).replace(module, module.slice(0, -4)));
            } else if (module.endsWith('.json')) {
                extraImports.push(statement.getText(script).replace(module, '../' + module));
            } else if (
                module.startsWith('.') ||
                module.includes('vue') ||
                module === '@basmilius/common'
            ) {
                throw new Error(
                    `This example depends on ${module}; it needs a React-specific implementation.`
                );
            } else
                extraImports.push(
                    statement
                        .getText(script)
                        .replace(
                            /from ['"]echarts\/core['"]/,
                            statement.getText(script).includes('EChartsOption')
                                ? "from 'echarts'"
                                : "from 'echarts/core'"
                        )
                );
        } else if (ts.isVariableStatement(statement)) {
            for (const item of statement.declarationList.declarations) {
                const initial = item.initializer;
                if (initial && ts.isCallExpression(initial)) {
                    const fn = initial.expression.getText(script);
                    const name = item.name.getText(script);
                    const arg = initial.arguments[0]?.getText(script) ?? 'undefined';
                    const type =
                        modelTypes.get(name) ??
                        initial.typeArguments?.map((type) => type.getText(script)).join(', ');
                    if (modelTypes.has(name)) hooks.add('type ComponentProps');
                    if (states.has(name)) {
                        hooks.add('useState');
                        body.push(
                            `const [${name}, set${upper(name)}] = useState${type ? `<${type}>` : ''}(${expression(arg)});`
                        );
                        continue;
                    }
                    if (fn === 'computed') {
                        body.push(`const ${name} = (${expression(arg)})();`);
                        continue;
                    }
                    if (refs.has(name)) {
                        if (domRefs.has(name)) {
                            hooks.add('useState');
                            body.push(
                                `const [${name}, set${upper(name)}] = useState<HTMLElementTagNameMap['${domRefs.get(name)}'] | null>(null);`
                            );
                            continue;
                        }
                        hooks.add('useRef');
                        let refType = type ?? 'HTMLElement';
                        if (refType.includes('InstanceType<')) {
                            hooks.add('type ComponentRef');
                            refType = refType.replace(/InstanceType</g, 'ComponentRef<');
                        }
                        body.push(`const ${name} = useRef<${refType} | null>(null);`);
                        continue;
                    }
                    if (fn.startsWith('define'))
                        throw new Error(
                            'This example has a Vue component contract that needs a React implementation.'
                        );
                }
                body.push(
                    expression(
                        `${statement.declarationList.flags & ts.NodeFlags.Const ? 'const' : 'let'} ${item.getText(script)};`
                    ) + ';'
                );
            }
        } else if (
            ts.isExpressionStatement(statement) &&
            ts.isCallExpression(statement.expression) &&
            statement.expression.expression.getText(script) === 'useInterval'
        ) {
            if (statement.expression.arguments.length !== 2)
                throw new Error('This interval needs a React effect.');
            hooks.add('useEffect');
            const [delay, callback] = statement.expression.arguments;
            body.push(
                `useEffect(() => {const timer = setInterval(${expression(callback.getText(script))}, ${expression(delay.getText(script))}); return () => clearInterval(timer);}, [${[...states].join(', ')}]);`
            );
        } else if (
            ts.isExpressionStatement(statement) &&
            ts.isCallExpression(statement.expression) &&
            ['onMounted', 'onUnmounted', 'onBeforeUnmount', 'watch', 'watchEffect'].includes(
                statement.expression.expression.getText(script)
            )
        ) {
            throw new Error('This example needs React effect and cleanup handling.');
        } else
            body.push(
                expression(statement.getText(script)) +
                    (ts.isFunctionDeclaration(statement) ||
                    ts.isInterfaceDeclaration(statement) ||
                    ts.isTypeAliasDeclaration(statement)
                        ? ''
                        : ';')
            );
    }

    function propName(name: string, tag: string): string {
        if (name === 'model-value')
            return api.get(tag)?.props.some((p) => p.name === 'onCheckedChange')
                ? 'checked'
                : 'value';
        if (name === 'is-open' && api.get(tag)?.props.some((p) => p.name === 'open')) return 'open';
        const candidate =
            nativeNames[name] ??
            (name.startsWith('aria-') || name.startsWith('data-') ? name : camel(name));
        const props = api.get(tag)?.props;
        if (props?.some((p) => p.name === candidate)) return candidate;
        if (
            candidate === 'tag' &&
            props?.some((p) => p.name === 'as') &&
            !props.some((p) => p.name === 'tag')
        )
            return 'as';
        const aliases: Record<string, string> = {
            iconBefore: 'iconLeading',
            iconAfter: 'iconTrailing',
            lower: 'min',
            upper: 'max'
        };
        const alias = aliases[candidate];
        if (alias && props?.some((p) => p.name === alias)) return alias;
        return (
            props?.find((p) => p.name.toLowerCase() === candidate.toLowerCase())?.name ?? candidate
        );
    }
    function callback(name: string, props: { name: string }[] | undefined): string {
        const direct = 'on' + upper(name) + 'Change';
        const short = 'on' + upper(name.replace(/^is(?=[A-Z])/, '')) + 'Change';
        return props?.some((p) => p.name === direct)
            ? direct
            : props?.some((p) => p.name === short)
              ? short
              : direct;
    }
    function children(nodes: any[]): string {
        let result = '';
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            const conditional = node.props?.find((p: any) => p.type === 7 && p.name === 'if');
            if (!conditional) {
                result += render(node);
                continue;
            }
            const branches: any[] = [[conditional.exp.content, node]];
            while (index + 1 < nodes.length) {
                const next = nodes[index + 1];
                if (next.type === 2 && !next.content.trim()) {
                    index++;
                    continue;
                }
                const alternative = next.props?.find(
                    (p: any) => p.type === 7 && ['else', 'else-if'].includes(p.name)
                );
                if (!alternative) break;
                index++;
                branches.push([alternative.exp?.content, next]);
            }
            result +=
                '{' +
                branches
                    .map(([condition, branch]) => {
                        const keyed = branch.props.some((prop: any) => prop.name === 'key' || (prop.name === 'bind' && prop.arg?.content === 'key')) ? branch : {...branch, props: [...branch.props, {type: 6, name: 'key', value: {content: `branch-${generatedBranch++}`}}]};
                        return condition ? `${expression(condition, true)} ? (${render(keyed)}) : ` : `(${render(keyed)})`;
                    })
                    .join('') +
                (branches.at(-1)[0] ? 'null' : '') +
                '}';
        }
        return result;
    }
    function render(node: any): string {
        if (node.type === 2)
            return `{${JSON.stringify(node.content)}}`;
        if (node.type === 3) return '';
        if (node.type === 5) return `{${expression(node.content.content, true)}}`;
        if (node.type !== 1) throw new Error(`Unsupported template node ${node.type}`);
        if (node.tag === 'template') {
            const content = node.children.filter(
                (child: any) => child.type !== 3 && (child.type !== 2 || child.content.trim())
            );
            if (
                content.length === 1 &&
                content[0].type === 1 &&
                !content[0].props.some((prop: any) => ['if', 'for'].includes(prop.name))
            ) {
                return render({ ...content[0], props: [...node.props, ...content[0].props] });
            }
        }
        let tag = node.tag;
        if (tag === 'template') {
            tag = 'Fragment';
            hooks.add('Fragment');
        }
        const preview = ['Preview', 'FluxView', 'PreviewColumn'].includes(tag) ? tag : undefined;
        if (preview) {
            tag = preview === 'FluxView' ? 'ReactFluxView' : `React${preview}`;
            extraImports.push(`import {${tag}} from '${'../'.repeat(filename.split('/').length + 1)}.vitepress/react/Preview';`);
        }
        if (
            [
                'RouterLink',
                'RouterView',
                'Transition',
                'TransitionGroup',
                'Teleport',
                'component',
                'slot',
                'ColorPalette',
                'ThemePreview'
            ].includes(tag)
        )
            throw new Error(`${tag} needs a React-specific example.`);
        if (tag.startsWith('Flux') && !api.has(tag))
            throw new Error(`${tag} is not a React component.`);
        if (tag.startsWith('Flux')) imports.add(tag);
        const props: string[] = [];
        let loop: string | undefined;
        let defaultSlot: string | undefined;
        const slots = node.children.filter(
            (child: any) =>
                child.type === 1 &&
                child.tag === 'template' &&
                child.props?.some((p: any) => p.type === 7 && p.name === 'slot')
        );
        const regularChildren = node.children.filter((child: any) => !slots.includes(child));
        const known = api.get(tag)?.props;
        for (const prop of node.props) {
            if (prop.type === 6) {
                const name = propName(prop.name, tag);
                if (name === 'ref') {
                    const ref =
                        [...refs].find(
                            ([, templateName]) => templateName === prop.value?.content
                        )?.[0] ?? prop.value?.content;
                    props.push(`ref={${domRefs.has(ref) ? 'set' + upper(ref) : ref}}`);
                    continue;
                }
                if (name === 'style') {
                    const style = Object.fromEntries(
                        (prop.value?.content ?? '')
                            .split(';')
                            .filter(Boolean)
                            .map((part: string) => {
                                const colon = part.indexOf(':');
                                const key = part.slice(0, colon).trim();
                                return [
                                    key.startsWith('--') ? key : camel(key),
                                    part.slice(colon + 1).trim()
                                ];
                            })
                    );
                    const custom = Object.keys(style).some((key) => key.startsWith('--'));
                    if (custom) imports.add('type FluxStyle');
                    props.push(`style={${JSON.stringify(style)}${custom ? ' as FluxStyle' : ''}}`);
                } else if (
                    prop.value &&
                    ['true', 'false'].includes(prop.value.content) &&
                    known?.find((p) => p.name === name)?.type.includes('boolean')
                )
                    props.push(`${name}={${prop.value.content}}`);
                else if (
                    prop.value &&
                    /^\d+$/.test(prop.value.content) &&
                    known?.find((p) => p.name === name)?.type.match(/number|100 \| 200/)
                )
                    props.push(`${name}={${prop.value.content}}`);
                else
                    props.push(
                        prop.value ? `${name}={${JSON.stringify(prop.value.content)}}` : name
                    );
                continue;
            }
            if (['if', 'else', 'else-if', 'slot'].includes(prop.name)) {
                if (prop.name === 'slot') defaultSlot = prop.exp?.content ?? '{}';
                continue;
            }
            if (prop.name === 'for') {
                loop = prop.exp.content;
                continue;
            }
            if (prop.name === 'bind') {
                if (!prop.arg) props.push(`{...${expression(prop.exp.content)}}`);
                else {
                    if (!prop.arg.isStatic)
                        throw new Error('Dynamic property names need a React implementation.');
                    const name = propName(prop.arg.content, tag);
                    let value = expression(
                        prop.exp?.content ?? prop.arg.content,
                        prop.arg.content !== 'ref'
                    );
                    if (name === 'style') {
                        needsStyleParser = true;
                        value = `parseStyle(${value})`;
                    }
                    if (name === 'className') {
                        extraImports.push("import { clsx } from 'clsx';");
                        value = `clsx(${value})`;
                    }
                    props.push(`${name}={${value}}`);
                }
            } else if (prop.name === 'on') {
                const event = prop.arg?.content;
                if (!event) throw new Error('Event maps need a React implementation.');
                let name = event.startsWith('update:')
                    ? callback(propName(event.slice(7), tag), known)
                    : 'on' + (eventNames[event] ?? upper(camel(event)));
                if (
                    known &&
                    !known.some((p) => p.name === name) &&
                    known.some((p) => p.name === name + 'Change')
                )
                    name += 'Change';
                const handler = expression(prop.exp?.content ?? '() => {}', true);
                const handlerFile = ts.createSourceFile(
                    'handler.ts',
                    `(${handler})`,
                    ts.ScriptTarget.Latest,
                    true
                );
                const handlerStatement = handlerFile.statements[0];
                const handlerExpression =
                    ts.isExpressionStatement(handlerStatement) &&
                    ts.isParenthesizedExpression(handlerStatement.expression)
                        ? handlerStatement.expression.expression
                        : undefined;
                const callable =
                    handlerExpression &&
                    (ts.isArrowFunction(handlerExpression) ||
                        ts.isFunctionExpression(handlerExpression) ||
                        ts.isIdentifier(handlerExpression) ||
                        ts.isPropertyAccessExpression(handlerExpression));
                const mods = (prop.modifiers ?? []).map((m: any) =>
                    typeof m === 'string' ? m : m.content
                );
                if (mods.some((m: string) => !['stop', 'prevent'].includes(m)))
                    throw new Error('Keyboard modifiers need a React event handler.');
                if (callable && !mods.length) props.push(`${name}={${handler}}`);
                else {
                    const actions = [
                        mods.includes('stop') ? '$event.stopPropagation();' : '',
                        mods.includes('prevent') ? '$event.preventDefault();' : ''
                    ].join('');
                    props.push(
                        `${name}={(${handler.includes('$event') || actions ? '$event' : ''}) => {${actions}${callable ? `(${handler})($event)` : handler};}}`
                    );
                }
            } else if (prop.name === 'model') {
                const name = propName(prop.arg?.content ?? 'model-value', tag);
                const value = expression(prop.exp.content);
                if (!states.has(value)) {
                    const nested = value.match(/^(\w+)(?:\[([^\]]+)\]|\.(\w+))$/);
                    if (!nested || !states.has(nested[1]))
                        throw new Error('Nested controlled state needs a React state update.');
                    const key = nested[2] ?? JSON.stringify(nested[3]);
                    props.push(
                        `${name}={${value}}`,
                        `${callback(name, known)}={(next) => set${upper(nested[1])}(current => ({...current, [${key}]: next}))}`
                    );
                    continue;
                }
                props.push(
                    `${name}={${value}}`,
                    `${callback(name, known)}={${tag === 'FluxFormInput' ? '(next) => set' + upper(value) + "(next ?? '')" : 'set' + upper(value)}}`
                );
            } else if (prop.name === 'height-transition') {
                imports.add('useHeightTransition');
                const refName = `heightTransition${body.length}`;
                body.push(`const ${refName} = useHeightTransition();`);
                props.push(`ref={${refName}}`);
            } else if (prop.name === 'show') {
                throw new Error('Conditional visibility needs a React example.');
            } else throw new Error(`The ${prop.name} directive needs a React implementation.`);
        }
        const columnSlots =
            tag === 'FluxDataTable'
                ? slots.filter((slot: any) => {
                      const directive = slot.props.find(
                          (p: any) => p.type === 7 && p.name === 'slot'
                      );
                      return (
                          directive.arg?.content !== 'header' &&
                          ![
                              'filter',
                              'footer',
                              'empty',
                              'loading',
                              'pagination',
                              'expandable',
                              'selection',
                              'group'
                          ].includes(directive.arg?.content)
                      );
                  })
                : [];
        if (columnSlots.length) {
            const headerSlot = slots.find((slot: any) =>
                slot.props.some((p: any) => p.name === 'slot' && p.arg?.content === 'header')
            );
            const headers = headerSlot?.children.filter((child: any) => child.type === 1) ?? [];
            const columns = columnSlots.map((slot: any, index: number) => {
                const directive = slot.props.find((p: any) => p.type === 7 && p.name === 'slot');
                const header = headers[index];
                const headerContent = header
                    ? children(header.children)
                    : JSON.stringify(directive.arg.content);
                const values = (header?.props ?? [])
                    .filter((p: any) =>
                        [
                            'is-sortable',
                            'sort',
                            'data-type',
                            'vertical-align',
                            'width',
                            'min-width',
                            'max-width',
                            'is-shrinking',
                            'is-grow',
                            'pinned',
                            'align',
                            'is-numeric',
                            'no-wrap'
                        ].includes(p.name === 'bind' ? p.arg?.content : p.name)
                    )
                    .map((p: any) => {
                        const rawName = camel(p.name === 'bind' ? p.arg.content : p.name);
                        const name = rawName === 'isSortable' ? 'sortable' : rawName;
                        const value =
                            p.name === 'bind'
                                ? expression(p.exp.content)
                                : p.value
                                  ? JSON.stringify(p.value.content)
                                  : name === 'pinned'
                                    ? "'start'"
                                    : 'true';
                        return `${name}: ${value}`;
                    });
                const onSort = header?.props.find((p: any) => p.name === 'on' && p.arg?.content === 'sort');
                if (onSort) values.push(`onSort: ($event) => {${expression(onSort.exp.content)}}`);
                let content = slot.children.filter(
                    (child: any) => child.type !== 2 || child.content.trim()
                );
                if (content.length === 1 && content[0].tag === 'FluxTableCell') {
                    const cell = content[0];
                    const attributes = cell.props.filter((p: any) => p.type === 6 || p.name === 'bind').map((p: any) => {
                        const name = propName(p.type === 6 ? p.name : p.arg.content, 'FluxTableCell');
                        const value = p.type === 6 ? p.value ? JSON.stringify(p.value.content) : 'true' : expression(p.exp.content);
                        return `${JSON.stringify(name)}: ${value}`;
                    });
                    if (attributes.length) values.push(`cellProps: (row, rowIndex) => {const slotProps = {item: row, index: rowIndex}; const ${directive.exp?.content ?? '{}'} = slotProps; return {${attributes.join(', ')}};}`);
                    content = cell.children;
                }
                return `{key: ${JSON.stringify(directive.arg.content)}, header: <>${headerContent}</>, ${values.length ? values.join(', ') + ',' : ''} render: (row, rowIndex) => {const slotProps = {item: row, index: rowIndex}; const ${directive.exp?.content ?? '{}'} = slotProps; return <>${children(content)}</>;}}`;
            });
            props.push(`columns={[${columns.join(',')}]}`);
        }
        if (tag === 'FluxWindow' && slots.length) {
            const views = slots.map((slot: any) => {
                const directive = slot.props.find((p: any) => p.type === 7 && p.name === 'slot');
                return `${JSON.stringify(directive.arg?.content ?? 'default')}: (${directive.exp?.content ?? ''}) => <>${children(slot.children)}</>`;
            });
            props.push(`views={{${views.join(',')}}}`);
        }
        for (const slot of tag === 'FluxWindow' ? [] : slots) {
            if (
                columnSlots.includes(slot) ||
                (columnSlots.length &&
                    slot.props.some((p: any) => p.name === 'slot' && p.arg?.content === 'header'))
            )
                continue;
            const directive = slot.props.find((p: any) => p.type === 7 && p.name === 'slot');
            let name =
                directive.arg?.content === 'default'
                    ? 'children'
                    : camel(directive.arg?.content ?? 'children');
            if (tag === 'FluxFormField' && name === 'value') name = 'valueLabel';
            if (known?.some((p) => p.name === name + 'Content')) name += 'Content';
            const content = `<>${children(slot.children)}</>`;
            const type = known?.find((p) => p.name === name)?.type ?? '';
            const callable = type.includes('=>');
            if (directive.exp && !callable)
                throw new Error(`${tag}.${name} does not accept this render prop in React.`);
            props.push(
                `${name}={${callable ? `(${directive.exp?.content ?? ''}) => (${content})` : content}}`
            );
        }
        if (
            ['FluxOverlay', 'FluxSlideOver', 'FluxSheet'].includes(tag) &&
            !props.some((p) => p.startsWith('open='))
        ) {
            const condition = regularChildren
                .find((c: any) => c.type === 1)
                ?.props?.find((p: any) => p.name === 'if')?.exp?.content;
            if (condition) props.push(`open={${expression(condition)}}`);
        }
        for (const [valueName, changeName, initial] of [
            ['value', 'onValueChange', '0'],
            ['isExpanded', 'onExpandedChange', 'false'],
            ['page', 'onNavigate', '1'],
            ['perPage', 'onLimitChange', '10']
        ] as const) {
            if (
                !known?.some((p) => p.name === changeName && !p.optional) ||
                props.some((p) => p.startsWith(changeName + '='))
            )
                continue;
            const existing = props.findIndex((p) => p.startsWith(valueName + '='));
            if (existing >= 0 && !['page', 'perPage'].includes(valueName)) continue;
            const state = `exampleValue${generatedState++}`;
            hooks.add('useState');
            const start =
                existing >= 0
                    ? props.splice(existing, 1)[0].slice(valueName.length + 2, -1)
                    : initial;
            body.push(`const [${state}, set${upper(state)}] = useState(${start});`);
            props.push(`${valueName}={${state}}`, `${changeName}={set${upper(state)}}`);
        }
        const outerProps = props.filter(
            (p) =>
                /^(style|className)=/.test(p) &&
                known &&
                !known.some((k) => k.name === p.slice(0, p.indexOf('=')))
        );
        for (const prop of outerProps) props.splice(props.indexOf(prop), 1);
        const childType = known?.find((p) => p.name === 'children')?.type;
        if (tag === 'FluxProgressRing' && defaultSlot === '{progress}') defaultSlot = 'progress';
        let content = children(regularChildren);
        if (content.trim() && (defaultSlot || childType?.includes('=>')))
            content = `{(${defaultSlot ?? ''}) => (<>${content}</>)}`;
        let element = `<${tag}${props.length ? ' ' + props.join(' ') : ''}>${content}</${tag}>`;
        if (outerProps.length) element = `<div ${outerProps.join(' ')}>${element}</div>`;
        if (!loop) return element;
        const match = loop.match(/^\s*(?:\((.*?)\)|([^\s]+))\s+(?:in|of)\s+([\s\S]+)$/);
        if (!match) throw new Error('Loop could not be converted.');
        const items = expression(match[3]);
        const iterable = /^\d+$/.test(items)
            ? `Array.from({length: ${items}}, (_, i) => i + 1)`
            : items;
        return `{(${iterable}).map((${match[1] ?? match[2]}) => (${element}))}`;
    }
    let jsx = children(descriptor.template.ast.children);
    const scope = 'react-example-' + Bun.hash(filename).toString(36);
    for (const [index, style] of descriptor.styles.entries()) {
        const name =
            filename.split('/').at(-1)!.replace('.vue', '') +
            `-${index}` +
            (style.module ? '.module' : '') +
            '.scss';
        emitStyle(name, style.module ? style.content : `@scope (.${scope}) {\n${style.content}\n}`);
        extraImports.push(style.module ? `import $style from './${name}';` : `import './${name}';`);
    }
    if (descriptor.styles.some(style => !style.module))
        jsx = `<div className="${scope}" style={{width: '100%'}}>${jsx}</div>`;
    if (needsStyleParser) hooks.add('type CSSProperties');
    const output = [
        hooks.size ? `import { ${[...hooks].sort().join(', ')} } from 'react';` : '',
        imports.size ? `import { ${[...imports].sort().join(', ')} } from '@flux-ui/react';` : '',
        ...new Set(extraImports),
        needsStyleParser
            ? `function parseStyle(value: CSSProperties | string | undefined): CSSProperties {if (typeof value !== 'string') return value ?? {}; return Object.fromEntries(value.split(';').filter(part => part.includes(':')).map(part => {const colon = part.indexOf(':'); const name = part.slice(0, colon).trim(); return [name.startsWith('--') ? name : name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), part.slice(colon + 1).trim()];}));}`
            : '',
        '\nexport default function Example() {',
        ...body.map((line) =>
            line
                .split('\n')
                .map((part) => '    ' + part)
                .join('\n')
        ),
        `    return (<>${jsx}</>);`,
        '}\n'
    ]
        .filter(Boolean)
        .join('\n');
    return printer.printFile(
        ts.createSourceFile('example.tsx', output, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    );
}
