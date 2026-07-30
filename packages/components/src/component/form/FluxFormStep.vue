<template>
    <div
        :class="$style.formStep"
        role="group"
        :aria-labelledby="titleId">
        <div :class="$style.formStepHeader">
            <span
                aria-hidden="true"
                :class="$style.formStepNumber"/>

            <span :class="$style.formStepHeading">
                <span
                    :id="titleId"
                    :class="$style.formStepTitle">
                    {{ title }}
                </span>

                <span
                    v-if="subtitle"
                    :class="$style.formStepSubtitle">
                    {{ subtitle }}
                </span>
            </span>

            <span
                v-if="'end' in slots"
                :class="$style.formStepEnd">
                <slot name="end"/>
            </span>
        </div>

        <div
            v-if="'default' in slots"
            :class="$style.formStepContent">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useId, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    defineProps<{
        readonly title: string;
        readonly subtitle?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        end(): VNode[];
    }>();

    const titleId = useId();
</script>
