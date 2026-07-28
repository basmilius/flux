<template>
    <button
        :class="$style.applicationSideBackdrop"
        type="button"
        :aria-label="closeLabel ?? translate('flux.application.closePanel')"
        :data-collapsed="isVisible ? undefined : ''"
        @click="isVisible = false"/>

    <aside
        :class="$style.applicationSide"
        :data-collapsed="isVisible ? undefined : ''"
        :inert="isVisible ? undefined : true">
        <slot/>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import { useApplicationTranslate } from '../data';
    import $style from '~flux/application/css/component/ApplicationSide.module.scss';

    defineProps<{
        readonly closeLabel?: string;
    }>();

    const translate = useApplicationTranslate();

    const isVisible = defineModel<boolean>('isVisible', {
        default: true
    });

    defineSlots<{
        default(): VNode;
    }>();
</script>
