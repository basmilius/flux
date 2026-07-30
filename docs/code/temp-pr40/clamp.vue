<template>
    <FluxFlex direction="column">
        <FluxInfo color="warning">
            <strong>What to look for.</strong>
            Each control below runs on the shared <code>clamp</code> now. Drag every one to both ends: the value must stop at the bounds and never overshoot or wrap.
        </FluxInfo>

        <FluxGrid :columns="2">
            <FluxPane>
                <FluxPaneHeader title="Quantity selector (min 2, max 8)"/>
                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <FluxQuantitySelector
                            v-model="quantity"
                            :max="8"
                            :min="2"/>
                        <span>Value: <strong>{{ quantity }}</strong> - the steppers must refuse to leave 2..8</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="Progress bar (0..100)"/>
                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <FluxProgressBar :value="progress"/>
                        <FluxFormSlider
                            v-model="progress"
                            :max="150"
                            :min="-50"/>
                        <span>Input <strong>{{ progress }}</strong> - the bar must sit at an end from 0 and 100 onwards</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="Color picker (clampByte)"/>
                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <FluxColorPicker v-model="color"/>
                        <span>Hex: <strong>{{ color }}</strong> - alpha must never produce a channel outside 00..ff</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="Fader (stepped value)"/>
                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <FluxFormFader
                            v-model="fader"
                            :max="10"
                            :min="0"
                            :step="0.5"/>
                        <span>Value: <strong>{{ fader }}</strong> - must land on halves and stop at 0 and 10</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxGrid>

        <FluxInfo>
            <strong>Table header resize (clampWidth).</strong>
            Drag the right edge of a column in any table on the docs site. The width must stop at the minimum and never collapse to zero.
        </FluxInfo>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';

    const color = ref('#4f46e5');
    const fader = ref(2.5);
    const progress = ref(40);
    const quantity = ref(4);
</script>
