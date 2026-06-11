<template>
    <router-link
        v-if="componentType === 'route'"
        custom
        :to="to as any"
        #default="{href: routeHref, navigate}">
        <a
            v-bind="$attrs"
            v-on="hoverListeners"
            :href="routeHref"
            :rel="resolvedRel"
            :target="target"
            @click="onClick($event, navigate)">
            <slot/>
        </a>
    </router-link>

    <a
        v-else-if="componentType === 'link'"
        v-bind="$attrs"
        v-on="hoverListeners"
        :href="sanitizeUrl(href)"
        :rel="resolvedRel"
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
    import type { FluxPressableType, FluxTo } from '@flux-ui/types';
    import { computed, type VNode } from 'vue';
    import { sanitizeUrl } from '~flux/components/util';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    const {rel, target} = defineProps<{
        readonly componentType?: FluxPressableType;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const resolvedRel = computed(() => {
        if (rel) {
            return rel;
        }

        return target === '_blank' ? 'noopener noreferrer' : undefined;
    });

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
