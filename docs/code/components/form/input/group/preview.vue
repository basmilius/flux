<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormInputGroup>
                    <FluxFormInput
                        v-model="username"
                        placeholder="Your username..."/>

                    <FluxSecondaryButton
                        icon-leading="rotate"
                        @click="getRandomUsername"/>
                </FluxFormInputGroup>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormInput, FluxFormInputGroup, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const usernames = [
        "NeoFlux",
        "FluxRider",
        "SilentFlux",
        "FluxNova",
        "CyberFlux",
        "DarkFlux",
        "FluxHaven",
        "QuantumFlux",
        "FluxDrift",
        "ArcaneFlux"
    ];

    const username = ref('');

    function getRandomUsername(): void {
        username.value = usernames[Math.floor(Math.random() * usernames.length)];
    }
</script>
