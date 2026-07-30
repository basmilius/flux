<template>
    <div
        :class="$style.formGrid"
        :style="{
            '--columns': resolvedColumns
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        columns = 2
    } = defineProps<{
        readonly columns?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const resolvedColumns = computed(() => Math.max(1, Math.floor(columns)));
</script>
