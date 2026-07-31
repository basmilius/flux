<template>
    <div
        :class="$style.tableRow"
        role="row"
        data-flux-copy="none">
        <div
            :class="$style.tableBar"
            role="cell">
            <div :class="$style.tableBarContent">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
