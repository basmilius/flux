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
    import { useTableInjection } from '$flux/composable';
    import { clsx } from 'clsx';
    import $style from '$flux/css/component/Table.module.scss';

    defineSlots<{
        default(): any;
    }>();

    const {
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    } = useTableInjection();
</script>
