<template>
    <component
        :is="hasRows ? 'div' : PassThrough"
        :class="hasRows ? $style.tableGroupSection : undefined"
        :role="hasRows ? 'presentation' : undefined">
        <div
            :class="clsx($style.tableRow, $style.tableGroupRow)"
            role="row">
            <div
                :class="clsx(
                    $style.tableGroup,
                    isExpandable && $style.isHoverable
                )"
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
            </div>
        </div>

        <template v-if="!isExpandable || isExpanded">
            <slot/>
        </template>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import { PassThrough } from './primitive';
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

    const translate = useTranslate();

    const hasRows = computed(() => 'default' in slots);

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
