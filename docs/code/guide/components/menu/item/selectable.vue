<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <template v-for="i of 3">
                <FluxMenuItem
                    :is-selected="selected === i"
                    is-selectable
                    :label="`Item ${i}`"
                    @click="selected = i"/>
            </template>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const selected = ref(1);
</script>
