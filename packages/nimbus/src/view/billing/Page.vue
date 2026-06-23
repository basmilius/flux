<template>
    <FluxApplicationContent layout="default">
        <FluxApplicationHero
            subtitle="You're on the free demo plan — upgrade for unlimited projects and advanced reports."
            title="Plans & billing">
            <template #end>
                <FluxPublishButton
                    label="Upgrade now"
                    @click="onUpgrade()"/>
            </template>
        </FluxApplicationHero>

        <FluxApplicationSection title="Choose a plan">
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxFlex justify="center">
                    <FluxSegmentedControl
                        v-model="cycle"
                        aria-label="Billing cycle">
                        <FluxSegmentedControlItem
                            label="Monthly"
                            value="monthly"/>
                        <FluxSegmentedControlItem
                            label="Yearly"
                            value="yearly"/>
                    </FluxSegmentedControl>
                </FluxFlex>

                <FluxPaneGroup>
                    <FluxPane
                        v-for="plan of plans"
                        :key="plan.name"
                        class="plan">
                        <FluxBorderBeam
                            v-if="plan.featured"
                            color-variant="ocean"/>
                        <FluxPaneBody>
                            <FluxFlex
                                align="start"
                                direction="vertical"
                                :gap="12">
                                <FluxText
                                    color="muted"
                                    size="medium"
                                    tag="strong">{{ plan.name }}</FluxText>
                                <FluxFadeTransition>
                                    <FluxText
                                        :key="String(cycle)"
                                        size="display"
                                        :weight="700">
                                        {{ price(plan) }}
                                    </FluxText>
                                </FluxFadeTransition>
                                <FluxFlex
                                    class="plan-features"
                                    direction="vertical"
                                    :gap="6"
                                    tag="ul">
                                    <FluxFlex
                                        v-for="feature of plan.features"
                                        :key="feature"
                                        align="center"
                                        :gap="9"
                                        tag="li">
                                        <FluxIcon name="circle-check"/>
                                        <FluxText
                                            color="gray"
                                            size="small">{{ feature }}</FluxText>
                                    </FluxFlex>
                                </FluxFlex>
                                <FluxPrimaryButton
                                    is-fluid
                                    :label="plan.price === 0 ? 'Current plan' : `Choose ${plan.name}`"
                                    @click="onChoose(plan.name)"/>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxPaneGroup>

                <FluxFlex
                    align="center"
                    :gap="6">
                    <FluxText
                        color="muted"
                        size="small">All paid plans include a 14-day trial.</FluxText>
                    <FluxLink
                        href="https://flux-ui.dev"
                        label="Compare all features"
                        target="_blank"
                        type="link"/>
                </FluxFlex>
            </FluxFlex>
        </FluxApplicationSection>

        <FluxApplicationSection title="Built with Flux visuals">
            <FluxGrid>
                <FluxGridColumn
                    v-for="visual of visuals"
                    :key="visual.label"
                    :lg="4"
                    :sm="6"
                    :xs="12">
                    <div :class="['visual', `visual-${visual.id}`]">
                        <FluxDotPattern v-if="visual.id === 'dots'"/>
                        <FluxGridPattern v-else-if="visual.id === 'grid'"/>
                        <FluxFlickeringGrid
                            v-else-if="visual.id === 'flicker'"
                            color="#5285f8"/>
                        <FluxAnimatedColors
                            v-else-if="visual.id === 'colors'"
                            :colors="['#5285f8', '#10b981', '#f59e0b']"/>
                        <FluxBorderShine v-else/>
                        <FluxText
                            class="visual-label"
                            size="small"
                            :weight="500">{{ visual.label }}</FluxText>
                    </div>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationHero, FluxApplicationSection } from '@flux-ui/application';
    import { FluxAnimatedColors, FluxBorderBeam, FluxBorderShine, FluxDotPattern, FluxFadeTransition, FluxFlex, FluxFlickeringGrid, FluxGrid, FluxGridColumn, FluxGridPattern, FluxIcon, FluxLink, FluxPane, FluxPaneBody, FluxPaneGroup, FluxPrimaryButton, FluxPublishButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxText, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';
    import { defineTitle } from '@/composable';

    type Plan = {
        readonly name: string;
        readonly price: number;
        readonly featured?: boolean;
        readonly features: string[];
    };

    defineTitle('wallet', 'Billing');

    const cycle = ref<string | number>('monthly');

    const plans: Plan[] = [
        {name: 'Starter', price: 0, features: ['3 projects', 'Basic reports', 'Community support']},
        {name: 'Pro', price: 29, featured: true, features: ['Unlimited projects', 'Advanced reports', 'Priority support', 'Time tracking']},
        {name: 'Enterprise', price: 99, features: ['Everything in Pro', 'SSO & audit log', 'Dedicated manager', 'Custom SLAs']}
    ];

    const visuals = [
        {id: 'dots', label: 'Dot pattern'},
        {id: 'grid', label: 'Grid pattern'},
        {id: 'flicker', label: 'Flickering grid'},
        {id: 'colors', label: 'Animated colors'},
        {id: 'shine', label: 'Border shine'}
    ];

    function price(plan: Plan): string {
        if (plan.price === 0) {
            return 'Free';
        }

        return cycle.value === 'yearly' ? `€${plan.price * 10}/yr` : `€${plan.price}/mo`;
    }

    function onUpgrade(): void {
        showSnackbar({icon: 'rocket', message: 'You are already on the demo plan — everything is unlocked!'});
    }

    function onChoose(name: string): void {
        showSnackbar({icon: 'circle-info', message: `Selecting the ${name} plan is not available in this demo.`});
    }
</script>

<style scoped>
    .plan {
        position: relative;
    }

    .plan-features {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .visual {
        position: relative;
        display: flex;
        align-items: flex-end;
        height: 144px;
        padding: 12px;
        overflow: hidden;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
        background: var(--surface);
    }

    .visual-label {
        position: relative;
    }
</style>
