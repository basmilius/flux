<template>
    <span :class="$style.highlighterGroup">
        <slot/>
    </span>
</template>

<script
    lang="ts"
    setup>
    import type { HighlighterGroupProps } from '@flux-ui/types';
    import { useHighlighterGroup } from '~flux/visuals/composable/private';
    import $style from '~flux/visuals/css/component/Highlighter.module.scss';

    const props = defineProps<HighlighterGroupProps>();

    defineSlots<{
        default(): any;
    }>();

    useHighlighterGroup(props);
</script>
