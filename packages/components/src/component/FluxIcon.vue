<template>
    <svg
        v-if="renderMode === 'svg' && definition"
        :viewBox.attr="`0 0 ${definition.width} ${definition.height}`"
        :class="clsx(
            $style.fontAwesomeIcon,
            color && ICON_COLOR_CLASS[color]
        )"
        :style="{
            fontSize: typeof size === 'number' ? `${size}px` : size,
            scale: definition.scale > 1 ? definition.scale : undefined
        }"
        focusable="false"
        :role="ariaLabel ? 'img' : undefined"
        :aria-hidden="ariaLabel ? undefined : true"
        :aria-label="ariaLabel"
        @click="onClick">
        <path
            v-for="(path, index) in definition.paths"
            :key="index"
            :d="path"
            fill="currentColor"/>
    </svg>

    <i
        v-else-if="renderMode === 'font' && name"
        :class="clsx(
            $style.iconFont,
            FONT_STYLE_CLASS[resolvedStyle],
            color && ICON_COLOR_CLASS[color]
        )"
        :style="{
            fontSize: typeof size === 'number' ? `${size}px` : size
        }"
        :role="ariaLabel ? 'img' : undefined"
        :aria-hidden="ariaLabel ? undefined : true"
        :aria-label="ariaLabel"
        @click="onClick"><template v-if="resolvedStyle === 'duotone'"><span :class="$style.iconFontSecondary">{{ `${name}##` }}</span><span :class="$style.iconFontPrimary">{{ `${name}#` }}</span></template><template v-else>{{ name }}</template></i>

    <i
        v-else
        :class="$style.icon"/>
</template>

<script
    lang="ts"
    setup>
    import { warn } from '@flux-ui/internals';
    import type { FluxColor, FluxIconName, FluxIconStyle } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import { iconConfig, iconRegistry } from '~flux/components/data';
    import $style from '~flux/components/css/component/Icon.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        iconStyle,
        name
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly color?: FluxColor;
        readonly iconStyle?: FluxIconStyle;
        readonly size?: number | string;
        readonly name?: FluxIconName;
    }>();

    const ICON_COLOR_CLASS: Readonly<Record<FluxColor, string>> = Object.freeze({
        gray: $style.iconGray,
        primary: $style.iconPrimary,
        danger: $style.iconDanger,
        info: $style.iconInfo,
        success: $style.iconSuccess,
        warning: $style.iconWarning
    });

    const FONT_STYLE_CLASS: Readonly<Record<FluxIconStyle, string>> = Object.freeze({
        solid: 'fa-solid',
        regular: 'fa-regular',
        light: 'fa-light',
        thin: 'fa-thin',
        duotone: 'fa-duotone',
        brands: 'fa-brands'
    });

    const renderMode = computed(() => iconConfig.renderMode);

    const resolvedStyle = computed(() => iconStyle ?? (name && iconConfig.styleOverrides[name]) ?? iconConfig.defaultStyle);

    const definition = computed(() => {
        if (!name) {
            return null;
        }

        const icon = iconRegistry[name];

        if (!icon) {
            warn(`Unknown icon: ${name}`);

            return null;
        }

        return {
            width: icon[0],
            height: icon[1],
            paths: (Array.isArray(icon[4]) ? icon[4] : [icon[4]]) as string[],
            scale: Math.max(1, icon[0] / 512)
        };
    });

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
