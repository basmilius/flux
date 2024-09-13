<template>
    <div
        :class="clsx(
            contentPlacement === 'start' && styles.dividerContentStart,
            contentPlacement === 'center' && styles.dividerContentCenter,
            contentPlacement === 'end' && styles.dividerContentEnd
        )"
        role="separator"
        aria-orientation="horizontal">
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
    import { clsx } from 'clsx';
    import styles from '@/css/component/Divider.module.scss';

    const {
        contentPlacement = 'center'
    } = defineProps<{
        readonly contentPlacement?: 'start' | 'center' | 'end';
    }>();
</script>
