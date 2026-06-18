<template>
    <component
        :is="isControl ? 'label' : 'div'"
        :class="[$style.item, isControl && $style.isControl]"
        :for="isControl ? controlId : undefined">
        <slot/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { provide, ref, toRef } from 'vue';
    import { FluxItemControlInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/Item.module.scss';

    const {
        isControl
    } = defineProps<{
        readonly isControl?: boolean;
    }>();

    const controlId = ref<string>();

    // When the item acts as a control, the contained form control (toggle, checkbox or radio) renders
    // without its own label and registers its input id here, so the whole item becomes its label.
    provide(FluxItemControlInjectionKey, {
        isControl: toRef(() => isControl ?? false),
        register: id => {
            controlId.value = id;
        }
    });
</script>
