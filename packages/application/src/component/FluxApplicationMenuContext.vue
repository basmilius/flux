<template>
    <div :class="$style.applicationMenuContext">
        <FluxSecondaryButton
            icon-leading="angle-left"
            size="small"
            :tabindex="tabindex"
            :href="canSlide ? undefined : href"
            :rel="rel"
            :target="target"
            :to="canSlide ? undefined : to"
            :type="canSlide ? 'button' : type"
            @click="onBack"/>

        <div :class="$style.applicationMenuContextContent">
            <strong>{{ title }}</strong>
            <span v-if="subtitle">{{ subtitle }}</span>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import type { FluxPressableType, FluxTo } from '@flux-ui/types';
    import { computed, inject } from 'vue';
    import { matchedRouteKey } from 'vue-router';
    import { FluxApplicationInjectionKey } from '../data';
    import useApplicationContextRegistration from '../composable/useApplicationContextRegistration';
    import $style from '../css/component/ApplicationMenu.module.scss';

    const props = defineProps<{
        readonly subtitle?: string;
        readonly title: string;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
        readonly entryTo?: FluxTo;
        readonly type?: FluxPressableType;
    }>();

    const injection = inject(FluxApplicationInjectionKey, null);
    const matchedRoute = inject(matchedRouteKey, null);

    const canSlide = computed(() => {
        if (!injection) {
            return false;
        }
        return injection.viewIndex.value > 0;
    });

    const autoEntryTo = computed<FluxTo | undefined>(() => {
        const record = matchedRoute?.value;

        if (!record || typeof record.name !== 'string') {
            return undefined;
        }

        return {name: record.name};
    });

    function onBack(): void {
        if (canSlide.value && injection) {
            injection.goToParent();
        }
    }

    useApplicationContextRegistration(() => ({
        title: props.title,
        subtitle: props.subtitle,
        to: props.to,
        entryTo: props.entryTo ?? autoEntryTo.value,
        href: props.href,
        type: props.type
    }));
</script>
