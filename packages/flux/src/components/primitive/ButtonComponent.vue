<template>
    <template v-if="componentType === 'route'">
        <router-link
            custom
            :to="to"
            #default="ctx">
            <a
                v-bind="$attrs"
                :href="ensureRouterLinkProps(ctx).href"
                :rel="rel"
                :target="target"
                @click="onClick($event, ensureRouterLinkProps(ctx).navigate)"
                @mouseenter="$emit('mouseenter', $event)"
                @mouseleave="$emit('mouseleave', $event)">
                <slot/>
            </a>
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
    import type { FluxRoutingLocation } from '@/data';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;

        (e: 'mouseenter', evt: MouseEvent): void;

        (e: 'mouseleave', evt: MouseEvent): void;
    }

    export interface Props {
        readonly componentType?: 'button' | 'link' | 'route';
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    interface RouterLinkProps {
        href: string;
        navigate: (evt: MouseEvent) => void;
    }

    const emit = defineEmits<Emits>();
    defineProps<Props>();

    function ensureRouterLinkProps(props: Partial<RouterLinkProps>): RouterLinkProps {
        if (!('href' in props)) {
            props.href = '/';
        }

        if (!('navigate' in props)) {
            props.navigate = () => void 0;
        }

        return props as RouterLinkProps;
    }

    function onClick(evt: MouseEvent, navigate?: (evt: MouseEvent) => void): void {
        emit('click', evt);

        if (evt.defaultPrevented) {
            return;
        }

        navigate?.(evt);
    }
</script>
