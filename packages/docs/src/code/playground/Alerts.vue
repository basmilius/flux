<template>
    <flux-button-stack>
        <flux-secondary-button
            icon-before="circle-check"
            label="Alert"
            @click="onShowAlertClicked"/>

        <flux-secondary-button
            icon-before="circle-check"
            label="Confirm"
            @click="onShowConfirmClicked"/>

        <flux-secondary-button
            icon-before="pen"
            label="Prompt"
            @click="onShowPromptClicked"/>
    </flux-button-stack>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton, showAlert, showConfirm, showPrompt } from '@fancee/flux';

    async function onShowAlertClicked(): Promise<void> {
        await showAlert({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.'
        });
    }

    async function onShowConfirmClicked(): Promise<void> {
        await showConfirm({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.'
        });
    }

    async function onShowPromptClicked(): Promise<void> {
        const result = await showPrompt({
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
