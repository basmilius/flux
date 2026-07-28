# useVirtualList

This composable keeps a long list out of the DOM. It takes a scrolling container, the total number of items and one fixed row height, and reports which slice of the list is in view together with the space that has to be reserved before and after it.

It owns no markup and no rendering. The caller renders the slice between `start` and `end`, and pads the wrapper with `offsetBefore` and `offsetAfter` so the scrollbar keeps the size of the whole list.

## Usage

```ts
import { useVirtualList } from '@flux-ui/internals';
import { computed, ref, useTemplateRef } from 'vue';

const container = useTemplateRef('container');
const items = ref<string[]>([]);

const {end, offsetAfter, offsetBefore, start} = useVirtualList(container, {
    count: computed(() => items.value.length),
    itemHeight: 21
});

const visible = computed(() => items.value.slice(start.value, end.value));
```

```html
<div ref="container" style="overflow: auto; max-height: 300px">
    <div :style="{paddingBlockStart: `${offsetBefore}px`, paddingBlockEnd: `${offsetAfter}px`}">
        <div
            v-for="item of visible"
            :key="item"
            style="height: 21px">
            {{ item }}
        </div>
    </div>
</div>
```

Every row has to be exactly `itemHeight` tall. A row that grows beyond it pushes the ones after it out of place, because the offsets are computed rather than measured.

`overscan` is the number of rows rendered above and below the viewport. Raising it hides the rendering of a fast scroll at the cost of more DOM.

The composable listens for scroll events and observes the container's size, so it follows resizes on its own. Call `measure()` after changing the scroll position outside of a user gesture, and `scrollToIndex(index)` to bring a row to the top of the viewport, or to the bottom with `scrollToIndex(index, 'end')`.

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';
import type { MaybeRefOrGetter, Ref } from 'vue';

export declare function useVirtualList<TElement extends HTMLElement>(
    containerRef: TemplateRef<TElement>,
    options: UseVirtualListOptions
): UseVirtualListReturn;

type UseVirtualListPosition = 'start' | 'end';

type UseVirtualListOptions = {
    readonly count: MaybeRefOrGetter<number>;
    readonly itemHeight: MaybeRefOrGetter<number>;
    readonly overscan?: MaybeRefOrGetter<number>;
};

type UseVirtualListReturn = {
    readonly end: Readonly<Ref<number>>;
    readonly offsetAfter: Readonly<Ref<number>>;
    readonly offsetBefore: Readonly<Ref<number>>;
    readonly start: Readonly<Ref<number>>;
    readonly totalHeight: Readonly<Ref<number>>;
    measure(): void;
    scrollToIndex(index: number, position?: UseVirtualListPosition): void;
};
```
