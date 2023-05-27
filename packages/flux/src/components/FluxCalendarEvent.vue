<template>
    <FluxTooltip :content="label">
        <button
            class="flux-calendar-event"
            @click="onClick">
            <span>{{ label }}</span>
        </button>
    </FluxTooltip>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { computed } from 'vue-demi';
    import { hyphenateTag } from '@/utils';
    import FluxTooltip from './FluxTooltip.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly date: DateTime;
        readonly label: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const transitionName = computed(() => hyphenateTag(props.label));

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>

<style lang="scss">
    .flux-calendar-event {
        margin-left: -9px;
        margin-right: -9px;
        padding: 3px 9px;
        background: rgb(var(--primary-6));
        border: 0;
        border-radius: calc(var(--radius) / 2);
        color: rgb(var(--primary-0));
        cursor: pointer;
        font-size: 12px;
        text-align: left;

        /** note: This works in all browsers. */
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        view-transition-name: v-bind(transitionName);

        &:hover {
            background: rgb(var(--primary-7));
        }
    }
</style>
