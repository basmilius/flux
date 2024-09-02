<template>
    <div
        :class="styles.tab"
        role="tabpanel">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import styles from '@/css/component/Tab.module.scss';

    export type Props = {
        readonly icon?: IconNames;
        readonly label?: string;
    };

    defineProps<Props>();
</script>
