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
                <flux-pane style="width: 360px">
                    <flux-pane-body>
                        <flux-form-column>
                            <flux-form-field
                                label="Date"
                                :hint="date.toLocaleString({day: 'numeric', month: 'short', year: 'numeric'})">
                                <flux-form-date-input v-model="date"/>
                            </flux-form-field>

                            <flux-form-field
                                label="Date time"
                                :hint="dateWithTime.toLocaleString({day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'})">
                                <flux-form-date-time-input v-model="dateWithTime"/>
                            </flux-form-field>

                            <flux-form-field
                                label="Range"
                                :hint="range.map(d => d.toLocaleString({day: 'numeric', month: 'short', year: 'numeric'})).join(' – ')">
                                <flux-form-date-range-input v-model="range"/>
                            </flux-form-field>
                        </flux-form-column>
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormDateInput, FluxFormDateRangeInput, FluxFormDateTimeInput, FluxFormField, FluxPane, FluxPaneBody, FluxProgressBar, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const date = ref(DateTime.now());
    const dateWithTime = ref(DateTime.now());
    const range = ref([
        DateTime.now(),
        DateTime.now().plus({day: 60})
    ]);
</script>
