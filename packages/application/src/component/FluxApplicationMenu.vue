<template>
    <aside
        :class="$style.applicationMenu"
        :data-at-start="isAtStart ? '' : undefined"
        :data-at-end="isAtEnd ? '' : undefined">
        <FluxMenu
            v-if="slots.header"
            :class="$style.applicationMenuHeader">
            <slot name="header"/>
        </FluxMenu>

        <FluxWindowTransition :is-back="!slots.context">
            <FluxMenu
                v-if="slots.context"
                :key="contextMenuKey"
                :class="$style.applicationMenuContent"
                ref="contentRef">
                <slot name="context"/>
            </FluxMenu>

            <FluxMenu
                v-else
                :class="$style.applicationMenuContent"
                ref="contentRef">
                <slot/>
            </FluxMenu>
        </FluxWindowTransition>

        <FluxWindowTransition :is-back="!slots.context">
            <FluxMenu
                v-if="slots.footer && !slots.context"
                :class="$style.applicationMenuFooter">
                <slot name="footer"/>
            </FluxMenu>

            <div v-else-if="slots.footer"/>
        </FluxWindowTransition>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxWindowTransition } from '@flux-ui/components';
    import { useScrollEdges } from '@flux-ui/internals';
    import { useTemplateRef, type VNode } from 'vue';
    import $style from '../css/component/ApplicationMenu.module.scss';

    defineProps<{
        readonly contextMenuKey?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode;
        context?(): VNode;
        footer?(): VNode;
        header?(): VNode;
    }>();

    const contentRef = useTemplateRef<HTMLElement>('contentRef');
    const {isAtStart, isAtEnd} = useScrollEdges(contentRef);
</script>
