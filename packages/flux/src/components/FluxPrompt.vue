<template>
    <FluxPane>
        <FluxPaneHeader
            :icon="prompt.icon"
            :title="prompt.title"/>

        <FluxPaneBody v-html="prompt.message"/>

        <FluxPaneBody>
            <FluxFormField :label="prompt.fieldLabel">
                <FluxFormInput
                    ref="inputRef"
                    v-model="value"
                    :placeholder="prompt.fieldPlaceholder"
                    :type="prompt.fieldType ?? 'text'"/>
            </FluxFormField>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxSecondaryButton
                :label="translate('flux_cancel')"
                @click="prompt.onCancel"/>

            <FluxPrimaryButton
                :disabled="!hasValue"
                :label="translate('flux_ok')"
                @click="prompt.onConfirm(value)"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { ComponentPublicInstance } from 'vue-demi';
    import type { FluxPromptSpec } from '@/data';
    import { computed, onMounted, ref, unref } from 'vue-demi';
    import { useTranslate } from '@/composables';
    import { unrefElement } from '@/helpers';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    export interface Props {
        readonly prompt: FluxPromptSpec;
    }

    defineProps<Props>();

    const translate = useTranslate();

    const inputRef = ref<ComponentPublicInstance>();
    const value = ref('');

    const hasValue = computed(() => unref(value).trim().length > 0);

    onMounted(() => {
        const input = unrefElement(inputRef);
        requestAnimationFrame(() => input?.querySelector('input')?.focus());
    });
</script>
