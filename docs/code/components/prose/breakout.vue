<template>
    <FluxProse
        container
        style="width: 100%"
        tag="article">
        <h2>Reading measure with break-out</h2>
        <p>Body text stays at a comfortable measure, so lines never get too long to scan. Individual elements can opt out and break into wider tracks without any wrapper.</p>

        <img
            alt=""
            data-flux-prose-wide
            src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>

        <p>Mark an element with <code>data-flux-prose-wide</code> and it reaches past the measure on both sides, while the paragraphs around it keep their reading width.</p>

        <blockquote data-flux-prose-full>A full-bleed quote, marked with data-flux-prose-full, spans the entire width of the container.</blockquote>

        <p>After the break-out, the text returns to the measure on its own, so long-form reading stays comfortable throughout.</p>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxProse } from '@flux-ui/components';
</script>
