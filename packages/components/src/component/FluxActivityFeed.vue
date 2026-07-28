<template>
    <FluxTimeline role="presentation">
        <ul
            :class="$style.activityFeedList"
            role="list">
            <template v-if="isGrouped">
                <template
                    v-for="(entry, index) of entries()"
                    :key="entry.vnode.key ?? index">
                    <li
                        v-if="entry.day"
                        :class="$style.activityFeedDay"
                        role="presentation">
                        <span>{{ entry.day }}</span>
                    </li>

                    <FluxDynamicView :vnode="entry.vnode"/>
                </template>
            </template>

            <slot v-else/>
        </ul>
    </FluxTimeline>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentProps } from '@flux-ui/internals';
    import { Comment, Text, type VNode } from 'vue';
    import FluxDynamicView from './FluxDynamicView.vue';
    import FluxTimeline from './FluxTimeline.vue';
    import $style from '~flux/components/css/component/ActivityFeed.module.scss';

    type ActivityFeedEntry = {
        readonly day: string | null;
        readonly vnode: VNode;
    };

    defineProps<{
        readonly isGrouped?: boolean;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    function entries(): ActivityFeedEntry[] {
        let previousDay: string | undefined;

        return flattenVNodeTree(slots.default?.() ?? [])
            .filter(vnode => vnode.type !== Comment && vnode.type !== Text)
            .map(vnode => {
                const {day} = getComponentProps<{readonly day?: string}>(vnode);
                const separator = day && day !== previousDay ? day : null;

                previousDay = day ?? previousDay;

                return {
                    day: separator,
                    vnode
                };
            });
    }
</script>
