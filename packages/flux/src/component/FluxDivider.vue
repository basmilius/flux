<template>
    <div :class="CLASS_MAP[contentPlacement]">
        <div
            v-if="$slots.default"
            :class="styles.dividerContent">
            <slot/>
        </div>

        <hr
            v-else
            :class="styles.dividerLine">
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Divider.module.scss';

    const CLASS_MAP = {
        start: styles.dividerContentStart,
        center: styles.dividerContentCenter,
        end: styles.dividerContentEnd
    } as const;

    export interface Props {
        readonly contentPlacement?: 'start' | 'center' | 'end';
    }

    withDefaults(defineProps<Props>(), {
        contentPlacement: 'center'
    });
</script>
