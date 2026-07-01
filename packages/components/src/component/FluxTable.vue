<template>
    <div
        ref="base"
        :class="[
            $style.table,
            x > 0 && $style.isScrolledStart
        ]">
        <table
            :class="$style.tableBase"
            :aria-busy="isLoading || undefined">
            <slot name="colgroups"/>

            <thead
                v-if="slots.header"
                ref="head"
                :class="isSticky && $style.tableHeadSticky">
            <slot name="header"/>
            </thead>

            <tbody v-if="slots.default">
            <slot/>

            <FluxTableRow
                v-if="fillColumns"
                :class="$style.tableFill">
                <FluxTableCell
                    v-for="n of fillColumns"
                    :key="n"/>
            </FluxTableRow>
            </tbody>

            <tfoot
                v-if="slots.footer"
                ref="foot">
            <slot name="footer"/>
            </tfoot>

            <caption
                v-if="slots.caption"
                :style="{captionSide}">
                <slot name="caption"/>
            </caption>
        </table>

        <div
            v-if="isLoading"
            :class="$style.tableLoader"
            :style="loaderStyle">
            <FluxSpinner/>
        </div>

        <FluxPaneBody
            v-if="slots.pagination"
            :class="$style.tablePagination">
            <slot name="pagination"/>
        </FluxPaneBody>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { animationFrameDebounce, useScrollPosition } from '@flux-ui/internals';
    import { computed, provide, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { FluxTableInjectionKey } from '~flux/components/data';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import FluxTableCell from './FluxTableCell.vue';
    import FluxTableRow from './FluxTableRow.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const {
        captionSide = 'bottom',
        isHoverable = false,
        isLoading = false,
        isSticky = false
    } = defineProps<{
        readonly captionSide?: 'top' | 'bottom';
        readonly fillColumns?: number;
        readonly isHoverable?: boolean;
        readonly isLoading?: boolean;
        readonly isSticky?: boolean;
    }>();

    const slots = defineSlots<{
        default?(): VNode;
        colgroups?(): VNode;
        caption?(): VNode;
        footer?(): VNode;
        header?(): VNode;
        pagination?(): VNode;
    }>();

    const base = useTemplateRef('base');
    const headRef = useTemplateRef('head');
    const footRef = useTemplateRef('foot');
    const {x, y} = useScrollPosition(base);

    const headHeight = ref(0);
    const footHeight = ref(0);

    const loaderStyle = computed(() => ({
        transform: `translate(${x.value}px, ${y.value}px)`,
        top: `${headHeight.value}px`,
        bottom: `${footHeight.value}px`,
        borderTopLeftRadius: headHeight.value > 0 ? '0' : undefined,
        borderTopRightRadius: headHeight.value > 0 ? '0' : undefined,
        borderBottomLeftRadius: footHeight.value > 0 ? '0' : undefined,
        borderBottomRightRadius: footHeight.value > 0 ? '0' : undefined
    }));

    const measure = animationFrameDebounce(() => {
        headHeight.value = unref(headRef)?.offsetHeight ?? 0;
        footHeight.value = unref(footRef)?.offsetHeight ?? 0;
    });

    watch([headRef, footRef], ([head, foot], _, onCleanup) => {
        const observer = new ResizeObserver(measure);

        if (head) {
            observer.observe(head);
        }

        if (foot) {
            observer.observe(foot);
        }

        observer.observe(document.documentElement); // observe font-size changes.

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    provide(FluxTableInjectionKey, {
        isHoverable: toRef(() => isHoverable)
    });
</script>
