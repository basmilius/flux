<template>
    <FluxButtonGroup>
        <FluxSecondaryButton
            v-for="option of positions"
            :key="option"
            :label="option"
            @click="open(option)"/>
    </FluxButtonGroup>

    <FluxSheet
        is-closeable
        :position="position"
        :snap-points="[.4, .8]"
        @close="isSheetOpened = false">
        <FluxPane v-if="isSheetOpened">
            <FluxPaneHeader :title="`Sheet from the ${position}`"/>

            <FluxPaneBody>
                <p>Drag the grabber along its axis, flick it away to dismiss it, or use the arrow keys once it has focus.</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxSecondaryButton
                    label="Close"
                    @click="isSheetOpened = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxSheet>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonGroup, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton, FluxSheet, FluxSpacer } from '@flux-ui/components';
    import { ref } from 'vue';

    type Position = 'bottom' | 'left' | 'right' | 'top';

    const positions: Position[] = ['bottom', 'left', 'right', 'top'];

    const isSheetOpened = ref(false);
    const position = ref<Position>('bottom');

    function open(next: Position): void {
        position.value = next;
        isSheetOpened.value = true;
    }
</script>
