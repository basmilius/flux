<template>
    <FluxPane
        class="flux-feature-card"
        :class="{'coming-soon': isComingSoon}">
        <FluxPaneBody class="flux-feature-card-header">
            <FluxStack
                class="flux-feature-card-caption"
                :gap="6">
                <h3 class="flux-feature-card-title">{{ title }}</h3>
                <p class="flux-feature-card-description">{{ description }}</p>
            </FluxStack>

            <FluxBoxedIcon
                :size="18"
                :variant="icon"/>
        </FluxPaneBody>

        <FluxPaneBody v-if="$slots.default">
            <slot/>
        </FluxPaneBody>

        <FluxPaneBody v-if="buttonTo">
            <FluxStack axis="horizontal">
                <FluxSecondaryButton
                    :icon-after="buttonIcon"
                    :label="buttonLabel ?? translate('flux_continue')"
                    :to="buttonTo"
                    type="route"/>
            </FluxStack>
        </FluxPaneBody>

        <div
            v-if="isComingSoon"
            class="flux-feature-card-coming-soon">
            {{ translate('flux_coming_soon') }}
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import { useTranslate } from '@/composable';
    import FluxBoxedIcon from './FluxBoxedIcon.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxStack from './FluxStack.vue';

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

        &-header {
            align-items: flex-start;
            flex-flow: row;
            gap: 15px;
        }

        &-caption {
            flex-grow: 1;
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
            color: var(--foreground-secondary);
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

            @at-root [dark] & {
                background: white;
                color: rgb(var(--gray-0));
            }
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
