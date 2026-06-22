<template>
    <FluxFlyout :width="372">
        <template #opener="{toggle}">
            <span class="opener">
                <FluxSecondaryLinkButton
                    icon-leading="bell"
                    size="small"
                    @click="toggle()"/>
                <span
                    v-if="unreadAlerts > 0"
                    class="badge">
                    {{ unreadAlerts }}
                </span>
            </span>
        </template>

        <template #default="{close}">
            <FluxPane>
                <FluxPaneHeader
                    icon="bell"
                    title="Alerts">
                    <template #after>
                        <FluxSecondaryButton
                            v-if="unreadAlerts > 0"
                            label="Mark all read"
                            @click="markAllAlertsRead()"/>
                    </template>
                </FluxPaneHeader>

                <FluxPaneBody v-if="alerts.length === 0">
                    <FluxText
                        color="muted"
                        size="small">No alerts right now.</FluxText>
                </FluxPaneBody>

                <div
                    v-else
                    class="list">
                    <FluxClickablePane
                        v-for="alert of alerts"
                        :key="alert.id"
                        variant="flat"
                        @click="onOpen(alert, close)">
                        <FluxItem>
                            <FluxItemMedia
                                is-center
                                :size="36">
                                <FluxBoxedIcon
                                    :color="ALERT[alert.type].color"
                                    :name="ALERT[alert.type].icon"
                                    :size="36"/>
                            </FluxItemMedia>

                            <FluxItemContent is-center>
                                <strong>{{ alert.title }}</strong>
                                <span>{{ alert.body }}</span>
                            </FluxItemContent>

                            <FluxItemActions is-center>
                                <span
                                    v-if="!alert.read"
                                    class="unread"/>
                            </FluxItemActions>
                        </FluxItem>
                    </FluxClickablePane>
                </div>

                <FluxPaneFooter>
                    <FluxSecondaryButton
                        icon-trailing="arrow-right"
                        is-fluid
                        label="View reports"
                        type="route"
                        :to="{name: 'reports'}"
                        @click="close()"/>
                </FluxPaneFooter>
            </FluxPane>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxClickablePane, FluxFlyout, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton, FluxSecondaryLinkButton, FluxText } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { useRouter } from 'vue-router';
    import { useAnalyticsStore } from '@/store';
    import type { Alert, AlertType } from '@/types';

    const ALERT: Record<AlertType, { color: FluxColor; icon: FluxIconName }> = {
        spike: {color: 'success', icon: 'arrow-trend-up'},
        drop: {color: 'danger', icon: 'arrow-trend-down'},
        goal: {color: 'primary', icon: 'bullseye'},
        anomaly: {color: 'warning', icon: 'triangle-exclamation'},
        system: {color: 'gray', icon: 'circle-info'}
    };

    const router = useRouter();
    const {alerts, unreadAlerts, markAlertRead, markAllAlertsRead} = useAnalyticsStore();

    function onOpen(alert: Alert, close: () => void): void {
        markAlertRead(alert.id);
        close();

        if (alert.to) {
            router.push({name: alert.to.name, params: alert.to.params});
        }
    }
</script>

<style scoped>
    .opener {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .badge {
        position: absolute;
        top: -3px;
        right: -3px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        font-size: 11px;
        font-weight: 600;
        line-height: 1;
        color: #fff;
        background: var(--danger-500);
        border: 2px solid var(--surface);
        border-radius: 9px;
        pointer-events: none;
    }

    .list {
        display: flex;
        flex-flow: column;
        max-height: 372px;
        overflow-y: auto;
    }

    .unread {
        width: 9px;
        height: 9px;
        background: var(--primary-500);
        border-radius: 50%;
    }
</style>
