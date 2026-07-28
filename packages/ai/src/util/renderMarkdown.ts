import type { Token, Tokens } from 'marked';
import { cloneVNode, defineComponent, h, type PropType, type VNode } from 'vue';
import { IMAGE_PROTOCOLS, sanitizeUrl } from './markdown';

// A link that leaves the page: it names a scheme or is protocol relative. A
// relative path and a bare fragment stay in the document.
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

// A word together with the whitespace that leads up to it, or a run of trailing
// whitespace, so splitting and joining a string never loses a space.
const WORD = /\s*\S+|\s+/g;

export type MarkdownChild = VNode | string;

export type MarkdownCodeProps = {
    readonly code: string;
    readonly language?: string;
};

export type WordFade = {
    /**
     * The class that fades one word in. It is set while the tail of the response
     * is still being written and `null` for text that has settled, which renders
     * that text as a plain string again.
     */
    readonly fadeClass: string | null;
    /**
     * Numbers the words of a single render. A word keeps its key while more text
     * arrives, so the renderer reuses its element and the animation on it plays
     * exactly once, which leaves only the newly arrived words fading in.
     */
    wordIndex: number;
};

export type MarkdownContext = WordFade & {
    renderCode(props: MarkdownCodeProps): VNode;
};

/**
 * Holds one rendered block. A block that is done keeps handing over the very same
 * vnode, which leaves its props unchanged, and an unchanged prop makes the
 * renderer skip the whole subtree instead of walking it again on every token.
 */
const MarkdownBlock = defineComponent({
    props: {
        node: {
            required: true,
            type: Object as PropType<VNode>
        }
    },
    setup: props => () => props.node
});

/**
 * Turns marked's block tokens into vnodes. Nothing here ever produces an HTML
 * string: text lands in text vnodes and `html` tokens are rendered as the source
 * they were written as, so markup in a response can never become markup on the
 * page.
 */
export function renderMarkdown(tokens: Token[], context: MarkdownContext, keyOffset: number): VNode[] {
    const nodes: VNode[] = [];

    for (let index = 0; index < tokens.length; index++) {
        const node = renderBlock(tokens[index], context, keyOffset + index);

        if (node) {
            nodes.push(h(MarkdownBlock, {key: keyOffset + index, node}));
        }
    }

    return nodes;
}

function renderBlock(token: Token, context: MarkdownContext, key: number): VNode | null {
    switch (token.type) {
        case 'blockquote':
            return h('blockquote', {key}, renderFlow((token as Tokens.Blockquote).tokens, context));

        case 'checkbox':
            return renderCheckbox(token as Tokens.Checkbox, key);

        case 'code': {
            const code = token as Tokens.Code;

            return cloneVNode(context.renderCode({
                code: code.text,
                language: code.lang?.trim().split(/\s+/)[0] || undefined
            }), {key});
        }

        case 'heading': {
            const heading = token as Tokens.Heading;

            return h(`h${Math.min(Math.max(heading.depth, 1), 6)}`, {key}, renderInline(heading.tokens, context));
        }

        case 'hr':
            return h('hr', {key});

        case 'html':
            return h('p', {key}, renderText((token as Tokens.HTML).text, context));

        case 'list': {
            const list = token as Tokens.List;

            return h(list.ordered ? 'ol' : 'ul', {
                key,
                start: list.ordered && list.start !== 1 && list.start !== '' ? list.start : undefined
            }, list.items.map((item, index) => h('li', {key: index}, renderFlow(item.tokens, context))));
        }

        case 'paragraph':
            return h('p', {key}, renderInline((token as Tokens.Paragraph).tokens, context));

        case 'table':
            return renderTable(token as Tokens.Table, context, key);

        case 'text': {
            const text = token as Tokens.Text;

            return h('p', {key}, text.tokens ? renderInline(text.tokens, context) : renderText(text.text, context));
        }

        default:
            return null;
    }
}

/**
 * Renders the children of a list item or a blockquote, where marked mixes block
 * tokens with the bare `text` tokens of a tight list.
 */
