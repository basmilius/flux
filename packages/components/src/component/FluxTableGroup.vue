<template>
    <tr :class="clsx($style.tableRow, $style.tableGroupRow)">
        <td
            :class="clsx(
                $style.tableGroup,
                isHoverable && isExpandable && $style.isHoverable
            )"
            colspan="100%"
            role="cell">
            <component
                :is="isExpandable ? 'button' : 'div'"
                :class="$style.tableGroupContent"
                :type="isExpandable ? 'button' : undefined"
                :aria-expanded="isExpandable ? isExpanded : undefined"
                :aria-label="ariaLabel"
                @click="onToggle">
                <FluxIcon
                    v-if="isExpandable"
                    :class="clsx($style.tableGroupChevron, isExpanded && $style.isExpanded)"
                    name="angle-right"
                    :size="16"/>

                <FluxIcon
                    v-if="icon"
                    :class="$style.tableGroupIcon"
                    :name="icon"
                    :size="16"/>

                <span :class="$style.tableGroupLabel">{{ label }}</span>

                <span
                    v-if="'after' in slots"
                    :class="$style.tableGroupAfter">
                    <slot name="after"/>
                </span>
            </component>
        </td>
    </tr>

    <template v-if="!isExpandable || isExpanded">
        <slot/>
    </template>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const isExpanded = defineModel<boolean>('isExpanded', {
        default: true
    });

    const {
        icon,
        isExpandable = false,
        label
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isExpandable?: boolean;
        readonly label: string;
    }>();

    const slots = defineSlots<{
        default?(): VNode[];
        after?(): VNode[];
    }>();

    const {
        isHoverable
    } = useTableInjection();

    const translate = useTranslate();

    const ariaLabel = computed(() => {
        if (!isExpandable) {
            return undefined;
        }

        return isExpanded.value ? translate('flux.collapseGroup') : translate('flux.expandGroup');
    });

    function onToggle(): void {
        if (!isExpandable) {
            return;
        }

        isExpanded.value = !isExpanded.value;
    }
</script>
