<template>
    <header :class="$style.applicationPageHeader">
        <div :class="$style.applicationPageHeaderMain">
            <div :class="$style.applicationPageHeaderTitle">
                <h1>
                    <slot name="title">{{ title }}</slot>
                </h1>

                <p
                    v-if="description"
                    :class="$style.applicationPageHeaderDescription">
                    {{ description }}
                </p>
            </div>

            <div
                v-if="slots.actions"
                :class="$style.applicationPageHeaderActions">
                <slot name="actions"/>
            </div>
        </div>

        <slot/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/application/css/component/ApplicationPageHeader.module.scss';

    defineProps<{
        readonly description?: string;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        actions?(): VNode[];
        default?(): VNode[];
        title?(): VNode[];
    }>();
</script>
