<template>
    <transition
        @after-enter="afterEnter"
        @enter="enter"
        @leave="leave">
        <slot/>
    </transition>
</template>

<script
    lang="ts"
    setup>
    function afterEnter(elm: HTMLElement): void {
        elm.style.height = 'auto';
    }

    function enter(elm: HTMLElement): void {
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

    function leave(elm: HTMLElement): void {
        const {height} = getComputedStyle(elm);
        elm.style.height = height;

        // note: force repaint.
        getComputedStyle(elm);

        requestAnimationFrame(() => requestAnimationFrame(() => elm.style.height = '0'));
    }
</script>
