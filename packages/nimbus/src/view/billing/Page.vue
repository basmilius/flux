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
            <div class="cycle">
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
            </div>

            <FluxPaneGroup>
                <FluxPane
                    v-for="plan of plans"
                    :key="plan.name"
                    class="plan">
                    <FluxBorderBeam
                        v-if="plan.featured"
                        color-variant="ocean"/>
                    <FluxPaneBody>
                        <div class="plan-body">
                            <strong class="plan-name">{{ plan.name }}</strong>
                            <FluxFadeTransition>
                                <span
                                    :key="String(cycle)"
                                    class="plan-price">
                                    {{ price(plan) }}
                                </span>
                            </FluxFadeTransition>
                            <ul class="plan-features">
                                <li
                                    v-for="feature of plan.features"
                                    :key="feature">
                                    <FluxIcon name="circle-check"/>
                                    {{ feature }}
                                </li>
                            </ul>
                            <FluxPrimaryButton
                                is-fluid
                                :label="plan.price === 0 ? 'Current plan' : `Choose ${plan.name}`"
                                @click="onChoose(plan.name)"/>
                        </div>
                    </FluxPaneBody>
                </FluxPane>
            </FluxPaneGroup>

            <p class="fineprint">
                All paid plans include a 14-day trial.
                <FluxLink
                    href="https://flux-ui.dev"
                    label="Compare all features"
                    target="_blank"
                    type="link"/>
            </p>
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
                        <span class="visual-label">{{ visual.label }}</span>
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
    import { FluxAnimatedColors, FluxBorderBeam, FluxBorderShine, FluxDotPattern, FluxFadeTransition, FluxFlickeringGrid, FluxGrid, FluxGridColumn, FluxGridPattern, FluxIcon, FluxLink, FluxPane, FluxPaneBody, FluxPaneGroup, FluxPrimaryButton, FluxPublishButton, FluxSegmentedControl, FluxSegmentedControlItem, showSnackbar } from '@flux-ui/components';
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
    .cycle {
        display: flex;
        justify-content: center;
        margin-bottom: 18px;
    }

    .fineprint {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 18px 0 0;
        font-size: 13px;
        color: var(--gray-500);
    }

    .plan {
        position: relative;
    }

    .plan-body {
        display: flex;
        flex-flow: column;
        gap: 12px;
        align-items: flex-start;
    }

    .plan-name {
        font-size: 15px;
        color: var(--gray-500);
    }

    .plan-price {
        font-size: 27px;
        font-weight: 700;
        color: var(--foreground);
    }

    .plan-features {
        display: flex;
        flex-flow: column;
        gap: 6px;
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 13px;
        color: var(--gray-600);
    }

    .plan-features li {
        display: flex;
        align-items: center;
        gap: 9px;
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
        font-size: 13px;
        font-weight: 500;
        color: var(--foreground);
    }
</style>
