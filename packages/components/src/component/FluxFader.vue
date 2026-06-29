<template>
    <div
        :class="$style.fader"
        role="group"
        aria-roledescription="carousel"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false">
        <slot v-bind="{current, next, previous}"/>
    </div>
</template>

<script lang="ts">
    import type { InjectionKey, Ref } from 'vue';

    export type FluxFaderContext = {
        readonly current: Ref<number>;
        register(): number;
        unregister(): void;
    };

    export const FluxFaderInjectionKey: InjectionKey<FluxFaderContext> = Symbol('FluxFader');
</script>

<script
    lang="ts"
    setup>
    import { computed, onScopeDispose, provide, ref, unref, watch } from 'vue';
    import $style from '~flux/components/css/component/Fader.module.scss';

    const emit = defineEmits<{
        update: [number];
    }>();

    const {
        autoplay = true,
        interval = 9000,
        isPaused = false,
        pauseOnHover = true
    } = defineProps<{
        readonly autoplay?: boolean;
        readonly interval?: number;
        readonly isPaused?: boolean;
        readonly pauseOnHover?: boolean;
    }>();

    defineSlots<{
        default(props: {
            next(): void;
            previous(): void;

            readonly current: number;
        }): any;
    }>();

    const current = ref(0);
    const count = ref(0);
    const isHovering = ref(false);

    let timer: ReturnType<typeof setInterval> | null = null;

    const isActive = computed(() => autoplay && !isPaused && !(pauseOnHover && unref(isHovering)) && unref(count) > 1);

    provide(FluxFaderInjectionKey, {
        current,
        register(): number {
            const index = count.value;
            count.value += 1;
            return index;
        },
        unregister(): void {
            count.value = Math.max(0, count.value - 1);
        }
    });

    function next(): void {
        if (count.value === 0) {
            return;
        }

        current.value = unref(current) + 1 >= count.value ? 0 : unref(current) + 1;
    }

    function previous(): void {
        if (count.value === 0) {
            return;
        }

        current.value = unref(current) - 1 <= -1 ? count.value - 1 : unref(current) - 1;
    }

    function stop(): void {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    function start(): void {
        stop();

        if (!isActive.value) {
            return;
        }

        timer = setInterval(() => next(), interval);
    }

    watch([isActive, () => interval], start, {immediate: true});

    watch(current, value => {
        if (value < 0 || value >= count.value) {
            return;
        }

        emit('update', value);
    });

    onScopeDispose(stop);
</script>
