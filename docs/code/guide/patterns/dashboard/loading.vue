<template>
    <Preview>
        <FluxContainer style="width: 100%">
            <FluxGrid
                :columns="12"
                :gap="18">
                <FluxGridColumn
                    v-for="i in 3"
                    :key="i"
                    :xs="12"
                    :md="4">
                    <FluxPane style="height: 100%">
                        <FluxPaneBody>
                            <FluxFlex
                                direction="vertical"
                                :gap="12">
                                <FluxFlex align="center">
                                    <FluxSkeleton
                                        variant="rounded"
                                        :width="42"
                                        :height="42"/>

                                    <FluxFlexItem :grow="1">
                                        <FluxSkeleton
                                            variant="text"
                                            width="50%"
                                            :height="15"/>
                                    </FluxFlexItem>
                                </FluxFlex>

                                <FluxSkeleton
                                    variant="text"
                                    width="40%"
                                    :height="27"/>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :xs="12"
                    :md="7">
                    <FluxPane style="height: 100%">
                        <FluxPaneBody>
                            <FluxFlex
                                direction="vertical"
                                :gap="12">
                                <FluxSkeleton
                                    variant="text"
                                    width="45%"
                                    :height="18"/>

                                <FluxSkeleton
                                    variant="rounded"
                                    :height="12"/>

                                <FluxSkeleton width="70%"/>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :xs="12"
                    :md="5">
                    <FluxPane style="height: 100%; min-height: 150px">
                        <FluxPaneBody style="height: 100%">
                            <FluxFlex
                                align="center"
                                direction="vertical"
                                justify="center"
                                :gap="12"
                                style="height: 100%">
                                <FluxSpinner :size="30"/>

                                <span style="opacity: .6">Loading team…</span>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxContainer>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxContainer, FluxFlex, FluxFlexItem, FluxGrid, FluxGridColumn, FluxPane, FluxPaneBody, FluxSkeleton, FluxSpinner } from '@flux-ui/components';
</script>
