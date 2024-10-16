<template>
    <router-link
        v-if="componentType === 'route'"
        v-bind="$attrs"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick($event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <slot/>
    </router-link>

    <a
        v-else-if="componentType === 'link'"
        v-bind="$attrs"
        :href="href"
        :rel="rel"
        :target="target"
        @click="onClick($event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <slot/>
    </a>

    <button
        v-else
        v-bind="$attrs"
        @click="onClick($event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <slot/>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { PressableType, To } from '@/types';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    defineProps<{
        readonly componentType?: PressableType;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: To;
    }>();

    defineSlots<{
        default(): any;
    }>();

    function onClick(evt: MouseEvent, navigate?: (evt: MouseEvent) => void): void {
        emit('click', evt);

        if (evt.defaultPrevented) {
            return;
        }

        navigate?.(evt);
    }
</script>
