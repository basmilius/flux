<template>
    <div :class="$style.applicationMenuContext">
        <FluxSecondaryButton
            icon-leading="angle-left"
            size="small"
            :tabindex="tabindex"
            :href="href"
            :rel="rel"
            :target="target"
            :to="to"
            :type="type"/>

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
    import $style from '../css/component/ApplicationMenu.module.scss';

    defineProps<{
        readonly subtitle?: string;
        readonly title: string;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
        readonly type?: FluxPressableType;
    }>();
</script>
