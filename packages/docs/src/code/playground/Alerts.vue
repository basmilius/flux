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
    </flux-button-stack>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton, useFluxStore } from '@fancee/flux';

    const {addAlert, addConfirm, removeAlert, removeConfirm} = useFluxStore();

    function showAlert(): void {
        const id = addAlert({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.',
            onClose(): void {
                removeAlert(id);
            }
        });
    }

    function showConfirm(): void {
        const id = addConfirm({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ea labore. Architecto autem earum magni mollitia porro quidem quo sed voluptatum. Consequuntur deserunt est, fugit minima quod ratione repudiandae unde.',
            onCancel(): void {
                removeConfirm(id);
            },
            onConfirm(): void {
                removeConfirm(id);
            }
        });
    }
</script>
