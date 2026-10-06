<template>
    <div :class="$style.activityFeed">
        <template v-if="isGrouped">
            <div
                v-for="(group, index) of groups()"
                :key="group.entries[0].key ?? index"
                :class="$style.activityFeedGroup">
                <div
                    v-if="group.day"
                    :class="$style.activityFeedDay">
                    <span>{{ group.day }}</span>
                </div>

                <FluxTimeline role="presentation">
                    <ul
                        :class="$style.activityFeedList"
                        role="list">
                        <FluxDynamicView
                            v-for="(entry, entryIndex) of group.entries"
                            :key="entry.key ?? entryIndex"
                            :vnode="entry"/>
                    </ul>
                </FluxTimeline>
            </div>
        </template>

        <FluxTimeline
            v-else
            role="presentation">
            <ul
                :class="$style.activityFeedList"
                role="list">
                <slot/>
            </ul>
        </FluxTimeline>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree, getComponentProps } from '@flux-ui/internals';
    import { Comment, Text, type VNode } from 'vue';
    import FluxDynamicView from './FluxDynamicView.vue';
    import FluxTimeline from './FluxTimeline.vue';
    import $style from '~flux/components/css/component/ActivityFeed.module.scss';

    type ActivityFeedGroup = {
        readonly day?: string;
        readonly entries: VNode[];
    };

    defineProps<{
        readonly isGrouped?: boolean;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    function groups(): ActivityFeedGroup[] {
        const groups: ActivityFeedGroup[] = [];

        for (const vnode of flattenVNodeTree(slots.default?.() ?? [])) {
            if (vnode.type === Comment || vnode.type === Text) {
                continue;
            }

            const {day} = getComponentProps<{readonly day?: string}>(vnode);
            const previousGroup = groups.at(-1);

            if (!previousGroup || day && day !== previousGroup.day) {
                groups.push({day, entries: [vnode]});
            } else {
                previousGroup.entries.push(vnode);
            }
        }

        return groups;
    }
</script>
