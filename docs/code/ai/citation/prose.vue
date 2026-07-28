<template>
    <div style="max-width: 480px">
        <p>
            Spacing sits on a 3px grid.<FluxAiCitation
                excerpt="Use multiples of 3px for width, height, padding, margin, gap and positional offsets."
                :index="1"
                title="Spacing and sizing"/> Border radius, hairlines and font sizes follow
            their own scale.<FluxAiCitation
                excerpt="Hairline borders, border-radius and font-size are not bound to the 3px grid."
                :index="2"
                title="Spacing and sizing"/> The base line box is 24px, which every fixed
            height component leans on.<FluxAiCitation
                excerpt="The base line height is 24px: line-height 1.6 on body times a 15px font size."
                :index="3"
                title="The 24px line box"/>
        </p>

        <p>
            A paragraph without citations, for the same line rhythm side by side. The
            markers above sit inside the line box rather than stretching it, so both
            paragraphs share one baseline grid.
        </p>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCitation } from '@flux-ui/ai';
</script>
