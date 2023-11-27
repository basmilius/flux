<template>
    <flux-pane style="width: 420px">
        <flux-pane-body>
            <flux-form-column>
                <flux-form-field label="Downloading">
                    <flux-progress-bar
                        :min="0"
                        :max="100"
                        :value="50"
                        status="The Blacklist S05E10 - The Stewmaker.atmos"/>
                </flux-form-field>

                <flux-form-field label="Searhing">
                    <flux-progress-bar
                        is-indeterminate
                        status="Looking for Waldo..."/>
                </flux-form-field>
            </flux-form-column>
        </flux-pane-body>
    </flux-pane>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxPane, FluxPaneBody, FluxProgressBar } from '@fancee/flux';
</script>
