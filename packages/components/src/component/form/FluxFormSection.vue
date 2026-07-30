<template>
    <div
        :class="$style.formSection"
        role="group"
        :aria-labelledby="titleId">
        <component
            :is="`h${headingLevel}`"
            :id="titleId"
            :class="$style.formSectionTitle">
            {{ title }}
        </component>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useId, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        headingLevel = 3
    } = defineProps<{
        readonly headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
        readonly title: string;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const titleId = useId();
</script>
