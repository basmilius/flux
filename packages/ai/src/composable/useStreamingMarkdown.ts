import type { Links } from 'marked';
import { computed, type ComputedRef, type MaybeRefOrGetter, toValue, type VNode } from 'vue';
import { findBlockBoundary, lexMarkdown, type MarkdownCodeProps, type MarkdownContext, renderMarkdown, repairStreamingTail } from '~flux/ai/util';

export type UseStreamingMarkdownOptions = {
    readonly content: MaybeRefOrGetter<string>;
    /**
     * The class each word of the growing tail is wrapped in. Leave it out to
     * render the response without a per-word transition.
     */
    readonly fadeClass?: MaybeRefOrGetter<string | null>;
    readonly isStreaming?: MaybeRefOrGetter<boolean>;
    renderCode(props: MarkdownCodeProps): VNode;
};

export type UseStreamingMarkdownReturn = {
    readonly nodes: ComputedRef<VNode[]>;
};

/**
 * Renders growing markdown without paying for the whole document on every token.
 * Blocks behind the last hard boundary are lexed and rendered once and then kept
 * as the same vnodes, which the renderer skips instead of patching, so the work
 * per token stays proportional to the block that is still being written.
 */
export function useStreamingMarkdown(options: UseStreamingMarkdownOptions): UseStreamingMarkdownReturn {
    let links: Links = Object.create(null);
    let settledLength = 0;
    let settledNodes: VNode[] = [];
    let settledTokens = 0;
    let source = '';

    const nodes = computed(() => {
        const content = toValue(options.content).replace(/\r\n?/g, '\n');
        const isStreaming = toValue(options.isStreaming) === true;

        if (!content.startsWith(source)) {
            links = Object.create(null);
            forget();
        }

        source = content;

        // Markdown allows a link reference definition to follow the text that uses
        // it, and that text may already have settled. `build` bails out when the
        // tail defines one, after which the second pass knows it up front.
        const rendered = build(content, isStreaming);

        if (rendered) {
            return rendered;
        }

        forget();

        return build(content, isStreaming) ?? [];
    });

    function forget(): void {
        settledLength = 0;
        settledNodes = [];
        settledTokens = 0;
    }

    function build(content: string, isStreaming: boolean): VNode[] | null {
        let pending = content.slice(settledLength);
        const boundary = findBlockBoundary(pending);

        if (boundary > 0) {
            const settled = lexMarkdown(pending.slice(0, boundary), links);
            const settledContext: MarkdownContext = {fadeClass: null, renderCode: options.renderCode, wordIndex: 0};

            links = settled.links;
            settledNodes = [...settledNodes, ...renderMarkdown(settled.tokens, settledContext, settledTokens)];
            settledTokens += settled.tokens.length;
            settledLength += boundary;
            pending = pending.slice(boundary);
        }

        const {links: pendingLinks, tokens} = lexMarkdown(isStreaming ? repairStreamingTail(pending) : pending, links);

        if (settledNodes.length > 0 && Object.keys(pendingLinks).some(label => !(label in links))) {
            links = pendingLinks;

            return null;
        }

        const pendingContext: MarkdownContext = {
            fadeClass: isStreaming ? toValue(options.fadeClass) ?? null : null,
            renderCode: options.renderCode,
            wordIndex: 0
        };

        return [
            ...settledNodes,
            ...renderMarkdown(tokens, pendingContext, settledTokens)
        ];
    }

    return {nodes};
}
