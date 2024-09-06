<template>
    <template v-if="componentType === 'route'">
        <router-link
            v-bind="$attrs"
            :rel="rel"
            :target="target"
            :to="to"
            @click="onClick($event)"
            @mouseenter="$emit('mouseenter', $event)"
            @mouseleave="$emit('mouseleave', $event)">
            <slot/>
        </router-link>
    </template>

    <template v-else-if="componentType === 'link'">
        <a
            v-bind="$attrs"
            :href="href"
            :rel="rel"
            :target="target"
            @click="onClick($event)"
            @mouseenter="$emit('mouseenter', $event)"
            @mouseleave="$emit('mouseleave', $event)">
            <slot/>
        </a>
    </template>

    <template v-else>
        <button
            v-bind="$attrs"
            @click="onClick($event)"
            @mouseenter="$emit('mouseenter', $event)"
            @mouseleave="$emit('mouseleave', $event)">
            <slot/>
        </button>
    </template>
</template>

<script
    lang="ts"
    setup>
    import type { ButtonType, To } from '@/types';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    defineSlots<{
        default(): any;
    }>();

    defineProps<{
        readonly componentType?: ButtonType;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: To;
    }>();

    function onClick(evt: MouseEvent, navigate?: (evt: MouseEvent) => void): void {
        emit('click', evt);

        if (evt.defaultPrevented) {
            return;
        }

        navigate?.(evt);
    }
</script>
