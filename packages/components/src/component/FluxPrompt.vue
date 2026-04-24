<template>
    <DialogLayout
        :icon="prompt.icon"
        :message="prompt.message"
        :title="prompt.title">
        <FluxFormField :label="prompt.fieldLabel">
            <FluxFormInput
                ref="input"
                v-model="value"
                :placeholder="prompt.fieldPlaceholder"
                :type="prompt.fieldType ?? 'text'"
                @keydown="onKeyDown"/>
        </FluxFormField>

        <template #footer>
            <FluxSecondaryButton
                :label="translate('flux.cancel')"
                @click="prompt.onCancel()"/>

            <FluxPrimaryButton
                :disabled="!hasValue"
                icon-leading="circle-check"
                :label="translate('flux.ok')"
                @click="prompt.onConfirm(value)"/>
        </template>
    </DialogLayout>
</template>

<script
    lang="ts"
    setup>
    import type { FluxPromptObject } from '@flux-ui/types';
    import { computed, onMounted, ref, unref, useTemplateRef } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import { DialogLayout } from './primitive';

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
