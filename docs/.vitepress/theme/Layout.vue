<script
    lang="ts"
    setup>
    import { FluxRoot } from '@flux-ui/flux';
    import { isSSR } from '@flux-ui/internals';
    import { useData } from 'vitepress';
    import { watch } from 'vue';
    import Layout from 'vitepress/dist/client/theme-default/Layout.vue';

    const data = useData();

    watch(data.isDark, isDark => {
        if (isSSR) {
            return;
        }

        if (isDark) {
            document.documentElement.setAttribute("dark", "dark");
        } else {
            document.documentElement.removeAttribute("dark");
        }
    }, {immediate: true});
</script>

<template>
    <FluxRoot>
        <Layout/>
    </FluxRoot>
</template>
