<template>
    <tr :class="$style.tableRow">
        <td
            :class="clsx(
                $style.tableBar,
                isBordered && $style.isBordered,
                isHoverable && $style.isHoverable,
                isSeparated && $style.isSeparated,
                isStriped && $style.isStriped
            )"
            colspan="100%"
            role="cell">
            <div :class="$style.tableBarContent">
                <slot/>
            </div>
        </td>
    </tr>
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
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    } = useTableInjection();
</script>
