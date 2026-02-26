<template>
    <div :class="$style.detailsTableRow">
        <span :class="$style.detailsTableRowLabel">
            {{ label }}
        </span>

        <span :class="$style.detailsTableRowValue">
            {{ value }}
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$fluxStatistics/css/DetailsTable.module.scss';

    defineProps<{
        readonly label: string;
        readonly value: string;
    }>();
</script>
