<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="prompt.icon"
            :title="prompt.title"/>

        <FluxPaneBody v-html="prompt.message"/>

        <FluxPaneBody>
            <FluxFormField :label="prompt.fieldLabel">
                <FluxFormInput
                    ref="input"
                    v-model="value"
                    :placeholder="prompt.fieldPlaceholder"
                    :type="prompt.fieldType ?? 'text'"
                    @keydown="onKeyDown"/>
            </FluxFormField>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxSecondaryButton
                :label="translate('flux.cancel')"
                @click="prompt.onCancel()"/>

            <FluxPrimaryButton
                :disabled="!hasValue"
                icon-before="circle-check"
                :label="translate('flux.ok')"
                @click="prompt.onConfirm(value)"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { computed, onMounted, ref, unref, useTemplateRef } from 'vue';
    import { useTranslate } from '@/composable/private';
    import type { FluxPromptObject } from '@/types';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    const {
        prompt
    } = defineProps<{
        readonly prompt: FluxPromptObject;
    }>();

    const inputRef = useTemplateRef('input');
    const translate = useTranslate();

    const value = ref('');

    const hasValue = computed(() => unref(value).trim().length > 0);

    onMounted(() => {
        const input = unref(inputRef);
        requestAnimationFrame(() => input?.$el.querySelector('input')?.focus());
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (!unref(hasValue) || evt.key !== 'Enter') {
            return;
        }

        prompt.onConfirm(unref(value));
    }
</script>
