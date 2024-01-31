<template>
    <FluxPane>
        <FluxPaneHeader
            icon="book-open"
            title="Stories"/>

        <FluxStepper :model-value="step">
            <template #steps="{modelValue, steps}">
                <FluxPaneHeader>
                    <FluxStepperSteps
                        :amount="steps"
                        :current="modelValue + 1"/>
                </FluxPaneHeader>
            </template>

            <template #content="{modelValue, view}">
                <FluxPaneBody>
                    <FluxBreakthroughTransition>
                        <FluxDynamicView
                            :key="modelValue"
                            :vnode="view"/>
                    </FluxBreakthroughTransition>
                </FluxPaneBody>
            </template>

            <FluxStepperStep>
                <h2>1. The Lost Key</h2>
                <p>In a quaint town, Emily discovered an old, mysterious key while strolling through a flea market. Intrigued, she decided to purchase it, hoping it might unlock some forgotten treasure. Little did she know, the key belonged to a hidden attic in her own ancestral home. Upon turning the key in the dusty lock, Emily unearthed a trove of family memorabilia, unlocking not just a physical space but also a rich tapestry of her family's history.</p>
            </FluxStepperStep>

            <FluxStepperStep>
                <h2>2. The Serendipitous Encounter</h2>
                <p>Underneath the flickering streetlights, Sarah and Jake's paths unexpectedly crossed during a rainstorm. Seeking shelter in the same cozy cafe, they struck up a conversation over steaming cups of coffee. As the rain poured outside, their chance encounter blossomed into a deep connection, and they found themselves sharing stories, laughter, and eventually, each other's company for many more rainy nights to come.</p>
            </FluxStepperStep>

            <FluxStepperStep>
                <h2>3. The Midnight Library</h2>
                <p>In the heart of the city, an unassuming bookstore stood, its doors magically open only at midnight. Curiosity led Mark to stumble upon this enigmatic place, and to his surprise, the books inside narrated the unwritten stories of people's lives. Each tome held the potential of a different reality. As he delved into the pages, Mark found himself living countless alternate lives, gaining wisdom and experiencing myriad possibilities, all within the confines of the mysterious Midnight Library.</p>
            </FluxStepperStep>
        </FluxStepper>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxSecondaryButton
                :disabled="step === 0"
                label="Back"
                @click="step--"/>

            <FluxPrimaryButton
                :disabled="step === 2"
                icon-before="circle-check"
                label="Next"
                @click="step++"/>
        </FluxPaneFooter>
    </FluxPane>
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