function renderFlow(tokens: Token[], context: MarkdownContext): MarkdownChild[] {
    const children: MarkdownChild[] = [];

    for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];

        if (token.type === 'text') {
            const text = token as Tokens.Text;

            children.push(...(text.tokens ? renderInline(text.tokens, context) : renderText(text.text, context)));
            continue;
        }

        const node = renderBlock(token, context, index);

        if (node) {
            children.push(node);
        }
    }

    return children;
}

function renderInline(tokens: Token[], context: MarkdownContext): MarkdownChild[] {
    const children: MarkdownChild[] = [];

    for (let index = 0; index < tokens.length; index++) {
        const node = renderInlineToken(tokens[index], context, index);

        if (Array.isArray(node)) {
            children.push(...node);
        } else {
            children.push(node);
        }
    }

    return children;
}

function renderInlineToken(token: Token, context: MarkdownContext, key: number): MarkdownChild | MarkdownChild[] {
    switch (token.type) {
        case 'br':
            return h('br', {key});

        case 'checkbox':
            return renderCheckbox(token as Tokens.Checkbox, key);

        case 'codespan':
            return h('code', {key}, renderText((token as Tokens.Codespan).text, context));

        case 'del':
            return h('del', {key}, renderInline((token as Tokens.Del).tokens, context));

        case 'em':
            return h('em', {key}, renderInline((token as Tokens.Em).tokens, context));

        case 'escape':
            return renderText((token as Tokens.Escape).text, context);

        // Both a raw html block and an inline tag arrive as this type. Rendering
        // the source as text is what keeps markup in a response inert.
        case 'html':
            return renderText((token as Tokens.Tag).text, context);

        case 'image': {
            const image = token as Tokens.Image;
            const src = sanitizeUrl(image.href, IMAGE_PROTOCOLS);

            if (!src) {
                return renderText(image.text, context);
            }

            return h('img', {
                key,
                alt: image.text,
                loading: 'lazy',
                referrerpolicy: 'no-referrer',
                src,
                title: image.title || undefined
            });
        }

        case 'link': {
            const link = token as Tokens.Link;
            const href = sanitizeUrl(link.href);
            const children = renderInline(link.tokens, context);

            if (!href) {
                return children;
            }

            const external = EXTERNAL.test(href);

            return h('a', {
                key,
                href,
                rel: external ? 'noopener noreferrer nofollow' : undefined,
                target: external ? '_blank' : undefined,
                title: link.title || undefined
            }, children);
        }

        case 'strong':
            return h('strong', {key}, renderInline((token as Tokens.Strong).tokens, context));

        case 'text': {
            const text = token as Tokens.Text;

            return text.tokens ? renderInline(text.tokens, context) : renderText(text.text, context);
        }

        default:
            return renderText(token.raw, context);
    }
}

function renderCheckbox(token: Tokens.Checkbox, key: number): VNode {
    return h('input', {
        key,
        checked: token.checked,
        disabled: true,
        type: 'checkbox'
    });
}

function renderTable(table: Tokens.Table, context: MarkdownContext, key: number): VNode {
    const cell = (tag: string, content: Tokens.TableCell, index: number) => h(tag, content.align ? {key: index, style: {textAlign: content.align}} : {key: index}, renderInline(content.tokens, context));

    return h('table', {key}, [
        h('thead', h('tr', table.header.map((content, index) => cell('th', content, index)))),
        h('tbody', table.rows.map((row, rowIndex) => h('tr', {key: rowIndex}, row.map((content, cellIndex) => cell('td', content, cellIndex)))))
    ]);
}

/**
 * Splits text into fading words while the response is still being written, and
 * hands it over as one string once the block it sits in has settled.
 */
export function renderText(text: string, fade: WordFade): MarkdownChild[] {
    const {fadeClass} = fade;

    if (!fadeClass) {
        return [text];
    }

    return (text.match(WORD) ?? []).map(word => h('span', {
        key: `word-${fade.wordIndex++}`,
        class: fadeClass
    }, word));
}
