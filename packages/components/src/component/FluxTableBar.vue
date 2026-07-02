<template>
    <div
        :class="$style.tableRow"
        role="row">
        <div
            :class="clsx(
                $style.tableBar,
                isHoverable && $style.isHoverable
            )"
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
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import $style from '~flux/components/css/component/Table.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();

    const {
        isHoverable
    } = useTableInjection();
</script>
