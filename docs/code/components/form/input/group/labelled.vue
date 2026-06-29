<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormInputGroup aria-label="Phone number">
                <FluxFormSelect
                    v-model="countryCode"
                    :options="countryCodes"/>

                <FluxFormInput
                    v-model="phoneNumber"
                    type="tel"
                    placeholder="Your phone number..."/>
            </FluxFormInputGroup>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormInput, FluxFormInputGroup, FluxFormSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const countryCode = ref('+1');
    const phoneNumber = ref('');

    const countryCodes = [
        { label: '+1', value: '+1' },
        { label: '+31', value: '+31' },
        { label: '+44', value: '+44' },
        { label: '+49', value: '+49' }
    ];
</script>
