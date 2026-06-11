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
    import { useInterval } from '@basmilius/common';
    import { unrefTemplateElement } from '@flux-ui/internals';
    import { ref, unref, useTemplateRef, type VNode, watch } from 'vue';
    import $style from '~flux/components/css/component/Fader.module.scss';

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
        }): VNode[];
    }>();

    const faderRef = useTemplateRef('fader');
    useInterval(interval, () => next());

    const current = ref(-1);

    function getItems(): Element[] {
        const fader = unrefTemplateElement(faderRef);

        if (!fader) {
            return [];
        }

        return Array.from(fader.children).filter(child => child.classList.contains($style.faderItem));
    }

    function next(): void {
        const count = getItems().length;

        if (count === 0) {
            return;
        }

        current.value = unref(current) + 1 >= count ? 0 : unref(current) + 1;
    }

    function previous(): void {
        const count = getItems().length;

        if (count === 0) {
            return;
        }

        current.value = unref(current) - 1 <= -1 ? count - 1 : unref(current) - 1;
    }

    watch(current, current => {
        const items = getItems();

        if (current < 0 || current >= items.length) {
            return;
        }

        items.forEach(item => item.classList.remove($style.isCurrent));
        items[current].classList.add($style.isCurrent);
        emit('update', current);
    }, {immediate: true});
</script>
