<template>
    <div
        role="table"
        :aria-label="title"
        :class="$style.detailsTable">
        <div :class="$style.detailsTableTitle">
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
