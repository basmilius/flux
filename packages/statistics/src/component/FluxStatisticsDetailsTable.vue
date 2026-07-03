<template>
    <div
        role="table"
        :class="$style.detailsTable">
        <div
            role="caption"
            :class="$style.detailsTableTitle">
            {{ title }}
        </div>

        <div
            role="rowgroup"
            :class="$style.detailsTableRows">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/statistics/css/DetailsTable.module.scss';

    defineProps<{
        readonly title: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
