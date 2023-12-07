<template>
    <FluxToggle
        v-model="darkMode"
        class="theme-toggle"
        :class="{
            'is-dark': darkMode
        }"
        icon-off="moon"
        icon-on="sun-alt"
        is-switch/>
</template>

<script
    lang="ts"
    setup>
    import { FluxToggle } from '@fancee/flux';
    import { onMounted, ref, watch } from 'vue';

    const darkMode = ref(localStorage.getItem('flux_dark_mode') === '1');

    onMounted(() => updateAttribute());

    function addTransitions(): void {
        document.documentElement.classList.add('flux-docs-switching-theme');

        document.documentElement.addEventListener('transitionend', () => {
            document.documentElement.classList.remove('flux-docs-switching-theme');
        }, {once: true, passive: true});
    }

    function updateAttribute(): void {
        if (darkMode.value) {
            document.documentElement.setAttribute('dark', 'dark');
        } else {
            document.documentElement.removeAttribute('dark');
        }
    }

    watch(darkMode, darkMode => {
        localStorage.setItem('flux_dark_mode', darkMode ? '1' : '0');

        addTransitions();
        updateAttribute();
    });
</script>

<style lang="scss">
    .flux-docs-switching-theme {
        &,
        *,
        *::before,
        *::after {
            transition: 300ms var(--swift-out) !important;
            transition-delay: 0ms !important;
            transition-property: all !important;
        }
    }
</style>

<style
    lang="scss"
    scoped>
    .theme-toggle {
        ::v-deep(.is-off) {
            color: #06aed4;
        }

        ::v-deep(.is-on) {
            color: #eaaa08;
        }
    }
</style>
