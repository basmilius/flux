<template>
    <FluxBorderShine
        :offset="2"
        radius="calc(var(--radius) + 3px)"
        :width="2">
        <FluxPane
            tag="New"
            style="max-width: 360px; border-color: transparent">
            <FluxPaneIllustration
                :animated-colors="['#6071b5', '#f07db7']"
                :animated-seed="130496"
                is-masked
                v-slot:controlled>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style="position: absolute; top: 72%; left: 50%; width: 50%; filter: drop-shadow(0 3px 9px rgb(0 0 0 / .06)); translate: -50% -50%;">
                    <path
                        d="M481.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-30.9 28.1c-7.7 7.1-11.4 17.5-10.9 27.9.1 2.9.2 5.8.2 8.8s-.1 5.9-.2 8.8c-.5 10.5 3.1 20.9 10.9 27.9l30.9 28.1c6.9 6.2 9.6 15.9 6.4 24.6-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2-5.9 7.2-15.7 9.6-24.5 6.8l-39.7-12.6c-10-3.2-20.8-1.1-29.7 4.6-4.9 3.1-9.9 6.1-15.1 8.7-9.3 4.8-16.5 13.2-18.8 23.4l-8.9 40.7c-2 9.1-9 16.3-18.2 17.8-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-8.9-40.7c-2.2-10.2-9.5-18.6-18.8-23.4-5.2-2.7-10.2-5.6-15.1-8.7-8.8-5.7-19.7-7.8-29.7-4.6l-39.6 12.7c-8.8 2.8-18.6.3-24.5-6.8-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3-3.2-8.7-.5-18.4 6.4-24.6l30.9-28.1c7.7-7.1 11.4-17.5 10.9-27.9-.1-2.9-.2-5.8-.2-8.8s.1-5.9.2-8.8c.5-10.5-3.1-20.9-10.9-27.9L8.4 191.2C1.5 185-1.2 175.3 2 166.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2 5.9-7.2 15.7-9.6 24.5-6.8l39.7 12.6c10 3.2 20.8 1.1 29.7-4.6 4.9-3.1 9.9-6.1 15.1-8.7 9.3-4.8 16.5-13.2 18.8-23.4l8.9-40.7c2-9.1 9-16.3 18.2-17.8C213.3 1.2 227.5 0 242 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l8.9 40.7c2.2 10.2 9.4 18.6 18.8 23.4 5.2 2.7 10.2 5.6 15.1 8.7 8.8 5.7 19.7 7.7 29.7 4.6l39.7-12.6c8.8-2.8 18.6-.3 24.5 6.8 8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM242 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                        fill="white"
                        stroke="rgb(0 0 0 / .15)"
                        stroke-width="3"/>
                </svg>
            </FluxPaneIllustration>

            <FluxPaneHeader title="Manage even more"/>

            <FluxPaneBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet assumenda beatae commodi culpa fugit laboriosam nihil quasi quibusdam veniam! Cumque et fuga iste maxime officiis quas ratione repudiandae suscipit!
            </FluxPaneBody>

            <FluxPaneBody>
                <FluxSecondaryButton
                    icon-leading="gear"
                    label="Manage"/>
            </FluxPaneBody>
        </FluxPane>
    </FluxBorderShine>
</template>

<script
    lang="ts"
    setup>
    import { FluxBorderShine, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneIllustration, FluxSecondaryButton } from '@flux-ui/components';
</script>
