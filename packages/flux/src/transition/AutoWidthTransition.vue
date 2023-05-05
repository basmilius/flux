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
    function afterEnter(elm: HTMLElement): void {
        elm.style.width = 'auto';
    }

    function enter(elm: HTMLElement): void {
        const {height} = getComputedStyle(elm);
        elm.style.position = 'absolute';
        elm.style.height = height;
        elm.style.width = 'auto';
        elm.style.visibility = 'hidden';

        const {width} = getComputedStyle(elm);
        elm.style.removeProperty('position');
        elm.style.removeProperty('height');
        elm.style.removeProperty('visibility');
        elm.style.width = '0';

        // note: force repaint.
        getComputedStyle(elm);

        requestAnimationFrame(() => requestAnimationFrame(() => elm.style.width = width));
    }

    function leave(elm: HTMLElement): void {
        const {width} = getComputedStyle(elm);
        elm.style.width = width;

        // note: force repaint.
        getComputedStyle(elm);

        requestAnimationFrame(() => requestAnimationFrame(() => elm.style.width = '0'));
    }
</script>
