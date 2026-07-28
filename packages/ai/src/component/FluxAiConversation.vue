<template>
    <div :class="$style.conversation">
        <div
            ref="scroller"
            :class="$style.conversationScroller"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-atomic="false"
            :aria-label="accessibleLabel"
            tabindex="0"
            @scroll="onScroll">
            <ol
                ref="list"
                :class="$style.conversationList"
                role="list">
                <template
                    v-for="(turn, index) of turns()"
                    :key="turn.vnode.key ?? index">
                    <li
                        v-if="turn.day"
                        :class="$style.conversationDay"
                        role="presentation">
                        <span>{{ turn.day }}</span>
                    </li>

                    <FluxDynamicView :vnode="turn.vnode"/>
                </template>
            </ol>

            <div
                v-if="$slots.empty && isEmpty()"
                :class="$style.conversationEmpty">
                <slot name="empty"/>
            </div>
        </div>

        <FluxFadeTransition>
            <FluxTooltip
                v-if="!isAtBottom"
                :content="jumpLabel">
                <FluxSecondaryButton
                    :class="$style.conversationJump"
                    icon-leading="arrow-down"
                    :aria-label="jumpLabel"
                    @click="scrollToBottom"/>
            </FluxTooltip>
        </FluxFadeTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxDynamicView, FluxFadeTransition, FluxSecondaryButton, FluxTooltip } from '@flux-ui/components';
    import { flattenVNodeTree, getComponentProps, prefersReducedMotion } from '@flux-ui/internals';
    import { Comment, computed, onBeforeUnmount, onMounted, provide, ref, Text, useTemplateRef, type VNode } from 'vue';
    import { FluxAiConversationInjectionKey, useAiTranslate } from '~flux/ai/data';
    import $style from '~flux/ai/css/component/AiConversation.module.scss';

    const BOTTOM_THRESHOLD = 24;

    type ConversationTurn = {
        readonly day: string | null;
        readonly vnode: VNode;
    };

    const {
        isGrouped,
        isSticky = true,
        jumpToLatestLabel,
        label
    } = defineProps<{
        readonly isGrouped?: boolean;
        readonly isSticky?: boolean;
        readonly jumpToLatestLabel?: string;
        readonly label?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        empty(): VNode[];
    }>();

    const translate = useAiTranslate();

    const listRef = useTemplateRef<HTMLElement>('list');
    const scrollerRef = useTemplateRef<HTMLElement>('scroller');

    const isAtBottom = ref(true);

    let isFollowing = true;
    let lastScrollTop = 0;
    let renderedTurns: ConversationTurn[] = [];
    let resizeObserver: ResizeObserver | undefined;

    const accessibleLabel = computed(() => label ?? translate('flux.ai.conversation'));
    const jumpLabel = computed(() => jumpToLatestLabel ?? translate('flux.ai.jumpToLatest'));

    provide(FluxAiConversationInjectionKey, {
        scrollToBottom
    });

    onMounted(() => {
        const list = listRef.value;

        if (!list) {
            return;
        }

        if (isSticky) {
            follow();
        }

        resizeObserver = new ResizeObserver(() => {
            if (isSticky && isFollowing) {
                follow();
            }
        });

        resizeObserver.observe(list);
    });

    onBeforeUnmount(() => resizeObserver?.disconnect());

    function follow(): void {
        const scroller = scrollerRef.value;

        if (scroller) {
            scroller.scrollTop = scroller.scrollHeight;
        }
    }

    function isEmpty(): boolean {
        return renderedTurns.length === 0;
    }

    function scrollToBottom(): void {
        const scroller = scrollerRef.value;

        if (!scroller) {
            return;
        }

        isFollowing = true;

        scroller.scrollTo({
            top: scroller.scrollHeight,
            behavior: prefersReducedMotion() ? 'instant' : 'smooth'
        });
    }

    function turns(): ConversationTurn[] {
        let previousDay: string | undefined;

        renderedTurns = flattenVNodeTree(slots.default?.() ?? [])
            .filter(vnode => vnode.type !== Comment && vnode.type !== Text)
            .map(vnode => {
                const {day} = getComponentProps<{readonly day?: string}>(vnode);
                const separator = isGrouped && day && day !== previousDay ? day : null;

                previousDay = day ?? previousDay;

                return {
                    day: separator,
                    vnode
                };
            });

        return renderedTurns;
    }

    function onScroll(): void {
        const scroller = scrollerRef.value;

        if (!scroller) {
            return;
        }

        const {clientHeight, scrollHeight, scrollTop} = scroller;

        if (scrollTop < lastScrollTop - 1) {
            isFollowing = false;
        }

        lastScrollTop = scrollTop;
        isAtBottom.value = scrollHeight - scrollTop - clientHeight <= BOTTOM_THRESHOLD;

        if (isAtBottom.value) {
            isFollowing = true;
        }
    }

    defineExpose({
        scrollToBottom
    });
</script>
