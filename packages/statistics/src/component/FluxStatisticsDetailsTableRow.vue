<template>
    <div
        role="row"
        :class="$style.detailsTableRow">
        <span
            role="rowheader"
            :class="$style.detailsTableRowLabel">
            {{ label }}
        </span>

        <span
            role="cell"
            :class="$style.detailsTableRowValue">
            {{ value }}
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/statistics/css/DetailsTable.module.scss';

    defineProps<{
        readonly label: string;
        readonly value: string;
    }>();
</script>
