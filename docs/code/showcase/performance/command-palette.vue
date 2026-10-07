<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxSecondaryButton
                :disabled="!isMounted"
                label="Open command palette"
                @click="palette?.open()"/>

            <FluxSecondaryButton
                :label="isMounted ? 'Unmount palette' : 'Mount palette'"
                @click="isMounted = !isMounted"/>

            <p>Last activated result: {{ activated || 'none' }}</p>

            <FluxCommandPalette
                v-if="isMounted"
                ref="palette"
                :sources="sources"
                placeholder="Type a, then ab while loading..."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script lang="ts" setup>
    import { FluxCommandPalette, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
    import type { FluxCommandSource, FluxCommandSourceItem } from '@flux-ui/types';
    import { ref, useTemplateRef } from 'vue';

    const activated = ref('');
    const isMounted = ref(true);
    const palette = useTemplateRef<InstanceType<typeof FluxCommandPalette>>('palette');

    const sources: FluxCommandSource[] = [{
        key: 'remote',
        label: 'Remote',
        tab: true,
        items: [],
        fetchSearch: async (query: string): Promise<FluxCommandSourceItem[]> => {
            await new Promise(resolve => setTimeout(resolve, query.length === 1 ? 1200 : 150));

            return [{
                id: query,
                label: `Result for ${query}`,
                onActivate() {
                    activated.value = query;
                }
            }];
        }
    }, {
        key: 'local',
        label: 'Local',
        tab: true,
        items: [{
            id: 'local',
            label: 'Local action',
            onActivate() {
                activated.value = 'local';
            }
        }]
    }];
</script>
