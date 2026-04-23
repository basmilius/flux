<template>
    <router-link
        v-if="componentType === 'route'"
        v-bind="$attrs"
        v-on="hoverListeners"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick($event)">
        <slot/>
    </router-link>

    <a
        v-else-if="componentType === 'link'"
        v-bind="$attrs"
        v-on="hoverListeners"
        :href="href"
        :rel="rel"
        :target="target"
        @click="onClick($event)">
        <slot/>
    </a>

    <button
        v-else-if="componentType === 'button'"
        v-bind="$attrs"
        v-on="hoverListeners"
        @click="onClick($event)">
        <slot/>
    </button>

    <div
        v-else
        v-bind="$attrs"
        v-on="hoverListeners"
        @click="onClick">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import type { FluxPressableType, FluxTo } from '@flux-ui/types';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    defineProps<{
        readonly componentType?: FluxPressableType;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const hoverListeners = {
        onMouseenter: (evt: MouseEvent) => emit('mouseenter', evt),
        onMouseleave: (evt: MouseEvent) => emit('mouseleave', evt)
    };

    function onClick(evt: MouseEvent, navigate?: (evt: MouseEvent) => void): void {
        emit('click', evt);

        if (evt.defaultPrevented) {
            return;
        }

        navigate?.(evt);
    }
</script>
