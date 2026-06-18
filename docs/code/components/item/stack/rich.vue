<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItemStack>
                <FluxItem
                    v-for="file in files"
                    :key="file.name">
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            :color="file.color"
                            :name="file.icon"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ file.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ file.meta }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxAction
                            icon="ellipsis-v"
                            aria-label="More actions"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxAction, FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';

    const files: { name: string; meta: string; icon: FluxIconName; color: FluxColor }[] = [
        {name: 'Report.pdf', meta: '2.4 MB · PDF document', icon: 'file-lines', color: 'danger'},
        {name: 'Photos', meta: '128 items · Folder', icon: 'folder', color: 'primary'},
        {name: 'Backup.zip', meta: '512 MB · Archive', icon: 'database', color: 'info'}
    ];
</script>
