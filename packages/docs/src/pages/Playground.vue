<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview v-if="false">
                <flux-pane style="width: 420px">
                    <flux-pane-body>
                        <flux-stack :gap="15">
                            <flux-progress-bar
                                :min="0"
                                :max="100"
                                :value="50"/>
                            <flux-progress-bar is-indeterminate/>
                        </flux-stack>
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <flux-stack>
                    <flux-pane style="width: 420px">
                        <flux-pane-body>
                            <flux-form-column>
                                <flux-form-field label="Slider">
                                    <flux-form-slider
                                        v-model="sliderValues[0]"
                                        :min="0"
                                        :max="100"
                                        :step="0.1"/>
                                </flux-form-field>

                                <flux-form-field label="Slider with ticks">
                                    <flux-form-slider
                                        v-model="sliderValues[1]"
                                        is-ticks-visible
                                        :min="0"
                                        :max="1000"
                                        :step="10"/>
                                </flux-form-field>
                            </flux-form-column>
                        </flux-pane-body>
                    </flux-pane>

                    <flux-pane style="width: 420px">
                        <flux-pane-body>
                            <flux-form-column>
                                <flux-form-field label="Range slider">
                                    <flux-form-range-slider
                                        v-model="rangeSliderValues[0]"
                                        :min="0"
                                        :max="100"
                                        :step="5"/>
                                </flux-form-field>

                                <flux-form-field label="Range slider with ticks">
                                    <flux-form-range-slider
                                        v-model="rangeSliderValues[1]"
                                        is-ticks-visible
                                        :min="0"
                                        :max="1"
                                        :step=".01"/>
                                </flux-form-field>
                            </flux-form-column>
                        </flux-pane-body>
                    </flux-pane>
                </flux-stack>
            </preview>

            <preview v-if="false">
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormRangeSlider, FluxFormSlider, FluxPane, FluxPaneBody, FluxProgressBar, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const rangeSliderValues = ref([[20, 80], [.1, .3]]);
    const sliderValues = ref([50, 75]);
</script>
