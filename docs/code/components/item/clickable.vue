<template>
    <Preview>
        <div style="display: flex; flex-flow: column; gap: 9px; width: min(100%, 420px)">
            <FluxClickablePane
                v-for="project in projects"
                :key="project.name"
                type="button">
                <FluxItem>
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            :color="project.color"
                            :name="project.icon"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ project.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ project.description }}</span>
                    </FluxItemContent>

                    <FluxItemMedia is-center>
                        <FluxIcon
                            name="chevron-right"
                            style="opacity: .4"/>
                    </FluxItemMedia>
                </FluxItem>
            </FluxClickablePane>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBoxedIcon, FluxClickablePane, FluxIcon, FluxItem, FluxItemContent, FluxItemMedia } from '@flux-ui/components';

    const projects: { name: string; description: string; icon: FluxIconName; color: FluxColor }[] = [
        {name: 'Aurora', description: 'Design system', icon: 'palette', color: 'primary'},
        {name: 'Nebula', description: 'Marketing site', icon: 'rocket', color: 'info'},
        {name: 'Orbit', description: 'Analytics dashboard', icon: 'chart-line', color: 'success'}
    ];
</script>
