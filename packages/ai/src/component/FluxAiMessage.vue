<template>
    <component
        :is="tag"
        :class="clsx(
            $style.message,
            role === 'system' && $style.isSystem,
            role === 'user' && $style.isUser,
            hasMarker && $style.hasMarker,
            isStreaming && $style.isStreaming
        )"
        :aria-busy="isStreaming ? true : undefined">
        <FluxAvatar
            v-if="avatarSrc || avatarFallbackInitials"
            :class="$style.messageMarker"
            :fallback-initials="avatarFallbackInitials"
            :size="30"
            :src="avatarSrc"
            aria-hidden="true"/>

        <FluxBoxedIcon
            v-else-if="icon"
            :class="$style.messageMarker"
            :name="icon"
            rounded
            :size="30"
            aria-hidden="true"/>

        <div :class="$style.messageHeader">
            <span :class="$style.messageAuthor">{{ authorLabel }}</span>

            <time
                v-if="when"
                :class="$style.messageWhen"
                :datetime="dateTime">{{ when }}</time>
        </div>

        <div :class="$style.messageContent">
            <slot/>
        </div>

        <div
            v-if="$slots.footer"
            :class="$style.messageFooter">
            <slot name="footer"/>
        </div>

        <FluxActionStack
            v-if="$slots.actions && !isStreaming"
            :class="$style.messageActions">
            <slot name="actions"/>
        </FluxActionStack>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionStack, FluxAvatar, FluxBoxedIcon } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, type VNode } from 'vue';
    import { FluxAiConversationInjectionKey, useAiTranslate } from '~flux/ai/data';
    import $style from '~flux/ai/css/component/AiMessage.module.scss';

    const ROLE_LABEL = {
        assistant: 'flux.ai.roleAssistant',
        system: 'flux.ai.roleSystem',
        user: 'flux.ai.roleUser'
    } as const;

    const {
        author,
        avatarFallbackInitials,
        avatarSrc,
        icon,
        role
    } = defineProps<{
        /**
         * The name shown above the turn. Defaults to the configured name for the
         * role it carries.
         */
        readonly author?: string;
        readonly avatarFallbackInitials?: string;
        readonly avatarSrc?: string;
        readonly dateTime?: string;
        /**
         * The day this turn belongs to. Only read by a grouped FluxAiConversation,
         * which compares it with the turn above to place a day separator.
         */
        readonly day?: string;
        readonly icon?: FluxIconName;
        readonly isStreaming?: boolean;
        readonly role: 'assistant' | 'system' | 'user';
        readonly when?: string;
    }>();

    defineSlots<{
        actions(): VNode[];
        default(): VNode[];
        footer(): VNode[];
    }>();

    const translate = useAiTranslate();

    const conversation = inject(FluxAiConversationInjectionKey, null);

    const authorLabel = computed(() => author ?? translate(ROLE_LABEL[role]));
    const hasMarker = computed(() => !!avatarSrc || !!avatarFallbackInitials || !!icon);
    // Inside a conversation the turn is a list item; on its own it is an article.
    const tag = computed(() => conversation ? 'li' : 'article');
</script>
