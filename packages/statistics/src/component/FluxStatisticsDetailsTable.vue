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
    import $style from '~flux/statistics/css/DetailsTable.module.scss';

    defineProps<{
        readonly title: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
