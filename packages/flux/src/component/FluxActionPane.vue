<template>
    <FluxPane
        :class="styles.actionPane"
        :variant="paneVariant">
        <slot name="base"/>

        <div :class="styles.actionPaneGrid">
            <FluxPaneBody :class="styles.actionPaneBody">
                <slot/>
            </FluxPaneBody>

            <FluxPaneBody
                v-if="slots.buttons"
                :class="styles.actionPaneBody">
                <FluxButtonStack axis="vertical">
                    <slot name="buttons"/>
                </FluxButtonStack>
            </FluxPaneBody>
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import FluxButtonStack from './FluxButtonStack.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import styles from '@/css/component/Action.module.scss';

    defineProps<{
        readonly paneVariant?: 'default' | 'flat' | 'well';
    }>();

    defineSlots<{
        default(): any;
        buttons(): any;
        base(): any;
    }>();

    const slots = useSlots();
</script>
