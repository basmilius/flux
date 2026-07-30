<template>
    <div
        :class="clsx(
            variant === 'error' && $style.applicationStatusPageError,
            variant === 'maintenance' && $style.applicationStatusPageMaintenance,
            variant === 'not-found' && $style.applicationStatusPageNotFound,
            variant === 'offline' && $style.applicationStatusPageOffline
        )">
        <div
            v-if="slots.media"
            :class="$style.applicationStatusPageMedia">
            <slot name="media"/>
        </div>

        <FluxBoxedIcon
            v-else
            :color="preset.color"
            :name="icon ?? preset.icon"
            rounded/>

        <div :class="$style.applicationStatusPageBody">
            <span
                v-if="code"
                aria-hidden="true"
                :class="$style.applicationStatusPageCode">
                {{ code }}
            </span>

            <h1>{{ title ?? translate(preset.title) }}</h1>

            <slot>
                <p>{{ description ?? translate(preset.description) }}</p>
            </slot>
        </div>

        <div :class="$style.applicationStatusPageActions">
            <slot name="actions">
                <FluxSecondaryButton
                    :label="translate('flux.application.back')"
                    @click="onBackClick"/>
            </slot>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxSecondaryButton } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type VNode } from 'vue';
    import { useTranslate } from '../composable/private';
    import { useRouter } from '../routing';
    import $style from '~flux/application/css/component/ApplicationStatusPage.module.scss';

    const {
        variant = 'error'
    } = defineProps<{
        readonly code?: string | number;
        readonly description?: string;
        readonly icon?: FluxIconName;
        readonly title?: string;
        readonly variant?: 'error' | 'maintenance' | 'not-found' | 'offline';
    }>();

    const slots = defineSlots<{
        actions?(): VNode[];
        default?(): VNode[];
        media?(): VNode[];
    }>();

    const PRESETS = {
        'error': {
            color: 'danger',
            description: 'flux.application.statusErrorDescription',
            icon: 'triangle-exclamation',
            title: 'flux.application.statusErrorTitle'
        },
        'maintenance': {
            color: 'warning',
            description: 'flux.application.statusMaintenanceDescription',
            icon: 'screwdriver-wrench',
            title: 'flux.application.statusMaintenanceTitle'
        },
        'not-found': {
            color: 'primary',
            description: 'flux.application.statusNotFoundDescription',
            icon: 'compass',
            title: 'flux.application.statusNotFoundTitle'
        },
        'offline': {
            color: 'gray',
            description: 'flux.application.statusOfflineDescription',
            icon: 'wifi-slash',
            title: 'flux.application.statusOfflineTitle'
        }
    } as const;

    const router = useRouter();
    const translate = useTranslate();

    const preset = computed(() => PRESETS[variant]);

    function onBackClick(): void {
        if (router) {
            router.back();
            return;
        }

        history.back();
    }
</script>
