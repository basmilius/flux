<template>
    <flux-pane>
        <flux-pane-header
            icon="book-open"
            title="Stories"/>

        <flux-stepper :model-value="step">
            <template #steps="{modelValue, steps}">
                <flux-pane-header>
                    <flux-stepper-steps
                        :amount="steps"
                        :current="modelValue + 1"/>
                </flux-pane-header>
            </template>

            <template #content="{modelValue, view}">
                <flux-pane-body>
                    <flux-breakthrough-transition>
                        <flux-dynamic-view
                            :key="modelValue"
                            :vnode="view"/>
                    </flux-breakthrough-transition>
                </flux-pane-body>
            </template>

            <flux-stepper-step>
                <h2>1. The Lost Key</h2>
                <p>In a quaint town, Emily discovered an old, mysterious key while strolling through a flea market. Intrigued, she decided to purchase it, hoping it might unlock some forgotten treasure. Little did she know, the key belonged to a hidden attic in her own ancestral home. Upon turning the key in the dusty lock, Emily unearthed a trove of family memorabilia, unlocking not just a physical space but also a rich tapestry of her family's history.</p>
            </flux-stepper-step>

            <flux-stepper-step>
                <h2>2. The Serendipitous Encounter</h2>
                <p>Underneath the flickering streetlights, Sarah and Jake's paths unexpectedly crossed during a rainstorm. Seeking shelter in the same cozy cafe, they struck up a conversation over steaming cups of coffee. As the rain poured outside, their chance encounter blossomed into a deep connection, and they found themselves sharing stories, laughter, and eventually, each other's company for many more rainy nights to come.</p>
            </flux-stepper-step>

            <flux-stepper-step>
                <h2>3. The Midnight Library</h2>
                <p>In the heart of the city, an unassuming bookstore stood, its doors magically open only at midnight. Curiosity led Mark to stumble upon this enigmatic place, and to his surprise, the books inside narrated the unwritten stories of people's lives. Each tome held the potential of a different reality. As he delved into the pages, Mark found himself living countless alternate lives, gaining wisdom and experiencing myriad possibilities, all within the confines of the mysterious Midnight Library.</p>
            </flux-stepper-step>
        </flux-stepper>

        <flux-pane-footer>
            <flux-spacer/>

            <flux-secondary-button
                :disabled="step === 0"
                label="Back"
                @click="step--"/>

            <flux-primary-button
                :disabled="step === 2"
                icon-before="circle-check"
                label="Next"
                @click="step++"/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBreakthroughTransition, FluxDynamicView, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStepper, FluxStepperStep, FluxStepperSteps } from '@fancee/flux';
    import { ref } from 'vue';

    const step = ref(0);
</script>

<style
    lang="scss"
    scoped>
    .mt {
        margin-top: 21px;
    }
</style>
