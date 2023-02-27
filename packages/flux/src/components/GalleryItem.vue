<template>
    <div
        class="flux-gallery-item"
        @mouseenter.capture="isDeleteVisible = true"
        @mouseout.capture="isDeleteVisible = false">
        <img
            class="flux-gallery-item-image"
            alt=""
            :src="url">

        <flux-remove
            v-if="isDeletable"
            :is-hidden="!isDeleteVisible"
            @click="$emit('delete')"/>

        <div
            v-if="isPending"
            class="flux-pane-overlay">
            <flux-spinner :size="24"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue-demi';
    import { FluxRemove, FluxSpinner } from '.';

    interface Emits {
        (e: 'delete'): void;
    }

    interface Props {
        readonly isDeletable?: boolean;
        readonly isPending?: boolean;
        readonly url: string;
    }

    defineEmits<Emits>();
    defineProps<Props>();

    const isDeleteVisible = ref(false);
</script>

<style lang="scss">
    .flux-gallery-item {
        position: relative;
        aspect-ratio: 1 / 1;

        &-image {
            position: absolute;
            display: block;
            inset: 0;
            height: 100%;
            width: 100%;
            border-radius: var(--radius);
            box-shadow: inset 0 0 0 1px rgb(0 0 0 / .05);
            object-fit: cover;
            object-position: center;
        }

        .flux-pane-overlay {
            inset: 1px;
            border-radius: calc(var(--radius) - 1px);
            z-index: 0;
        }

        .flux-remove {
            z-index: 1;
        }
    }
</style>
