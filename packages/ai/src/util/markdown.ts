import { getDefaults, Lexer, type Links, type MarkedOptions, type Token } from 'marked';

const EMPHASIS_DELIMITERS = ['~', '*', '_'];
const FENCE = /^ {0,3}(`{3,}|~{3,})/;
const INDENT = /^[ \t]/;
const INDENTED = /^(?: {4}|\t)/;
const LIST_MARKER = /^(?:[-*+]|\d{1,9}[.)])(?:[ \t]|$)/;
const WORD = /[\p{L}\p{N}]/u;

const OPTIONS: MarkedOptions = {
    ...getDefaults(),
    breaks: true,
    gfm: true,
    silent: true
};

export type LexMarkdownResult = {
    readonly links: Links;
    readonly tokens: Token[];
};

/**
 * Lexes markdown into block tokens. The given link reference definitions are
 * visible to the source and the returned set adds the ones it defines itself.
 */
export function lexMarkdown(source: string, links: Links): LexMarkdownResult {
    const lexer = new Lexer(OPTIONS);

    Object.assign(lexer.tokens.links, links);

    return {
        links: lexer.tokens.links,
        tokens: lexer.lex(source).slice()
    };
}

/**
 * Returns the offset up to which the blocks in the source can no longer change
 * when more text is appended: the start of the last line that follows a blank
 * line, starts in the first column, sits outside a code fence and does not
 * continue the block before it. Two list items around a blank line are one loose
 * list, so a bullet only qualifies when it opens a list of its own.
 */
export function findBlockBoundary(source: string): number {
    let boundary = 0;
    let fence = '';
    let index = 0;
    let insideList = false;
    let previousBlank = true;

    while (index < source.length) {
        const end = source.indexOf('\n', index);
        const line = source.slice(index, end === -1 ? source.length : end);
        const blank = line.trim().length === 0;

        if (fence) {
            if (line.trimStart().startsWith(fence)) {
                fence = '';
            }

            previousBlank = false;
        } else {
            if (previousBlank && !blank && !INDENT.test(line)) {
                const marker = LIST_MARKER.test(line);

                if (index > 0 && !(marker && insideList)) {
                    boundary = index;
                }

                insideList = marker;
            }

            const opening = FENCE.exec(line);

            fence = opening ? opening[1] : '';
            previousBlank = blank;
        }

        if (end === -1) {
            break;
        }

        index = end + 1;
    }

    return boundary;
}

/**
 * Closes the constructs a stream can be cut off in the middle of, so the tail of
 * a response grows instead of flipping between interpretations. Only the last
 * line is touched, and only when that line is not code.
 */
export function repairStreamingTail(source: string): string {
    if (source.length === 0 || openFence(source)) {
        return source;
    }

    const start = source.lastIndexOf('\n') + 1;
    const line = source.slice(start);

    if (INDENTED.test(line)) {
        return source;
    }

    const trimmed = trimIncompleteLink(line);
    const {masked, suffix} = maskCodeSpans(trimmed);

    return source.slice(0, start) + trimmed + suffix + emphasisSuffix(masked);
}

function emphasisSuffix(line: string): string {
    let suffix = '';

    for (const delimiter of EMPHASIS_DELIMITERS) {
        const stack: number[] = [];
        let index = 0;

        while (index < line.length) {
            if (line[index] === '\\') {
                index += 2;
                continue;
            }

            if (line[index] !== delimiter) {
                index++;
                continue;
            }

            let length = 0;

            while (line[index + length] === delimiter) {
                length++;
            }

            const after = line[index + length] ?? ' ';
            const before = line[index - 1] ?? ' ';
            const canClose = before.trim().length > 0 && (delimiter !== '_' || !WORD.test(after));
            const canOpen = after.trim().length > 0 && (delimiter !== '_' || !WORD.test(before));

            if (canClose && stack.at(-1) === length) {
                stack.pop();
            } else if (canOpen) {
                stack.push(length);
            }

            index += length;
        }

        for (let position = stack.length - 1; position >= 0; position--) {
            suffix += delimiter.repeat(stack[position]);
        }
    }

    return suffix;
}

function maskCodeSpans(line: string): {masked: string; suffix: string} {
    const characters = line.split('');
    const stack: {index: number; length: number}[] = [];
    let index = 0;

    while (index < line.length) {
        if (line[index] === '\\') {
            index += 2;
            continue;
        }

        if (line[index] !== '`') {
            index++;
            continue;
        }

        let length = 0;

        while (line[index + length] === '`') {
            length++;
        }

        const top = stack.at(-1);

        if (top?.length === length) {
            stack.pop();
            characters.fill(' ', top.index, index + length);
        } else {
            stack.push({index, length});
        }

        index += length;
    }

    if (stack.length !== 1) {
        return {masked: characters.join(''), suffix: ''};
    }

    characters.fill(' ', stack[0].index);

    return {masked: characters.join(''), suffix: '`'.repeat(stack[0].length)};
}

function openFence(source: string): string {
    let fence = '';

    for (const line of source.split('\n')) {
        if (fence) {
            if (line.trimStart().startsWith(fence)) {
                fence = '';
            }

            continue;
        }

        const opening = FENCE.exec(line);

        if (opening) {
            fence = opening[1];
        }
    }

    return fence;
}

function trimIncompleteLink(line: string): string {
    let closed = -1;
    let depth = 0;
    let open = -1;

    for (let index = 0; index < line.length; index++) {
        const character = line[index];

        if (character === '\\') {
            index++;
        } else if (character === '[') {
            if (depth === 0) {
                open = index;
            }

            depth++;
        } else if (character === ']' && depth > 0) {
            depth--;

            if (depth === 0) {
                closed = index;
            }
        }
    }

    if (open === -1) {
        return line;
    }

    const cut = () => line.slice(0, line[open - 1] === '!' ? open - 1 : open);

    if (depth > 0) {
        return cut();
    }

    if (line[closed + 1] === '(' && !line.includes(')', closed + 1)) {
        return cut();
    }

    return line;
}
