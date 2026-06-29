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
        :href="safeHref"
        :rel="resolvedRel"
        :target="target"
        :tabindex="isHrefBlocked ? -1 : undefined"
        :aria-disabled="isHrefBlocked ? true : undefined"
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
        role="button"
        :tabindex="noneTabindex"
        v-bind="$attrs"
        v-on="hoverListeners"
        @click="onClick($event)"
        @keydown="onKeyDown">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxPressableType, FluxTo } from '@flux-ui/types';
    import { computed, useAttrs, type VNode } from 'vue';
    import { sanitizeUrl } from '~flux/components/util';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    const {href, rel, target} = defineProps<{
        readonly componentType?: FluxPressableType;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const attrs = useAttrs();

    const safeHref = computed(() => sanitizeUrl(href));
    const isHrefBlocked = computed(() => href != null && href !== '' && safeHref.value === undefined);
    const noneTabindex = computed(() => (attrs.tabindex as number | string | undefined) ?? 0);

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
        if (isHrefBlocked.value) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        emit('click', evt);

        if (evt.defaultPrevented) {
            return;
        }

        navigate?.(evt);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Enter' && evt.key !== ' ') {
            return;
        }

        evt.preventDefault();
        (evt.currentTarget as HTMLElement).click();
    }
</script>
