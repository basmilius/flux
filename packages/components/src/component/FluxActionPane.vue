<template>
    <FluxPane
        :class="$style.actionPane"
        :variant="paneVariant">
        <slot name="base"/>

        <div :class="$style.actionPaneGrid">
            <FluxPaneBody :class="$style.actionPaneBody">
                <slot/>
            </FluxPaneBody>

            <FluxPaneBody
                v-if="slots.buttons"
                :class="$style.actionPaneBody">
                <FluxButtonStack direction="vertical">
                    <slot name="buttons"/>
                </FluxButtonStack>
            </FluxPaneBody>
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import FluxButtonStack from './FluxButtonStack.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import $style from '$flux/css/component/Action.module.scss';

    defineProps<{
        readonly paneVariant?: 'default' | 'flat' | 'well';
    }>();

    const slots = defineSlots<{
        default?(): any;
        buttons?(): any;
        base?(): any;
    }>();
</script>
