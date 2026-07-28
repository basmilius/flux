<template>
    <FluxFlyout
        :label="translate('flux.ai.model')"
        :width="321">
        <template #opener="{isOpen, toggle}">
            <FluxSecondaryButton
                :disabled="disabled"
                icon-trailing="angles-up-down"
                :label="selected?.name ?? translate('flux.ai.selectModel')"
                aria-haspopup="menu"
                :aria-expanded="isOpen"
                @click="toggle()">
                <FluxBadge
                    v-if="selected?.badge"
                    :label="selected.badge"
                    size="small"
                    tabindex="-1"/>
            </FluxSecondaryButton>
        </template>

        <template #default="{close}">
            <FluxMenu>
                <button
                    v-for="model of models"
                    :key="model.id"
                    :class="$style.modelSelectOption"
                    type="button"
                    role="menuitemradio"
                    :aria-checked="model.id === modelValue"
                    :disabled="model.isDisabled"
                    @click="select(model.id, close)">
                    <slot
                        name="option"
                        v-bind="{isSelected: model.id === modelValue, model}">
                        <span :class="$style.modelSelectName">
                            {{ model.name }}
                        </span>
                        <FluxBadge
                            v-if="model.badge"
                            :class="$style.modelSelectBadge"
                            :label="model.badge"
                            size="small"
                            tabindex="-1"/>

                        <span
                            v-if="model.description"
                            :class="$style.modelSelectDescription">
                            {{ model.description }}
                        </span>
                    </slot>

                    <FluxIcon
                        v-if="model.id === modelValue"
                        :class="$style.modelSelectCheck"
                        name="check"
                        :size="16"/>
                </button>
            </FluxMenu>
        </template>
    </FluxFlyout>
</template>

<script lang="ts">
    export type FluxAiModel = {
        readonly badge?: string;
        readonly description?: string;
        readonly id: string;
        readonly isDisabled?: boolean;
        readonly name: string;
    };
</script>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxFlyout, FluxIcon, FluxMenu, FluxSecondaryButton } from '@flux-ui/components';
    import { computed, type VNode } from 'vue';
    import { useAiTranslate } from '~flux/ai/data';
    import $style from '~flux/ai/css/component/AiModelSelect.module.scss';

    const modelValue = defineModel<string>();

    const {models} = defineProps<{
        readonly disabled?: boolean;
        readonly models: readonly FluxAiModel[];
    }>();

    defineSlots<{
        option(props: {
            readonly isSelected: boolean;
            readonly model: FluxAiModel;
        }): VNode[];
    }>();

    const translate = useAiTranslate();

    const selected = computed(() => models.find(model => model.id === modelValue.value));

    function select(id: string, close: () => void): void {
        modelValue.value = id;
        close();
    }
</script>
