<template>
    <Preview>
        <FluxPublishButton
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="label"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxPublishButton } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    const state = ref(0);

    useInterval(2000, () => state.value++);

    const label = computed(() => {
        switch (state.value % 3) {
            case 1:
                return 'Publishing';

            case 2:
                return 'Published';

            default:
                return 'Publish';
        }
    });
</script>
