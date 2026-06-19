<template>
    <RouterView/>
</template>

<script
    lang="ts"
    setup>
    import { computed, watch } from 'vue';
    import { onBeforeRouteLeave, RouterView, useRoute } from 'vue-router';
    import { useProjectsStore, useUiStore } from '@/store';

    const route = useRoute();
    const {getProject} = useProjectsStore();
    const {setIcon, setTitle} = useUiStore();

    const project = computed(() => getProject(String(route.params.id)));

    watch(project, current => {
        if (current) {
            setIcon(current.icon);
            setTitle(current.name);
        }
    }, {immediate: true});

    onBeforeRouteLeave(() => {
        setIcon();
        setTitle();
    });
</script>
