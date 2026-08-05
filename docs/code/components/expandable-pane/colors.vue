<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxExpandablePane
            v-for="color in colors"
            :key="color"
            :color="color"
            icon="palette"
            :title="color">
            <p>Ab asperiores autem commodi culpa deserunt dolorem. Alias cum cupiditate dignissimos eaque enim error fuga hic, itaque minima natus nihil, nobis perspiciatis quae quibusdam recusandae, repellat sint?</p>
        </FluxExpandablePane>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandablePane, FluxFlex } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';

    const colors: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
</script>
