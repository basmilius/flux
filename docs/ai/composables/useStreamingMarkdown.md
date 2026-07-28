# useStreamingMarkdown

This composable turns a growing markdown string into Vue vnodes, incrementally. It is what [Streaming text](../components/streaming-text) runs on; reach for it directly only when you render a model response somewhere that component does not fit.

Two things make it worth having. It lexes only the part of the document that can still change, so a long answer does not get re-parsed on every token. And it never produces an HTML string: `marked` is used as a lexer, the tokens are rendered straight to vnodes, and raw HTML in the source becomes text. There is no escaping step to get wrong.

While `isStreaming` is true it also repairs the tail. An unterminated code span or bold run is virtually closed, so the text grows instead of flipping between literal and formatted; a half-typed link is held back until its closing bracket arrives, so a partial URL never becomes an anchor.

## Usage

```ts
import { useStreamingMarkdown } from '@flux-ui/ai';
import { h, ref } from 'vue';
import $style from './MyResponse.module.scss';

const content = ref('');
const isStreaming = ref(true);

const {nodes} = useStreamingMarkdown({
    content,
    fadeClass: $style.word,
    isStreaming,
    renderCode: props => h('pre', props.code)
});
```

`nodes` holds one vnode per settled markdown block plus the pending tail. Render them in order; an unchanged block keeps its identity, so Vue skips its subtree entirely.

`renderCode` is called for every fenced block, which is where your own highlighter goes.

## Fading words in

Pass `fadeClass` and every word of the tail that is still being written is wrapped in a `<span>` carrying that class. A word keeps its key while more text arrives, so the animation on it runs exactly once and only the words that just landed move. Leave `fadeClass` out and the response is rendered as plain text nodes.

The class is yours, so the transition is too:

```scss
.word {
    animation: word 300ms ease-out both;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
}

@keyframes word {
    from {
        opacity: 0;
    }
}
```

## Type declarations

```ts
import type { MaybeRefOrGetter, VNode } from 'vue';

export type UseStreamingMarkdownOptions = {
    readonly content: MaybeRefOrGetter<string>;
    readonly fadeClass?: MaybeRefOrGetter<string | null>;
    readonly isStreaming?: MaybeRefOrGetter<boolean>;
    renderCode(props: MarkdownCodeProps): VNode;
};

export type UseStreamingMarkdownReturn = {
    readonly nodes: ComputedRef<VNode[]>;
};

export declare function useStreamingMarkdown(
    options: UseStreamingMarkdownOptions
): UseStreamingMarkdownReturn;
```

## Security

A model response is untrusted input. Links and images are allowlisted by scheme (`http`, `https`, `mailto` and `tel` for links, `http` and `https` for images), and anything else degrades to plain text. Links get `rel="noopener noreferrer nofollow"`, images get `referrerpolicy="no-referrer"`.

::: warning
Images from arbitrary hosts still load, which is a beaconing vector. Add a Content Security Policy if that matters for your application.
:::
