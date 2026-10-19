<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxDateScrubber
                v-model="index"
                :dates="dates"/>

            <p>Selected: {{ dates[index].toLocaleString(DateTime.DATETIME_MED) }}</p>

            <FluxButtonGroup>
                <FluxSecondaryButton
                    label="First"
                    @click="index = 0"/>

                <FluxSecondaryButton
                    label="Latest"
                    @click="index = dates.length - 1"/>
            </FluxButtonGroup>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonGroup, FluxDateScrubber, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';
    import { createCheckIns } from './checkIns';

    const dates = createCheckIns();
    const index = ref(dates.length - 1);
</script>
