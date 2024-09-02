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
    import type { ComponentPublicInstance } from 'vue';
    import { computed, onMounted, ref, unref } from 'vue';
    import { useTranslate } from '@/composable/private';
    import type { FluxPromptSpec } from '@/data';
    import { unrefElement } from '@/util';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPaneHeader from './FluxPaneHeader.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    export type Props = {
        readonly prompt: FluxPromptSpec;
    };

    const props = defineProps<Props>();

    const translate = useTranslate();

    const inputRef = ref<ComponentPublicInstance>();
    const value = ref('');

    const hasValue = computed(() => unref(value).trim().length > 0);

    onMounted(() => {
        const input = unrefElement(inputRef);
        requestAnimationFrame(() => input?.querySelector('input')?.focus());
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (!unref(hasValue) || evt.key !== 'Enter') {
            return;
        }

        props.prompt.onConfirm(unref(value));
    }
</script>
