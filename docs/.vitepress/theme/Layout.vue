<template>
    <FluxRoot>
        <Layout/>
    </FluxRoot>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoot } from '@flux-ui/components';
    import { isSSR } from '@flux-ui/internals';
    import { useData } from 'vitepress';
    import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
    import { watch } from 'vue';

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
