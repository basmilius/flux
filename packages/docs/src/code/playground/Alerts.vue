<template>
    <flux-button-stack>
        <flux-secondary-button
            icon-before="circle-check"
            label="Alert"
            @click="showAlert"/>

        <flux-secondary-button
            icon-before="circle-check"
            label="Confirm"
            @click="showConfirm"/>

        <flux-secondary-button
            icon-before="pen"
            label="Prompt"
            @click="showPrompt"/>
    </flux-button-stack>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { fluxAlert, FluxButtonStack, fluxConfirm, fluxPrompt, FluxSecondaryButton, useFluxStore } from '@fancee/flux';

    async function showAlert(): Promise<void> {
        await fluxAlert({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.'
        });
    }

    async function showConfirm(): Promise<void> {
        await fluxConfirm({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.'
        });
    }

    async function showPrompt(): Promise<void> {
        const result = await fluxPrompt({
            icon: 'pen',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.',
            fieldLabel: 'Message'
        });

        if (!result) {
            return;
        }

        await fluxAlert({
            title: 'Result',
            message: result
        });
    }
</script>
