<template>
    <div
        ref="faderRef"
        class="flux-fader">
        <slot v-bind="{current, next, previous}"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, toRefs, unref, watch } from 'vue';
    import { useInterval } from '@/composable';

    export interface Emits {
        (e: 'update', index: number): void;
    }

    export interface Props {
        readonly interval?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        interval: 9000
    });
    const {interval} = toRefs(props);

    const faderRef = ref<HTMLDivElement>();
    const current = ref(-1);

    useInterval(interval, () => next());

    const count = computed(() => {
        const fader = unref(faderRef);
        return fader?.children.length ?? 0;
    });

    function next(): void {
        current.value = unref(current) + 1 === unref(count) ? 0 : unref(current) + 1;
    }

    function previous(): void {
        current.value = unref(current) - 1 === -1 ? unref(count) - 1 : unref(current) + 1;
    }

    watch(current, current => {
        const fader = unref(faderRef);

        if (!fader || fader.children.length === 0) {
            return;
        }

        Array.from(fader.children).forEach(item => item.classList.remove('is-current'));
        fader.children[current].classList.add('is-current');
    }, {immediate: true});
</script>

<style lang="scss">
    .flux-fader {
        position: relative;
        background: black;
        border-radius: var(--radius);
        overflow: hidden;
        z-index: 0;
    }
</style>
