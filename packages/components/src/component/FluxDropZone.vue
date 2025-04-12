<template>
    <div
        :class="[
            $style.dropZone,
            isDragging && $style.isDragging,
            isDraggingOver && $style.isDraggingOver
        ]"
        :aria-disabled="disabled ? true : undefined">
        <div
            :class="$style.dropZoneContent"
            @dragleave.capture="onDragLeave"
            @dragover.capture="onDragEnter"
            @drop="onDrop">
            <svg
                ref="content"
                :class="$style.dropZoneBorder"
                role="presentation">
                <rect
                    height="100%"
                    width="100%"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :pathLength="pathLength"/>
            </svg>

            <slot v-bind="{isDragging, isDraggingOver, showPicker}"/>

            <FluxFadeTransition>
                <div
                    v-if="isLoading"
                    :class="$style.dropZoneLoader">
                    <FluxSpinner/>
                </div>
            </FluxFadeTransition>
        </div>

        <div
            v-if="slots.actions"
            :class="$style.dropZoneActions">
            <slot
                name="actions"
                v-bind="{isDragging, isDraggingOver, showPicker}"/>
        </div>

        <slot
            name="extra"
            v-bind="{isDragging, isDraggingOver, showPicker}"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { roundStep } from '@basmilius/utils';
    import { onMounted, onUnmounted, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/DropZone.module.scss';

    const emit = defineEmits<{
        select: [File];
        selectMultiple: [FileList];
    }>();

    const {
        accept,
        disabled: componentDisabled,
        isMultiple
    } = defineProps<{
        readonly accept?: string;
        readonly disabled?: boolean;
        readonly isLoading?: boolean;
        readonly isMultiple?: boolean;
    }>();

    const slots = defineSlots<{
        default?(props: {
            readonly isDragging: boolean;
            readonly isDraggingOver: boolean;

            showPicker(): void;
        }): any;

        actions?(props: {
            readonly isDragging: boolean;
            readonly isDraggingOver: boolean;

            showPicker(): void;
        }): any;

        extra?(props: {
            readonly isDragging: boolean;
            readonly isDraggingOver: boolean;

            showPicker(): void;
        }): any;
    }>();

    const contentRef = useTemplateRef('content');
    const disabled = useDisabled(toRef(() => componentDisabled));

    const isDragging = ref(false);
    const isDraggingOver = ref(false);
    const pathLength = ref(0);

    onMounted(() => {
        window.addEventListener('dragleave', onWindowDragEnd, {capture: true});
        window.addEventListener('dragover', onWindowDragStart, {capture: true});
        window.addEventListener('drop', onWindowDrop, {capture: true});
    });

    onUnmounted(() => {
        window.removeEventListener('dragleave', onWindowDragEnd);
        window.removeEventListener('dragover', onWindowDragStart);
        window.removeEventListener('drop', onWindowDrop);
    });

    function onDragEnter(evt: DragEvent): void {
        isDraggingOver.value = true;
        evt.preventDefault();
    }

    function onDragLeave(): void {
        isDraggingOver.value = false;
    }

    function onDrop(evt: DragEvent): void {
        isDragging.value = false;
        isDraggingOver.value = false;

        if (!evt.dataTransfer) {
            return;
        }

        const files = evt.dataTransfer.files;

        if (files.length === 0) {
            return;
        }

        if (isMultiple) {
            emit('selectMultiple', files);
        } else {
            emit('select', files[0]);
        }

        evt.preventDefault();
        evt.stopPropagation();
    }

    function onWindowDragEnd(): void {
        isDragging.value = false;
    }

    function onWindowDragStart(): void {
        isDragging.value = true;
    }

    function onWindowDrop(): void {
        isDragging.value = false;
        isDraggingOver.value = false;
    }

    function onFileSelected(evt: Event): void {
        const files = (evt.target as HTMLInputElement).files;

        if (!files || files.length === 0) {
            return;
        }

        if (isMultiple) {
            emit('selectMultiple', files);
        } else {
            emit('select', files[0]);
        }
    }

    function showPicker(): void {
        if (unref(disabled)) {
            return;
        }

        let input: HTMLInputElement | undefined = document.createElement('input');
        input.accept = accept ?? '*';
        input.multiple = isMultiple ?? false;
        input.type = 'file';

        input.addEventListener('change', onFileSelected, {once: true});
        input.showPicker();
    }

    watch(contentRef, content => {
        if (!content) {
            return;
        }

        const {width, height} = content.getBoundingClientRect();
        pathLength.value = roundStep(width * 2 + height * 2, 6);
    }, {immediate: true});
</script>

