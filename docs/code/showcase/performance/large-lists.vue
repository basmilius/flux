<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxFormField label="5,000 options with 30 selected values">
                <FluxFormSelect
                    v-model="selected"
                    :options="options"
                    is-multiple
                    is-searchable/>
            </FluxFormField>

            <FluxFormField label="Search a tree of 3,905 nodes">
                <FluxFormTreeViewSelect
                    v-model="selectedNode"
                    :options="tree"
                    is-searchable
                    placeholder="Search for target..."/>
            </FluxFormField>

            <FluxSecondaryButton
                label="Lay out 20,000 nodes"
                @click="measureLayout"/>

            <p v-if="layoutTime !== null">Layout calculation: {{ layoutTime.toFixed(1) }} ms.</p>
        </FluxPaneBody>
    </FluxPane>
</template>

<script lang="ts" setup>
    import { FluxFormField, FluxFormSelect, FluxFormTreeViewSelect, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
    import { useFlowLayout } from '@flux-ui/flow';
    import type { FluxFormTreeViewSelectOption } from '@flux-ui/types';
    import { ref } from 'vue';

    const options = Array.from({length: 5000}, (_, index) => ({value: index, label: `Option ${index + 1}`}));
    const tree = createTree(5);
    const nodes = Array.from({length: 20000}, (_, index) => ({id: String(index)}));

    const selected = ref(Array.from({length: 30}, (_, index) => index));
    const selectedNode = ref<string | null>(null);
    const layoutTime = ref<number | null>(null);

    function createTree(depth: number, prefix = ''): FluxFormTreeViewSelectOption[] {
        return Array.from({length: 5}, (_, index) => {
            const id = `${prefix}${index + 1}`;
            return {
                id,
                label: id === '55555' ? 'Target' : `Branch ${id}`,
                children: depth > 1 ? createTree(depth - 1, id) : undefined
            };
        });
    }

    function measureLayout(): void {
        const start = performance.now();
        useFlowLayout(nodes, []);
        layoutTime.value = performance.now() - start;
    }
</script>
