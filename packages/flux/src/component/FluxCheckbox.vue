<template>
    <label
        class="form-checkbox"
        :for="id">
        <input
            v-model="localValue"
            ref="inputRef"
            type="checkbox"
            class="form-checkbox-native"
            :id="id"/>

        <span class="form-checkbox-element">
            <FluxIcon
                v-if="isIndeterminate"
                :size="16"
                variant="minus"/>

            <FluxIcon
                v-else
                :size="16"
                variant="check"/>
        </span>

        <span
            v-if="label"
            class="form-checkbox-label">
            {{ label }}
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import { computed, onMounted, Ref, ref, toRefs, unref, watch } from 'vue';
    import { useFormFieldInjection } from '@/composable';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'update:model-value', value: boolean): void;
    }

    export interface Props {
        readonly label?: string;
        readonly modelValue: boolean | null;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {modelValue} = toRefs(props);

    const {id} = useFormFieldInjection();

    const inputRef = ref<HTMLInputElement>();
    const localValue: Ref<boolean | null> = ref(unref(modelValue));

    const isIndeterminate = computed(() => unref(localValue) === null);

    onMounted(() => {
        checkIndeterminateState();
    });

    function checkIndeterminateState(): void {
        inputRef.value!.indeterminate = unref(isIndeterminate);
    }

    watch(localValue, localValue => {
        if (localValue === null) {
            return;
        }

        emit('update:model-value', localValue);
    });

    watch(modelValue, modelValue => {
        checkIndeterminateState();
        localValue.value = modelValue;
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .form-checkbox {
        display: inline-flex;
        flex-shrink: 0;
        gap: 12px;
        outline: 0;

        &-element,
        &-native {
            margin: 1px 0;
            height: 22px;
            width: 22px;
        }

        &-native {
            position: absolute;
            opacity: 0;
        }

        &-element {
            position: relative;
            display: inline-flex;
            height: 22px;
            width: 22px;
            align-items: center;
            justify-content: center;
            background: rgb(var(--gray-5) / .75);
            border-radius: calc(var(--radius) / 2);
            color: rgb(var(--primary-0));
            pointer-events: none;
            transition: 210ms var(--swift-out);
            transition-property: background, color, flux.focus-ring-transition-properties();

            @include flux.focus-outline;

            .flux-icon {
                opacity: 0;
                scale: .9;
                transition: inherit;
                transition-property: opacity;

                path {
                    stroke: white;
                    stroke-width: 54px;
                }
            }
        }

        &-label {
            align-self: center;
        }

        &-native:hover + &-element {
            background: rgb(var(--gray-5));
        }

        &-native:is(:checked, :indeterminate) + &-element {
            background: rgb(var(--primary-7));

            .flux-icon {
                opacity: 1;
            }
        }

        &-native:focus-visible + &-element {
            @include flux.focus-outline-visible(2px);
        }
    }
</style>