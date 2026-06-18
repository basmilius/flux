<template>
    <Preview>
        <FluxGrid
            :columns="12"
            :gap="18">
            <FluxGridColumn
                v-for="kpi in kpis"
                :key="kpi.label"
                :xs="12"
                :md="3">
                <FluxPane style="height: 100%">
                    <FluxPaneBody>
                        <FluxFlex
                            direction="vertical"
                            :gap="9">
                            <FluxFlex align="center">
                                <FluxIcon :name="kpi.icon"/>

                                <FluxFlexItem :grow="1">
                                    <span style="opacity: .6">{{ kpi.label }}</span>
                                </FluxFlexItem>

                                <FluxBadge
                                    :color="kpi.delta >= 0 ? 'success' : 'danger'"
                                    :icon="kpi.delta >= 0 ? 'arrow-trend-up' : 'arrow-trend-down'"
                                    :label="`${Math.abs(kpi.delta)}%`"/>
                            </FluxFlex>

                            <strong style="font-size: 1.75rem">{{ kpi.value }}</strong>

                            <FluxSpacing :size="3"/>

                            <FluxLink
                                href="#"
                                label="View report"/>
                        </FluxFlex>
                    </FluxPaneBody>
                </FluxPane>
            </FluxGridColumn>

            <FluxGridColumn
                :xs="12"
                :md="3">
                <FluxPressable
                    component-type="button"
                    style="display: block; width: 100%; height: 100%"
                    @click="added++">
                    <FluxPane
                        variant="well"
                        style="height: 100%">
                        <FluxPaneBody>
                            <FluxFlex
                                align="center"
                                direction="vertical"
                                justify="center"
                                :gap="6"
                                style="height: 100%; opacity: .7">
                                <FluxIcon
                                    name="plus"
                                    :size="20"/>

                                <span>Add widget ({{ added }})</span>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxPressable>
            </FluxGridColumn>
        </FluxGrid>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { FluxBadge, FluxFlex, FluxFlexItem, FluxGrid, FluxGridColumn, FluxIcon, FluxLink, FluxPane, FluxPaneBody, FluxPressable, FluxSpacing } from '@flux-ui/components';
    import { ref } from 'vue';

    const added = ref(0);

    const kpis: { label: string; value: string; delta: number; icon: FluxIconName }[] = [
        {label: 'Revenue', value: '$48.2k', delta: 12, icon: 'money-bill'},
        {label: 'Active users', value: '8,420', delta: 4, icon: 'users'},
        {label: 'Churn', value: '1.8%', delta: -2, icon: 'arrow-trend-down'}
    ];
</script>
