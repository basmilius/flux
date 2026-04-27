<template>
    <FluxPressable
        component-type="button"
        @click="clicks++">
        <FluxPane>
            <FluxPaneBody>
                Clicked {{ clicks }} times
            </FluxPaneBody>
        </FluxPane>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPressable } from '@flux-ui/components';
    import { ref } from 'vue';

    const clicks = ref(0);
</script>
