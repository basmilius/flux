<template>
    <flux-pane
        class="flux-feature-card"
        :class="{'coming-soon': isComingSoon}">
        <flux-pane-body class="flux-feature-card-header">
            <flux-stack class="flux-feature-card-caption">
                <h3 class="flux-feature-card-title">{{ title }}</h3>
                <p class="flux-feature-card-description">{{ description }}</p>
            </flux-stack>

            <div class="flux-feature-card-icon">
                <flux-icon
                    :size="24"
                    :variant="icon"/>
            </div>
        </flux-pane-body>
        <flux-pane-body>
            <slot/>
        </flux-pane-body>
        <flux-pane-body>
            <flux-stack
                v-if="buttonTo"
                axis="horizontal">
                <flux-secondary-button
                    :icon-after="buttonIcon"
                    :label="buttonLabel ?? translate('flux_continue')"
                    :to="buttonTo"
                    type="route"/>
            </flux-stack>
        </flux-pane-body>
        <div
            v-if="isComingSoon"
            class="flux-feature-card-coming-soon">
            {{ translate('flux_coming_soon') }}
        </div>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoutingLocation, IconNames } from '../data';
    import { useTranslate } from '../composables';
    import { FluxIcon, FluxPane, FluxPaneBody, FluxSecondaryButton, FluxStack } from '.';

    export interface Props {
        readonly buttonIcon?: IconNames;
        readonly buttonLabel?: string;
        readonly buttonTo?: FluxRoutingLocation;
        readonly description: string;
        readonly icon: IconNames;
        readonly isComingSoon?: boolean;
        readonly title: string;
    }

    withDefaults(defineProps<Props>(), {
        buttonIcon: 'circle-arrow-right'
    });

    const translate = useTranslate();
</script>

<style lang="scss">
    .flux-feature-card {
        display: flex;
        flex-flow: column;
        gap: 21px;

        &-header.flux-pane-body {
            display: flex;
            align-items: flex-start;
            flex-flow: row;
            gap: 30px;
        }

        &-caption.flux-stack {
            flex-grow: 1;
            gap: 6px;
        }

        &-title,
        &-description {
            margin: 0;
        }

        &-title {
            color: var(--foreground);
            font-size: 16px;
            font-weight: 700;
        }

        &-description {
            font-size: 15px;
        }

        &-coming-soon {
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 9px 12px;
            background: rgb(var(--gray-9));
            border-radius: var(--radius);
            color: rgb(var(--gray-0));
            font-size: 14px;
            font-weight: 600;
            rotate: -6deg;
            translate: -50% -50%;

            @at-root .dark-layout & {
                background: white;
                color: rgb(var(--gray-0));
            }
        }

        &-icon {
            display: flex;
            height: 54px;
            width: 54px;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
            background: rgb(var(--primary-7));
            border-radius: var(--radius);
            color: rgb(var(--primary-0));
        }

        &-illustration {
            display: block;
            height: 150px;
            margin-left: auto;
            margin-right: auto;
        }

        &.coming-soon &-header,
        &.coming-soon &-illustration {
            filter: blur(2px);
            opacity: .5;
        }
    }
</style>
