<template>
    <button
        ref="tabRef"
        :class="isActive ? styles.tabBarItemActive : styles.tabBarItem"
        type="button"
        role="tab"
        :aria-selected="isActive"
        @click="$emit('click', $event)">
        <FluxIcon
            v-if="icon"
            :size="16"
            :variant="icon"/>

        <span v-if="label">{{ label }}</span>
    </button>
</template>

<script
    lang="ts"
    setup>
    import { ref, toRefs, unref, watch } from 'vue';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Tab.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly icon?: IconNames;
        readonly isActive?: boolean;
        readonly label?: string;
    };

    defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isActive} = toRefs(props);

    const tabRef = ref<HTMLButtonElement>();

    watch(isActive, isActive => {
        if (!isActive) {
            return;
        }

        const tab = unref(tabRef);

        if (!tab) {
            return;
        }

        if (tab.parentElement?.offsetWidth === tab.parentElement?.scrollWidth) {
            return;
        }

        tab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, {immediate: true});
</script>
