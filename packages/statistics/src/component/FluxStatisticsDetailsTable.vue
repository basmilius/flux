<template>
    <div :class="$style.detailsTable">
        <div :class="$style.detailsTableTitle">
            {{ title }}
        </div>

        <div :class="$style.detailsTableRows">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxStatistics/css/DetailsTable.module.scss';

    defineProps<{
        readonly title: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
