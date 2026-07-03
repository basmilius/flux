<template>
    <div
        :class="[
            $style.dropZone,
            isDragging && $style.isDragging,
            isDraggingOver && $style.isDraggingOver
        ]"
        role="button"
        :aria-disabled="disabled ? true : undefined"
        :aria-label="ariaLabel ?? translate('flux.dropFilesOrClick')"
        :tabindex="disabled ? -1 : 0"
        @click="onClick"
        @keydown.self="onKeyDown">
        <div
            :class="$style.dropZoneContent"
            @dragenter.capture="onDragEnter"
            @dragleave.capture="onDragLeave"
            @dragover.capture="onDragOver"
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
    import { onMounted, onUnmounted, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/DropZone.module.scss';

    const emit = defineEmits<{
        reject: [File[]];
        select: [File];
        selectMultiple: [FileList];
    }>();

    const {
        accept,
        ariaLabel,
        disabled: componentDisabled,
        isMultiple
    } = defineProps<{
        readonly accept?: string;
        readonly ariaLabel?: string;
        readonly disabled?: boolean;
        readonly isLoading?: boolean;
        readonly isMultiple?: boolean;
    }>();

    const slots = defineSlots<{
        default?(props: {
            readonly isDragging: boolean;
            readonly isDraggingOver: boolean;

            showPicker(): void;
        }): VNode[];

        actions?(props: {
            readonly isDragging: boolean;
            readonly isDraggingOver: boolean;

            showPicker(): void;
        }): VNode[];

        extra?(props: {
            readonly isDragging: boolean;
            readonly isDraggingOver: boolean;

            showPicker(): void;
        }): VNode[];
    }>();

    const contentRef = useTemplateRef('content');
    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const isDragging = ref(false);
    const isDraggingOver = ref(false);
    const pathLength = ref(0);

    let dragDepth = 0;

    onMounted(() => {
        window.addEventListener('dragleave', onWindowDragEnd, {capture: true});
        window.addEventListener('dragover', onWindowDragStart, {capture: true});
        window.addEventListener('drop', onWindowDrop, {capture: true});
    });

    onUnmounted(() => {
        window.removeEventListener('dragleave', onWindowDragEnd, {capture: true});
        window.removeEventListener('dragover', onWindowDragStart, {capture: true});
        window.removeEventListener('drop', onWindowDrop, {capture: true});
    });

    // The zone is announced as a button, so a plain click should open the picker just like
    // Enter/Space does. Clicks on interactive slot content (e.g. action buttons that call
    // showPicker themselves) are left alone.
    function onClick(evt: MouseEvent): void {
        const interactive = evt.target instanceof Element
            ? evt.target.closest('a, button, input, select, textarea, [role="button"]')
            : null;

        if (interactive && interactive !== evt.currentTarget) {
            return;
        }

        showPicker();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'Enter' || evt.key === ' ') {
            showPicker();
            evt.preventDefault();
        }
    }

    function onDragEnter(evt: DragEvent): void {
        if (unref(disabled)) {
            return;
        }

        // Count enter/leave pairs so dragging across child element boundaries
        // doesn't toggle the over-state (which would make the border flicker).
        ++dragDepth;
        isDraggingOver.value = true;
        evt.preventDefault();
    }

    function onDragOver(evt: DragEvent): void {
        if (unref(disabled)) {
            return;
        }

        evt.preventDefault();
    }

    function onDragLeave(): void {
        // Each dragenter on a child increments the depth; only when every
        // matching leave has fired (depth back to zero) do we leave the zone.
        dragDepth = Math.max(0, dragDepth - 1);

        if (dragDepth === 0) {
            isDraggingOver.value = false;
        }
    }

    function onDrop(evt: DragEvent): void {
        dragDepth = 0;
        isDragging.value = false;
        isDraggingOver.value = false;

        if (unref(disabled) || !evt.dataTransfer) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();

        emitFiles(evt.dataTransfer.files);
    }

    function onWindowDragEnd(): void {
        dragDepth = 0;
        isDragging.value = false;
        isDraggingOver.value = false;
    }

    function onWindowDragStart(): void {
        isDragging.value = true;
    }

    function onWindowDrop(): void {
        dragDepth = 0;
        isDragging.value = false;
        isDraggingOver.value = false;
    }

    function onFileSelected(evt: Event): void {
        emitFiles((evt.target as HTMLInputElement).files);
    }

    function matchesAccept(file: File): boolean {
        if (!accept) {
            return true;
        }

        const patterns = accept.split(',').map(pattern => pattern.trim().toLowerCase()).filter(Boolean);

        if (patterns.length === 0) {
            return true;
        }

        const name = file.name.toLowerCase();
        const type = file.type.toLowerCase();

        return patterns.some(pattern => {
            if (pattern.startsWith('.')) {
                return name.endsWith(pattern);
            }

            if (pattern.endsWith('/*')) {
                return type.startsWith(`${pattern.slice(0, -1)}`);
            }

            return type === pattern;
        });
    }

    function emitFiles(fileList: FileList | null): void {
        if (!fileList || fileList.length === 0) {
            return;
        }

        const all = Array.from(fileList);
        const accepted = all.filter(matchesAccept);
        const rejected = all.filter(file => !accepted.includes(file));

        // Surface files that don't match `accept`, or extras that were dropped
        // when only a single file is allowed, so the consumer can give feedback.
        const extras = isMultiple ? [] : accepted.slice(1);
        const allRejected = [...rejected, ...extras];

        if (allRejected.length > 0) {
            emit('reject', allRejected);
        }

        if (accepted.length === 0) {
            return;
        }

        if (isMultiple) {
            const dataTransfer = new DataTransfer();
            accepted.forEach(file => dataTransfer.items.add(file));
            emit('selectMultiple', dataTransfer.files);
        } else {
            emit('select', accepted[0]);
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
