<template>
    <div
        ref="fader"
        :class="$style.fader">
        <slot v-bind="{current, next, previous}"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement, useInterval } from '@basmilius/flux-internals';
    import { computed, ref, unref, useTemplateRef, watch } from 'vue';
    import $style from '$flux/css/component/Fader.module.scss';

    const emit = defineEmits<{
        update: [number];
    }>();

    const {
        interval = 9000
    } = defineProps<{
        readonly interval?: number;
    }>();

    defineSlots<{
        default(props: {
            next(): void;
            previous(): void;

            readonly current: number;
        }): any;
    }>();

    const faderRef = useTemplateRef('fader');
    useInterval(interval, () => next());

    const current = ref(-1);

    const count = computed(() => {
        const fader = unrefTemplateElement(faderRef);
        return fader?.children.length ?? 0;
    });

    function next(): void {
        current.value = unref(current) + 1 >= unref(count) ? 0 : unref(current) + 1;
    }

    function previous(): void {
        current.value = unref(current) - 1 <= -1 ? unref(count) - 1 : unref(current) + 1;
    }

    watch(current, current => {
        const fader = unrefTemplateElement(faderRef);

        if (!fader || fader.children.length === 0) {
            return;
        }

        Array.from(fader.children).forEach(item => item.classList.remove($style.isCurrent));
        fader.children[current].classList.add($style.isCurrent);
        emit('update', current);
    }, {immediate: true});
</script>
