<template>
    <FluxToggle
        v-model="darkMode"
        :class="$style.themeToggle"
        icon-off="moon"
        icon-on="sun-alt"
        is-switch/>
</template>

<script
    lang="ts"
    setup>
    import { FluxToggle } from '@basmilius/flux';
    import { onMounted, ref, watch } from 'vue';

    const darkMode = ref(localStorage.getItem('flux.darkMode') === '1');

    onMounted(() => updateAttribute());

    function updateAttribute(): void {
        if (darkMode.value) {
            document.documentElement.setAttribute('dark', 'dark');
        } else {
            document.documentElement.removeAttribute('dark');
        }
    }

    watch(darkMode, darkMode => {
        localStorage.setItem('flux.darkMode', darkMode ? '1' : '0');

        if ('startViewTransition' in document) {
            document.startViewTransition(updateAttribute);
        } else {
            updateAttribute();
        }
    });
</script>

<style
    lang="scss"
    module>
    .themeToggle {
        .toggleIconOff {
            color: #06aed4;
        }

        .toggleIconOn {
            color: #eaaa08;
        }
    }
</style>
