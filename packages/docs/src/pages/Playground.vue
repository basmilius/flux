<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview v-if="false">
                <flux-pane style="width: 420px">
                    <flux-pane-body>
                        <flux-stack :gap="15">
                            <flux-progress-bar
                                :min="0"
                                :max="100"
                                :value="50"/>
                            <flux-progress-bar is-indeterminate/>
                        </flux-stack>
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <flux-skeleton :is-enabled="isSkeletonEnabled">
                    <flux-stack is-centered>
                        <flux-statistic
                            style="width: 360px"
                            color="primary"
                            change-color="success"
                            change-icon="arrow-trend-up"
                            change-value="1.250"
                            icon="star"
                            label="Leads"
                            value="16.500"/>

                        <flux-statistic
                            style="width: 360px"
                            color="danger"
                            change-color="success"
                            change-icon="arrow-trend-down"
                            change-value="13%"
                            icon="bolt"
                            label="Exceptions"
                            value="13"/>

                        <flux-secondary-button
                            icon-before="clone"
                            label="Toggle skeletons"
                            @click="isSkeletonEnabled = !isSkeletonEnabled"/>
                    </flux-stack>
                </flux-skeleton>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxProgressBar, FluxSecondaryButton, FluxSkeleton, FluxStack, FluxStatistic } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
    import { ref } from 'vue';

    const isSkeletonEnabled = ref(true);
</script>
