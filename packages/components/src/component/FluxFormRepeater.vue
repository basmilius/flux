<template>
    <div
        ref="root"
        :class="$style.formRepeater">
        <div
            v-if="rows.length > 0"
            :class="$style.formRepeaterRows">
            <div
                v-for="(entry, index) of rows"
                :key="entry.key"
                :class="clsx(
                    $style.formRepeaterRow,
                    dragIndex === index && $style.isDragging,
                    grabbedKey === entry.key && $style.isGrabbed,
                    activeDropIndex === index && $style.isDropBefore,
                    activeDropIndex === rows.length && index === rows.length - 1 && $style.isDropAfter
                )"
                data-flux-repeater-row
                role="group"
                :aria-label="labelFor(index)"
                @dragover="onRowDragOver(index, $event)"
                @drop="onRowDrop">
                <button
                    v-if="isReorderable"
                    :class="$style.formRepeaterHandle"
                    data-flux-repeater-handle
                    type="button"
                    :draggable="!disabled"
                    :disabled="disabled"
                    aria-keyshortcuts="Space ArrowUp ArrowDown"
                    :aria-label="translate('flux.repeaterReorder', {label: labelFor(index)})"
                    :aria-pressed="grabbedKey === entry.key"
                    @dragstart="onDragStart(index, $event)"
                    @dragend="onDragEnd"
                    @focus="activeKey = entry.key"
                    @keydown="onHandleKeyDown(entry.key, $event)">
                    <FluxIcon name="grip-vertical"/>
                </button>

                <div :class="$style.formRepeaterRowContent">
                    <slot v-bind="{index, row: entry.row}"/>
                </div>

                <FluxSecondaryButton
                    v-if="canRemoveRow"
                    data-flux-repeater-remove
                    icon-leading="trash"
                    size="small"
                    :aria-label="translate('flux.repeaterRemoveRow', {label: labelFor(index)})"
                    @click="removeAt(index)"/>
            </div>
        </div>

        <div
            v-else-if="'empty' in slots"
            :class="$style.formRepeaterEmpty">
            <slot name="empty"/>
        </div>

        <FluxSecondaryButton
            v-if="canAddRow"
            :class="$style.formRepeaterAdd"
            data-flux-repeater-add
            icon-leading="plus"
            :label="addLabel ?? translate('flux.repeaterAdd')"
            size="small"
            :aria-label="addLabel ? undefined : translate('flux.repeaterAddRow', {label: rowNoun})"
            @click="add()"/>

        <div
            aria-live="polite"
            aria-atomic="true"
            :class="$style.formRepeaterLiveRegion">
            {{ liveMessage }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
    generic="T">
    import { getFocusableElements, useKeyboardGrab } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, nextTick, provide, ref, toRef, useTemplateRef, type VNode, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey, showConfirm } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '~flux/components/css/component/FormRepeater.module.scss';

    const emit = defineEmits<{
        add: [];
        move: [from: number, to: number];
        remove: [row: T, index: number];
    }>();

    const modelValue = defineModel<T[]>({
        default: () => []
    });

    const {
        addLabel,
        canAdd = true,
        canRemove = true,
        disabled: componentDisabled,
        isReorderable = false,
        max,
        min,
        newRow,
        rowLabel
    } = defineProps<{
        readonly addLabel?: string;
        readonly canAdd?: boolean;
        readonly canRemove?: boolean;
        readonly disabled?: boolean;
        readonly isReorderable?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly newRow?: () => T;
        readonly rowLabel?: string;
    }>();

    const slots = defineSlots<{
        default(props: {
            readonly index: number;
            readonly row: T;
        }): VNode[];

        empty?(): VNode[];
    }>();

    const root = useTemplateRef<HTMLElement>('root');

    const activeKey = ref<string | null>(null);
    const grabbedKey = ref<string | null>(null);
    const dragIndex = ref<number | null>(null);
    const dropIndex = ref<number | null>(null);
    const liveMessage = ref('');

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const keyByRow = new WeakMap<object, string>();
    const positionalKeys: string[] = [];
    let keyCounter = 0;

    const rows = computed(() => modelValue.value.map((row, index) => ({
        key: keyOf(row, index),
        row
    })));

    const rowNoun = computed(() => rowLabel ?? translate('flux.repeaterRowLabel'));
    const canAddRow = computed(() => canAdd && !disabled.value && (max === undefined || modelValue.value.length < max));
    const canRemoveRow = computed(() => canRemove && !disabled.value && modelValue.value.length > (min ?? 0));

    const activeDropIndex = computed(() => {
        const from = dragIndex.value;
        const to = dropIndex.value;

        if (from === null || to === null || to === from || to === from + 1) {
            return null;
        }

        return to;
    });

    const {handleKeyDown, release} = useKeyboardGrab<number>({
        isDraggable: computed(() => isReorderable && !disabled.value),
        itemId: activeKey,
        grabbedId: grabbedKey,
        onGrab() {
            grabbedKey.value = activeKey.value;
            announce(translate('flux.grabbedAnnounce'));

            return indexOfKey(activeKey.value);
        },
        onMove(direction) {
            if (direction === 'left' || direction === 'right') {
                return;
            }

            const from = indexOfKey(grabbedKey.value);
            const to = direction === 'up' ? from - 1 : from + 1;

            if (from === -1 || to < 0 || to >= modelValue.value.length) {
                return;
            }

            moveRow(from, to);
            announce(labelFor(to));
        },
        onCommit() {
            grabbedKey.value = null;
            announce(translate('flux.releasedAnnounce'));
        },
        onCancel(origin) {
            const from = indexOfKey(grabbedKey.value);
            grabbedKey.value = null;

            if (origin !== null && from !== -1) {
                moveRow(from, origin);
            }

            announce(translate('flux.repeaterMoveCancelled'));
        },
        announce() {
        }
    });

    watch(() => isReorderable && !disabled.value, isEnabled => {
        if (!isEnabled) {
            cancelGrab();
            dragIndex.value = null;
            dropIndex.value = null;
        }
    });

    provide(FluxDisabledInjectionKey, disabled);

    function keyOf(row: unknown, index: number): string {
        if (row !== null && typeof row === 'object') {
            let key = keyByRow.get(row as object);

            if (key === undefined) {
                key = `row-${keyCounter++}`;
                keyByRow.set(row as object, key);
            }

            return key;
        }

        positionalKeys[index] ??= `row-${keyCounter++}`;

        return positionalKeys[index];
    }

    function rowElementAt(index: number): HTMLElement | null {
        return root.value?.querySelectorAll<HTMLElement>('[data-flux-repeater-row]')[index] ?? null;
    }

    function indexOfKey(key: string | null): number {
        return key === null ? -1 : rows.value.findIndex(entry => entry.key === key);
    }

    function labelFor(index: number): string {
        return translate('flux.repeaterRow', {
            label: rowNoun.value,
            index: index + 1,
            total: modelValue.value.length
        });
    }

    function announce(message: string): void {
        liveMessage.value = '';
        requestAnimationFrame(() => {
            liveMessage.value = message;
        });
    }

    function hasContent(value: unknown): boolean {
        if (value === null || value === undefined || value === '' || value === false) {
            return false;
        }

        if (Array.isArray(value)) {
            return value.some(hasContent);
        }

        if (typeof value === 'object' && !(value instanceof Date)) {
            return Object.values(value).some(hasContent);
        }

        return true;
    }

    async function add(): Promise<void> {
        if (!canAddRow.value) {
            return;
        }

        const index = modelValue.value.length;

        if (newRow) {
            modelValue.value = [...modelValue.value, newRow()];
        }

        emit('add');

        await nextTick();

        const rowElement = rowElementAt(index);

        if (!rowElement) {
            return;
        }

        getFocusableElements(rowElement)
            .find(element => !element.matches('[data-flux-repeater-handle], [data-flux-repeater-remove]'))
            ?.focus();
    }

    async function removeAt(index: number): Promise<void> {
        if (!canRemoveRow.value) {
            return;
        }

        const key = rows.value[index]?.key ?? null;

        let position = index;

        if (hasContent(modelValue.value[position])) {
            const isConfirmed = await showConfirm({
                icon: 'trash',
                title: translate('flux.repeaterRemoveTitle', {label: labelFor(position)}),
                message: translate('flux.repeaterRemoveMessage')
            });

            position = indexOfKey(key);

            if (!isConfirmed || position === -1 || !canRemoveRow.value) {
                return;
            }
        }

        const row = modelValue.value[position];

        modelValue.value = modelValue.value.filter((_, rowIndex) => rowIndex !== position);
        positionalKeys.splice(position, 1);
        emit('remove', row, position);

        await nextTick();

        const removeButtons = root.value?.querySelectorAll<HTMLElement>('[data-flux-repeater-remove]');

        if (removeButtons && removeButtons.length > 0) {
            removeButtons[Math.min(position, removeButtons.length - 1)].focus();
            return;
        }

        root.value?.querySelector<HTMLElement>('[data-flux-repeater-add]')?.focus();
    }

    function moveRow(from: number, to: number): void {
        if (from === to) {
            return;
        }

        const next = [...modelValue.value];
        const [row] = next.splice(from, 1);
        next.splice(to, 0, row);
        modelValue.value = next;

        const movedKeys = positionalKeys.splice(from, 1);
        positionalKeys.splice(to, 0, ...movedKeys);

        emit('move', from, to);
    }

    function cancelGrab(): void {
        grabbedKey.value = null;
        release();
    }

    function onHandleKeyDown(key: string, evt: KeyboardEvent): void {
        activeKey.value = key;
        handleKeyDown(evt);
    }

    function onDragStart(index: number, evt: DragEvent): void {
        if (!isReorderable || disabled.value) {
            evt.preventDefault();
            return;
        }

        cancelGrab();

        dragIndex.value = index;
        dropIndex.value = null;

        if (!evt.dataTransfer) {
            return;
        }

        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('text/plain', String(index));

        const rowElement = rowElementAt(index);

        if (rowElement) {
            evt.dataTransfer.setDragImage(rowElement, 12, 12);
        }
    }

    function onRowDragOver(index: number, evt: DragEvent): void {
        if (dragIndex.value === null) {
            return;
        }

        evt.preventDefault();

        const rect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
        dropIndex.value = evt.clientY < rect.top + rect.height / 2 ? index : index + 1;
    }

    function onRowDrop(evt: DragEvent): void {
        evt.preventDefault();

        const from = dragIndex.value;
        const to = activeDropIndex.value;

        onDragEnd();

        if (from === null || to === null) {
            return;
        }

        moveRow(from, to > from ? to - 1 : to);
    }

    function onDragEnd(): void {
        dragIndex.value = null;
        dropIndex.value = null;
    }
</script>
