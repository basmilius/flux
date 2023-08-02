<template>
    <Transition
        @after-enter="afterEnter"
        @enter="enter"
        @leave="leave">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    function afterEnter(elm: Element): void {
        if (!(elm instanceof HTMLElement)) {
            return;
        }

        elm.style.height = 'auto';
    }

    function enter(elm: Element): void {
        if (!(elm instanceof HTMLElement)) {
            return;
        }

        const {width} = getComputedStyle(elm);
        elm.style.position = 'absolute';
        elm.style.width = width;
        elm.style.height = 'auto';
        elm.style.visibility = 'hidden';

        const {height} = getComputedStyle(elm);
        elm.style.removeProperty('position');
        elm.style.removeProperty('width');
        elm.style.removeProperty('visibility');
        elm.style.height = '0';

        // note: force repaint.
        getComputedStyle(elm);

        requestAnimationFrame(() => requestAnimationFrame(() => elm.style.height = height));
    }

    function leave(elm: Element): void {
        if (!(elm instanceof HTMLElement)) {
            return;
        }

        const {height} = getComputedStyle(elm);
        elm.style.height = height;

        // note: force repaint.
        getComputedStyle(elm);

        requestAnimationFrame(() => requestAnimationFrame(() => elm.style.height = '0'));
    }
</script>
