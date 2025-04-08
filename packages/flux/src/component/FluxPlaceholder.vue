<template>
    <div
        :class="clsx(
            $style.placeholder,
            isButton && $style.isButton,
            variant === 'extended' && $style.isExtended,
            variant === 'simple' && $style.isSimple,
            variant === 'small' && $style.isSmall
        )"
        role="presentation"
        @click="onClick">
        <FluxIcon
            v-if="icon"
            :class="$style.placeholderIcon"
            :name="icon"/>

        <div :class="$style.placeholderCaption">
            <strong v-if="title">
                {{ title }}
            </strong>

            <p v-if="message">
                {{ message }}
            </p>
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Placeholder.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        variant = 'extended'
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isButton?: boolean;
        readonly message?: string;
        readonly title?: string;
        readonly variant?: 'extended' | 'simple' | 'small';
    }>();

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
