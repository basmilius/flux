<template>
    <div
        :class="clsx(
            $style.faderItem,
            isCurrent && $style.isCurrent
        )"
        role="group"
        aria-roledescription="slide"
        :aria-hidden="isCurrent ? undefined : true">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, inject, onUnmounted, unref } from 'vue';
    import { FluxFaderInjectionKey } from './FluxFader.vue';
    import $style from '~flux/components/css/component/Fader.module.scss';

    defineSlots<{
        default(): any;
    }>();

    const fader = inject(FluxFaderInjectionKey, null);
    const index = fader ? fader.register() : 0;

    const isCurrent = computed(() => !!fader && unref(fader.current) === index);

    onUnmounted(() => fader?.unregister());
</script>
