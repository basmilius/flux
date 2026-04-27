# Stepper wizard

Multi-step flows — onboarding, checkout, lengthy forms — fit naturally into a [`FluxStepper`](../components/stepper). Each child of the default slot is treated as one step; the current step is controlled through `v-model` and the stepper handles the in/out animation.

## Anatomy

```vue [Wizard.vue]
<template>
    <FluxPane>
        <FluxPaneHeader title="Set up your workspace"/>

        <FluxStepper v-model="current">
            <div :key="0">
                <FluxPaneBody>
                    <FluxFormField label="Workspace name">
                        <FluxFormInput
                            v-model="form.name"
                            placeholder="E.g. Acme Inc."/>
                    </FluxFormField>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSpacer/>
                    <FluxPrimaryButton
                        label="Next"
                        :disabled="!form.name"
                        @click="next"/>
                </FluxPaneFooter>
            </div>

            <div :key="1">
                <FluxPaneBody>
                    <FluxFormField label="Invite team members">
                        <FluxFormTextArea
                            v-model="form.invites"
                            placeholder="One email per line"/>
                    </FluxFormField>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton
                        label="Back"
                        @click="back"/>
                    <FluxSpacer/>
                    <FluxPrimaryButton
                        label="Next"
                        @click="next"/>
                </FluxPaneFooter>
            </div>

            <div :key="2">
                <FluxPaneBody>
                    <p>Workspace <strong>{{ form.name }}</strong> is ready to go.</p>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton
                        label="Back"
                        @click="back"/>
                    <FluxSpacer/>
                    <FluxPrimaryButton
                        label="Finish"
                        icon-leading="circle-check"
                        @click="finish"/>
                </FluxPaneFooter>
            </div>
        </FluxStepper>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormInput, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStepper } from '@flux-ui/components';
    import { reactive, ref } from 'vue';

    const current = ref(0);

    const form = reactive({
        name: '',
        invites: ''
    });

    function back(): void {
        current.value = Math.max(0, current.value - 1);
    }

    function next(): void {
        current.value += 1;
    }

    function finish(): void {
        // ... persist the wizard result.
    }
</script>
```

## Custom step indicators

By default `FluxStepper` renders a `FluxStepperSteps` bar above the content. Override the `steps` slot to render custom indicators — for example a list of titles instead of dots:

```vue
<FluxStepper v-model="current">
    <template #steps="{activate, modelValue, steps}">
        <FluxStack
            direction="horizontal"
            :gap="9">
            <FluxSecondaryButton
                v-for="index in steps"
                :key="index - 1"
                :label="titles[index - 1]"
                :is-filled="(index - 1) === modelValue"
                @click="activate(index - 1)"/>
        </FluxStack>
    </template>

    <!-- step content -->
</FluxStepper>
```

## Validate before advancing

The stepper does not enforce validation — that's up to your `next()` handler. A common approach is to gate the "next" button with a `disabled` prop tied to a per-step validity check, then run a final validation when the user clicks "finish".

For more elaborate validation use the same approach as in the [CRUD form](./crud-form) recipe: keep an `errors` record per step and surface it through `FluxFormField`'s `error` prop.
