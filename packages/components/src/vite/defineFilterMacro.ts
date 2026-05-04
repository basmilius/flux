import type { Plugin } from 'vite';

const SCRIPT_SETUP_REGEX = /<script\b([^>]*)\bsetup\b([^>]*)>([\s\S]*?)<\/script>/gi;

function defineFilterMacro(): Plugin {
    return {
        name: '@flux-ui/components/define-filter-macro',
        enforce: 'pre',

        transform(code, id) {
            if (!id.endsWith('.vue')) {
                return;
            }

            if (!code.includes('defineFilter')) {
                return;
            }

            let transformed = false;

            const newCode = code.replace(SCRIPT_SETUP_REGEX, (match, before, after, content) => {
                if (!content.includes('defineFilter')) {
                    return match;
                }

                if (content.includes('__filterDefinitionFactory')) {
                    return match;
                }

                if (containsTopLevelCall(content, 'defineOptions')) {
                    return match;
                }

                const wrapped = wrapDefineFilter(content);

                if (wrapped === content) {
                    return match;
                }

                transformed = true;
                return `<script${before}setup${after}>${wrapped}</script>`;
            });

            if (!transformed) {
                return;
            }

            return {
                code: newCode,
                map: null
            };
        }
    };
}

export default defineFilterMacro;

function wrapDefineFilter(content: string): string {
    const range = findTopLevelCall(content, 'defineFilter');

    if (!range) {
        return content;
    }

    const callExpression = content.slice(range.callStart, range.callEnd);
    const replacement = `defineOptions({\n    __filterDefinitionFactory: ${callExpression}\n})`;

    return content.slice(0, range.callStart) + replacement + content.slice(range.callEnd);
}

function containsTopLevelCall(content: string, name: string): boolean {
    return findTopLevelCall(content, name) !== null;
}

type CallRange = {
    readonly callStart: number;
    readonly callEnd: number;
};

function findTopLevelCall(content: string, name: string): CallRange | null {
    let parenDepth = 0;
    let braceDepth = 0;
    let bracketDepth = 0;
    let inString: string | null = null;
    let inComment: 'single' | 'multi' | null = null;

    let i = 0;

    while (i < content.length) {
        const c = content[i];
        const n = content[i + 1];

        if (inComment === 'single') {
            if (c === '\n') {
                inComment = null;
            }

            i++;
            continue;
        }

        if (inComment === 'multi') {
            if (c === '*' && n === '/') {
                inComment = null;
                i += 2;
                continue;
            }

            i++;
            continue;
        }

        if (inString) {
            if (c === '\\') {
                i += 2;
                continue;
            }

            if (c === inString) {
                inString = null;
            }

            i++;
            continue;
        }

        if (c === '/' && n === '/') {
            inComment = 'single';
            i += 2;
            continue;
        }

        if (c === '/' && n === '*') {
            inComment = 'multi';
            i += 2;
            continue;
        }

        if (c === '"' || c === '\'' || c === '`') {
            inString = c;
            i++;
            continue;
        }

        if (c === '(') {
            parenDepth++;
            i++;
            continue;
        }

        if (c === ')') {
            parenDepth--;
            i++;
            continue;
        }

        if (c === '{') {
            braceDepth++;
            i++;
            continue;
        }

        if (c === '}') {
            braceDepth--;
            i++;
            continue;
        }

        if (c === '[') {
            bracketDepth++;
            i++;
            continue;
        }

        if (c === ']') {
            bracketDepth--;
            i++;
            continue;
        }

        const isTopLevel = parenDepth === 0 && braceDepth === 0 && bracketDepth === 0;

        if (!isTopLevel || !content.startsWith(name, i)) {
            i++;
            continue;
        }

        const prevChar = i > 0 ? content[i - 1] : '';

        if (/[A-Za-z0-9_$]/.test(prevChar)) {
            i++;
            continue;
        }

        const afterName = i + name.length;
        const nextChar = content[afterName];

        if (nextChar && /[A-Za-z0-9_$]/.test(nextChar)) {
            i++;
            continue;
        }

        const callOpen = skipGenericAndWhitespace(content, afterName);

        if (callOpen === -1 || content[callOpen] !== '(') {
            i++;
            continue;
        }

        const callClose = matchClosingParen(content, callOpen);

        if (callClose === -1) {
            return null;
        }

        return {
            callStart: i,
            callEnd: callClose + 1
        };
    }

    return null;
}

function skipGenericAndWhitespace(content: string, start: number): number {
    let i = start;

    while (i < content.length && /\s/.test(content[i])) {
        i++;
    }

    if (content[i] !== '<') {
        return i;
    }

    let depth = 1;
    i++;

    while (i < content.length && depth > 0) {
        const c = content[i];

        if (c === '<') {
            depth++;
        } else if (c === '>') {
            depth--;
        }

        i++;
    }

    while (i < content.length && /\s/.test(content[i])) {
        i++;
    }

    return i;
}

function matchClosingParen(content: string, openIndex: number): number {
    let depth = 1;
    let inString: string | null = null;
    let inComment: 'single' | 'multi' | null = null;

    let i = openIndex + 1;

    while (i < content.length) {
        const c = content[i];
        const n = content[i + 1];

        if (inComment === 'single') {
            if (c === '\n') {
                inComment = null;
            }

            i++;
            continue;
        }

        if (inComment === 'multi') {
            if (c === '*' && n === '/') {
                inComment = null;
                i += 2;
                continue;
            }

            i++;
            continue;
        }

        if (inString) {
            if (c === '\\') {
                i += 2;
                continue;
            }

            if (c === inString) {
                inString = null;
            }

            i++;
            continue;
        }

        if (c === '/' && n === '/') {
            inComment = 'single';
            i += 2;
            continue;
        }

        if (c === '/' && n === '*') {
            inComment = 'multi';
            i += 2;
            continue;
        }

        if (c === '"' || c === '\'' || c === '`') {
            inString = c;
            i++;
            continue;
        }

        if (c === '(') {
            depth++;
        } else if (c === ')') {
            depth--;

            if (depth === 0) {
                return i;
            }
        }

        i++;
    }

    return -1;
}
