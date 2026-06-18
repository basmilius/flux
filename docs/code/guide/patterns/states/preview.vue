<template>
    <Preview>
        <FluxGrid
            :columns="12"
            :gap="18">
            <FluxGridColumn
                :xs="12"
                :md="4">
                <FluxPane style="height: 100%">
                    <FluxPaneBody>
                        <FluxPlaceholder
                            icon="files"
                            title="No invoices yet"
                            message="Create your first invoice to get started.">
                            <FluxPrimaryButton
                                icon-leading="plus"
                                label="New invoice"/>
                        </FluxPlaceholder>
                    </FluxPaneBody>
                </FluxPane>
            </FluxGridColumn>

            <FluxGridColumn
                :xs="12"
                :md="4">
                <FluxPane style="height: 100%">
                    <FluxPaneBody>
                        <FluxFlex
                            align="center"
                            :gap="15">
                            <FluxSkeleton
                                variant="circle"
                                :width="48"
                                :height="48"/>

                            <FluxFlexItem :grow="1">
                                <FluxFlex
                                    direction="vertical"
                                    :gap="9">
                                    <FluxSkeleton width="60%"/>
                                    <FluxSkeleton/>
                                    <FluxSkeleton width="80%"/>
                                </FluxFlex>
                            </FluxFlexItem>
                        </FluxFlex>

                        <FluxSpacing :size="18"/>

                        <FluxFlex
                            align="center"
                            justify="center"
                            :gap="9"
                            style="opacity: .6">
                            <FluxSpinner/>
                            <span>Loading…</span>
                        </FluxFlex>
                    </FluxPaneBody>
                </FluxPane>
            </FluxGridColumn>

            <FluxGridColumn
                :xs="12"
                :md="4">
                <FluxPane style="height: 100%">
                    <FluxPaneBody>
                        <FluxFlex
                            direction="vertical"
                            :gap="12">
                            <FluxNotice
                                color="danger"
                                icon="circle-exclamation"
                                title="Couldn't load data"
                                message="Something went wrong. Please try again."/>

                            <FluxInfoStack>
                                <FluxInfo icon="circle-info">
                                    Your last sync was 5 minutes ago.
                                </FluxInfo>
                            </FluxInfoStack>

                            <FluxSecondaryButton
                                icon-leading="rotate"
                                label="Retry"/>
                        </FluxFlex>
                    </FluxPaneBody>
                </FluxPane>
            </FluxGridColumn>
        </FluxGrid>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxFlexItem, FluxGrid, FluxGridColumn, FluxInfo, FluxInfoStack, FluxNotice, FluxPane, FluxPaneBody, FluxPlaceholder, FluxPrimaryButton, FluxSecondaryButton, FluxSkeleton, FluxSpacing, FluxSpinner } from '@flux-ui/components';
</script>
