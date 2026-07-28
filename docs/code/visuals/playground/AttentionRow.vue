<template>
    <div :class="$style.attention">
        <FluxButtonStack>
            <FluxVisualAttention
                v-for="effect of EFFECTS"
                :key="effect"
                :effect="effect"
                :trigger="triggers[effect]">
                <FluxSecondaryButton
                    icon-leading="play"
                    :label="effect"
                    @click="++triggers[effect]"/>
            </FluxVisualAttention>
        </FluxButtonStack>

        <div :class="$style.inbox">
            <FluxVisualAttention
                effect="tada"
                :trigger="unread">
                <span :class="$style.bell">
                    <FluxIcon name="bell"/>
                    <FluxBadge
                        color="danger"
                        colored
                        :label="`${unread}`"/>
                </span>
            </FluxVisualAttention>

            <span :class="$style.inboxLabel">{{ unread }} unread notifications</span>

            <FluxSpacer/>

            <FluxSecondaryButton
                icon-leading="plus"
                label="New notification"
                @click="++unread"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxButtonStack, FluxIcon, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import { FluxVisualAttention } from '@flux-ui/visuals';
    import { reactive, ref } from 'vue';

    type AttentionEffect = 'pulse' | 'shake' | 'bounce' | 'tada';

    const EFFECTS: AttentionEffect[] = ['pulse', 'shake', 'bounce', 'tada'];

    const triggers = reactive<Record<AttentionEffect, number>>({
        bounce: 0,
        pulse: 0,
        shake: 0,
        tada: 0
    });

    const unread = ref(3);
</script>

<style
    lang="scss"
    module>
    .attention {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .inbox {
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 18px;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .bell {
        display: inline-flex;
        gap: 9px;
        align-items: center;
    }

    .inboxLabel {
        font-size: 14px;
        color: var(--foreground-secondary);
    }
</style>
