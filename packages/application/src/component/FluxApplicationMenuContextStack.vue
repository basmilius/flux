<template>
    <TransitionGroup
        :enter-active-class="$style.applicationMenuPanelEnterActive"
        :enter-from-class="$style.applicationMenuPanelEnterFrom"
        :leave-active-class="$style.applicationMenuPanelLeaveActive"
        :leave-to-class="$style.applicationMenuPanelLeaveTo">
        <FluxMenu
            v-for="match in matches"
            :key="match.record.path"
            :class="$style.applicationMenuPanel">
            <ScopedRouterView
                :depth="match.depth"
                :view-name="name"/>
        </FluxMenu>
    </TransitionGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu } from '@flux-ui/components';
    import { defineComponent, h, provide, ref, toRef, type VNode } from 'vue';
    import { RouterView, viewDepthKey } from 'vue-router';
    import useNamedRoutes from '../routing/useNamedRoutes';
    import $style from '../css/component/ApplicationMenu.module.scss';

    const {
        name = 'menu'
    } = defineProps<{
        readonly name?: string;
    }>();

    const matches = useNamedRoutes(toRef(() => name));

    const ScopedRouterView = defineComponent({
        name: 'FluxApplicationMenuScopedRouterView',
        props: {
            depth: {
                type: Number,
                required: true
            },
            viewName: {
                type: String,
                required: true
            }
        },
        setup(props): () => VNode {
            provide(viewDepthKey, ref(props.depth));

            return () => h(RouterView, {name: props.viewName});
        }
    });
</script>
