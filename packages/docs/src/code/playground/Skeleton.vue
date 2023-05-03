<template>
    <flux-skeleton :is-enabled="isSkeletonEnabled">
        <flux-stack is-centered>
            <flux-statistic
                style="width: 360px"
                color="primary"
                change-color="success"
                change-icon="arrow-trend-up"
                change-value="1.250"
                icon="star"
                label="Leads"
                value="16.500"/>

            <flux-statistic
                style="width: 360px"
                color="danger"
                change-color="success"
                change-icon="arrow-trend-down"
                change-value="13%"
                icon="bolt"
                label="Exceptions"
                value="13"/>

            <flux-secondary-button
                icon-before="clone"
                label="Toggle skeletons"
                @click="isSkeletonEnabled = !isSkeletonEnabled"/>
        </flux-stack>
    </flux-skeleton>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxSkeleton, FluxStack, FluxStatistic } from '@fancee/flux';
    import { ref } from 'vue';

    const isSkeletonEnabled = ref(true);
</script>
