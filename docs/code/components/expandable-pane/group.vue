<template>
    <FluxExpandableGroup>
        <FluxExpandablePane
            icon="circle-info"
            title="Details">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cum dolore dolores ex modi obcaecati quis, reiciendis repudiandae saepe tempora? Aliquam doloribus, incidunt ipsa iusto maxime possimus provident voluptas. Veritatis.</p>
        </FluxExpandablePane>

        <FluxExpandablePane
            icon="palette"
            title="Design">
            <p>Architecto aut consequatur cupiditate eaque expedita id illum labore mollitia numquam omnis perferendis porro provident, quam rem temporibus veritatis voluptatum. Ad corporis dolor dolorum eligendi expedita quibusdam rem, sapiente sit?</p>
        </FluxExpandablePane>

        <FluxExpandablePane
            icon="rocket"
            title="Publish">
            <p>Ab asperiores autem commodi culpa deserunt dolorem. Alias cum cupiditate dignissimos eaque enim error fuga hic, itaque minima natus nihil, nobis perspiciatis quae quibusdam recusandae, repellat sint? Perspiciatis, rerum, vitae.</p>
        </FluxExpandablePane>
    </FluxExpandableGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandableGroup, FluxExpandablePane } from '@flux-ui/components';
</script>
