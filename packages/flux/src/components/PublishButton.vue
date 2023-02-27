<template>
    <flux-base-button
        class="flux-primary-button flux-publish-button"
        :class="{
            'idle': !isDone && !isLoading,
            'done': isDone,
            'loading': isLoading
        }"
        v-bind="{type, disabled, iconAfter, isLoading, label, to}"
        @click="$emit('click', $event)">
        <template #icon-before="{}">
            <div class="flux-publish-button-icon">
                <flux-icon
                    class="flux-publish-button-cloud"
                    variant="cloud"/>

                <flux-icon
                    class="flux-publish-button-cloud"
                    variant="cloud"/>

                <svg
                    class="flux-publish-button-icon"
                    viewBox="0 0 512 512">
                    <!-- circle -->
                    <path
                        class="circle"
                        d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256ZM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48Z"/>

                    <!-- arrow -->
                    <path
                        class="arrow"
                        d="M272.9 135.7c-4.6-4.9-11-7.7-17.7-7.7-7.7.3-14.1 2.9-17.7 7.8l-87.25 96a23.86 23.86 0 0 0-4.15 25.9c3.8 8.7 12.4 14.3 21 14.3h56l.9 88a24 24 0 0 0 24 24h16c13.25 0 23.1-10.75 23.1-24v-88h56c9.53 0 18.16-5.66 22-14.38a24.03 24.03 0 0 0-4.38-25.91L272.9 135.7Z"/>

                    <!-- check -->
                    <path
                        class="check"
                        d="M243.8 339.8a28.07 28.07 0 0 1-39.6 0l-64-64a28.07 28.07 0 0 1 0-39.6 28.07 28.07 0 0 1 39.6 0l44.2 44.2 108.2-108.2a28.07 28.07 0 0 1 39.6 0 28.07 28.07 0 0 1 0 39.6l-128 128Z"/>
                </svg>
            </div>
        </template>
    </flux-base-button>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoutingLocation, IconNames } from '../data';
    import { FluxBaseButton, FluxIcon } from '.';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames;
        readonly isDone?: boolean;
        readonly isLoading?: boolean;
        readonly label?: string;
        readonly to?: FluxRoutingLocation;
    }

    defineEmits<Emits>();

    const props = withDefaults(defineProps<Props>(), {
        type: 'button'
    });
</script>

<style lang="scss">
    .flux-publish-button {
        overflow: hidden;

        &-cloud {
            position: absolute;
            top: 50%;
            opacity: 0;
            animation: publish .6s linear infinite;
            transition: 360ms var(--swift-out) 210ms;

            &:nth-child(2) {
                left: -12px;
                animation-delay: -.3s;
            }

            &:nth-child(3) {
                right: -12px;
            }
        }

        &-icon {
            position: relative;
            display: block;
            height: 20px;
            width: 20px;
            align-items: center;
            justify-content: center;
            overflow: visible;

            path {
                fill: currentColor;
                transition: 270ms var(--swift-out);
            }
        }

        &.idle {
            .check {
                opacity: 0;
            }
        }

        &.done {
            .arrow {
                animation: arrow-out .4s var(--acceleration-curve) both;
            }

            .check,
            .circle {
                transition-delay: .5s;
            }
        }

        &.loading {
            .arrow {
                animation: arrow-in 1s var(--deceleration-curve) both;
            }

            .check {
                opacity: 0;
            }

            .circle {
                opacity: 0;
            }
        }

        &.loading &-cloud {
            opacity: .5;
        }
    }

    @keyframes arrow-in {
        25% {
            translate: 0 128px;
        }
        100% {
            translate: 0 0;
        }
    }

    @keyframes arrow-out {
        to {
            opacity: 0;
            translate: 0 -512px;
        }
    }

    @keyframes publish {
        from {
            translate: 0 calc(-30px - 50%);
        }
        to {
            translate: 0 calc(30px - 50%);
        }
    }
</style>
