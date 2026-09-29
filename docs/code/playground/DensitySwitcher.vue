<template>
    <FluxPane :class="$style.densitySwitcher">
        <FluxFormField
            :class="$style.densitySwitcherField"
            label="Comfortable">
            <FluxToggle
                v-model="comfortable"
                @update:model-value="apply"/>
        </FluxFormField>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxPane, FluxToggle } from '@flux-ui/components';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const comfortable = ref(false);
    let previous: string | null = null;

    onMounted(() => {
        previous = document.documentElement.getAttribute('comfortable');
        comfortable.value = previous !== null;
    });

    onBeforeUnmount(() => {
        if (previous === null) {
            document.documentElement.removeAttribute('comfortable');
        } else {
            document.documentElement.setAttribute('comfortable', previous);
        }
    });

    function apply(value: boolean): void {
        // Teleported overlays inherit the same density as the playground.
        document.documentElement.toggleAttribute('comfortable', value);
    }
</script>

<style
    lang="scss"
    module>
    .densitySwitcher {
        position: fixed;
        left: 24px;
        bottom: 24px;
        padding: 9px 12px;
        z-index: 100;
    }

    .densitySwitcherField {
        flex-flow: row;
        align-items: center;
        gap: 12px;
    }

    @media (max-width: 360px) {
        .densitySwitcher {
            bottom: 72px;
        }
    }
</style>
