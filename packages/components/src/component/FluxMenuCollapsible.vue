<template>
    <div :class="isOpen ? $style.menuCollapsibleOpened : $style.menuCollapsible">
        <FluxMenuItem
            :disabled="disabled"
            :href="href"
            :icon-leading="iconLeading"
            :icon-trailing="isOpen ? 'angle-down' : 'angle-right'"
            :label="label"
            :rel="rel"
            :target="target"
            :to="to"
            :aria-expanded="isOpen"
            :aria-controls="bodyId"
            @click="onHeaderClick">
            <template
                v-if="slots.before"
                #before>
                <slot name="before"/>
            </template>
        </FluxMenuItem>

        <FluxAutoHeightTransition>
            <div
                v-if="isOpen"
                :id="bodyId"
                :class="$style.menuCollapsibleBody"
                role="group">
                <div :class="$style.menuCollapsibleContent">
                    <slot/>
                </div>
            </div>
        </FluxAutoHeightTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName, FluxTo } from '@flux-ui/types';
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { computed, getCurrentInstance, ref, useId, type VNode, watch } from 'vue';
    import { FluxAutoHeightTransition } from '$flux/transition';
    import FluxMenuItem from './FluxMenuItem.vue';
    import $style from '$flux/css/component/Menu.module.scss';

    type RouteRecordLike = {
        readonly name?: string | symbol | null | undefined;
    };

    type RouteLike = {
        readonly path: string;
        readonly matched: readonly RouteRecordLike[];
    };

    type RouteAwareInstance = {
        readonly $route?: RouteLike;
    };

    const emit = defineEmits<{
        toggle: [boolean];
        'update:isOpened': [boolean];
    }>();

    const {
        href,
        isOpened,
        to
    } = defineProps<{
        readonly disabled?: boolean;
        readonly href?: string;
        readonly iconLeading?: FluxIconName | null;
        readonly isOpened?: boolean;
        readonly label?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        before(): VNode[];
    }>();

    const bodyId = useId();
    const instance = getCurrentInstance();
    const isOpen = ref(!!isOpened);
    const route = computed<RouteLike | undefined>(() => (instance?.proxy as RouteAwareInstance | null)?.$route);

    function open(): void {
        if (isOpen.value) {
            return;
        }

        isOpen.value = true;
        emit('toggle', true);
        emit('update:isOpened', true);
    }

    function close(): void {
        if (!isOpen.value) {
            return;
        }

        isOpen.value = false;
        emit('toggle', false);
        emit('update:isOpened', false);
    }

    function toggle(): void {
        if (isOpen.value) {
            close();
        } else {
            open();
        }
    }

    function onHeaderClick(): void {
        if (to || href) {
            open();
        } else {
            toggle();
        }
    }

    function matchesRoute(target: unknown, currentRoute: RouteLike | undefined): boolean {
        if (!target || !currentRoute) {
            return false;
        }

        if (typeof target === 'string') {
            return currentRoute.path === target || currentRoute.path.startsWith(`${target}/`);
        }

        if (typeof target === 'object') {
            const obj = target as Record<string, unknown>;

            if (typeof obj.path === 'string') {
                return currentRoute.path === obj.path || currentRoute.path.startsWith(`${obj.path}/`);
            }

            if (obj.name && Array.isArray(currentRoute.matched)) {
                return currentRoute.matched.some(record => record.name === obj.name);
            }
        }

        return false;
    }

    watch(() => isOpened, value => {
        if (value === undefined) {
            return;
        }

        if (value) {
            open();
        } else {
            close();
        }
    });

    watch(route, currentRoute => {
        if (!currentRoute) {
            return;
        }

        const vnodes = flattenVNodeTree(slots.default?.() ?? []);

        for (const vnode of vnodes) {
            const childTo = vnode.props?.to;
            const childHref = vnode.props?.href;

            if (matchesRoute(childTo, currentRoute) || matchesRoute(childHref, currentRoute)) {
                open();
                return;
            }
        }
    }, {
        immediate: true
    });

    defineExpose({
        isOpen,
        open,
        close,
        toggle
    });
</script>
