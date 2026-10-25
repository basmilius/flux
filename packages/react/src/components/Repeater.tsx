import {clsx} from 'clsx';
import {useEffect, useLayoutEffect, useRef, useState, type DragEvent, type HTMLAttributes, type KeyboardEvent, type ReactNode} from 'react';
import {useFluxTranslate} from '../i18n';
import {FluxSecondaryButton} from './Actions';
import {FluxDisabled, useFluxDisabled} from './DisplayExtended';
import {FluxIcon} from './Icon';
import {showConfirm} from './Notifications';
import styles from '../../../components/src/css/component/FormRepeater.module.scss';

export interface FluxFormRepeaterProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange'> {
    addLabel?: string;
    canAdd?: boolean;
    canRemove?: boolean;
    children: (state: {index: number; row: T}) => ReactNode;
    defaultValue?: T[];
    disabled?: boolean;
    empty?: ReactNode;
    isReorderable?: boolean;
    max?: number;
    min?: number;
    newRow?: () => T;
    onAdd?: () => void;
    onMove?: (from: number, to: number) => void;
    onRemove?: (row: T, index: number) => void;
    onValueChange?: (value: T[]) => void;
    rowLabel?: string;
    value?: T[];
}
export function FluxFormRepeater<T>({addLabel, canAdd = true, canRemove = true, children, className, defaultValue = [], disabled, empty, isReorderable = false, max, min = 0, newRow, onAdd, onMove, onRemove, onValueChange, rowLabel, value, ...props}: FluxFormRepeaterProps<T>) {
    const translate = useFluxTranslate();
    const scopedDisabled = useFluxDisabled(disabled);
    const [inner, setInner] = useState(defaultValue);
    const rows = value ?? inner;
    const rowsRef = useRef(rows);
    rowsRef.current = rows;
    const root = useRef<HTMLDivElement>(null);
    const keys = useRef(new WeakMap<object, string>());
    const previous = useRef<Array<{row: T; key: string}>>([]);
    const positionalKeys = useRef<string[]>([]);
    const counter = useRef(0);
    const [grabbed, setGrabbed] = useState<string | null>(null);
    const origin = useRef<number | null>(null);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dropIndex, setDropIndex] = useState<number | null>(null);
    const [live, setLive] = useState('');
    const announceFrame = useRef(0);
    const pendingFocus = useRef<(() => void) | undefined>(undefined);
    const noun = rowLabel ?? translate('flux.repeaterRowLabel');
    const canAddRow = canAdd && !scopedDisabled && (max === undefined || rows.length < max);
    const canRemoveRow = canRemove && !scopedDisabled && rows.length > min;
    const removable = useRef(canRemoveRow);
    removable.current = canRemoveRow;
    const activeDropIndex = dragIndex === null || dropIndex === null || dropIndex === dragIndex || dropIndex === dragIndex + 1 ? null : dropIndex;
    function keyOf(row: T, index: number) {
        if (row !== null && typeof row === 'object') {
            if (!keys.current.has(row)) {
                const replaced = previous.current[index];
                // React forms replace edited row objects; keep their mounted inputs and focus.
                const key = replaced && !rows.includes(replaced.row) ? replaced.key : `row-${counter.current++}`;
                keys.current.set(row, key);
            }
            return keys.current.get(row)!;
        }
        positionalKeys.current[index] ??= `row-${counter.current++}`;
        return positionalKeys.current[index];
    }
    function indexOfKey(key: string | null) {return rowsRef.current.findIndex((row, index) => keyOf(row, index) === key);}
    function labelFor(index: number) {return translate('flux.repeaterRow', {label: noun, index: index + 1, total: rowsRef.current.length});}
    function update(next: T[]) {
        rowsRef.current = next;
        if (value === undefined) setInner(next);
        onValueChange?.(next);
    }
    function announce(message: string) {
        cancelAnimationFrame(announceFrame.current);
        setLive('');
        announceFrame.current = requestAnimationFrame(() => setLive(message));
    }
    function rowElement(index: number) {return root.current?.querySelectorAll<HTMLElement>('[data-flux-repeater-row]')[index];}
    function move(from: number, to: number) {
        const current = rowsRef.current;
        if (from < 0 || to < 0 || to >= current.length || from === to) return;
        const next = [...current];
        const [row] = next.splice(from, 1);
        next.splice(to, 0, row);
        const movedKeys = positionalKeys.current.splice(from, 1);
        positionalKeys.current.splice(to, 0, ...movedKeys);
        update(next);
        onMove?.(from, to);
    }
    function add() {
        if (!canAddRow) return;
        const index = rows.length;
        pendingFocus.current = () => rowElement(index)?.querySelector<HTMLElement>('input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]):not([data-flux-repeater-handle]):not([data-flux-repeater-remove]),a[href],[tabindex="0"]')?.focus();
        if (newRow) update([...rows, newRow()]);
        onAdd?.();
    }
    async function remove(index: number) {
        if (!canRemoveRow) return;
        const key = keyOf(rows[index], index);
        if (hasContent(rows[index])) {
            const confirmed = await showConfirm({icon: 'trash', title: translate('flux.repeaterRemoveTitle', {label: labelFor(index)}), message: translate('flux.repeaterRemoveMessage')});
            index = indexOfKey(key);
            if (!confirmed || index < 0 || !removable.current) return;
        }
        const current = rowsRef.current;
        const row = current[index];
        positionalKeys.current.splice(index, 1);
        pendingFocus.current = () => {
            const buttons = root.current?.querySelectorAll<HTMLElement>('[data-flux-repeater-remove]');
            if (buttons?.length) buttons[Math.min(index, buttons.length - 1)].focus();
            else root.current?.querySelector<HTMLElement>('[data-flux-repeater-add]')?.focus();
        };
        update(current.filter((_, i) => i !== index));
        onRemove?.(row, index);
    }
    function release() {setGrabbed(null); origin.current = null;}
    function keyboard(key: string, event: KeyboardEvent<HTMLButtonElement>) {
        if (!isReorderable || scopedDisabled) return;
        const index = indexOfKey(key);
        if (grabbed !== key) {
            if (event.key !== ' ' && event.key !== 'Enter') return;
            event.preventDefault();
            origin.current = index;
            setGrabbed(key);
            announce(translate('flux.grabbedAnnounce'));
        } else if (event.key === 'Escape') {
            event.preventDefault();
            if (origin.current !== null) move(index, origin.current);
            release();
            announce(translate('flux.repeaterMoveCancelled'));
        } else if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            release();
            announce(translate('flux.releasedAnnounce'));
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            const to = index + (event.key === 'ArrowUp' ? -1 : 1);
            if (to >= 0 && to < rows.length) {move(index, to); announce(labelFor(to));}
        } else if (event.key === 'Tab') release();
    }
    function dragStart(index: number, event: DragEvent<HTMLButtonElement>) {
        if (!isReorderable || scopedDisabled) {event.preventDefault(); return;}
        release();
        setDragIndex(index);
        setDropIndex(null);
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', String(index));
            const element = rowElement(index);
            if (element) event.dataTransfer.setDragImage(element, 12, 12);
        }
    }
    function dragEnd() {setDragIndex(null); setDropIndex(null);}
    useEffect(() => {
        if (!isReorderable || scopedDisabled) {release(); dragEnd();}
    }, [isReorderable, scopedDisabled]);
    useLayoutEffect(() => {const focus = pendingFocus.current; pendingFocus.current = undefined; focus?.();}, [rows]);
    useEffect(() => () => cancelAnimationFrame(announceFrame.current), []);
    const entries = rows.map((row, index) => ({row, key: keyOf(row, index)}));
    previous.current = entries;
    return <FluxDisabled disabled={scopedDisabled}><div {...props} ref={root} className={clsx(styles.formRepeater, className)}>
        {rows.length > 0 ? <div className={styles.formRepeaterRows}>{entries.map(({row, key}, index) => {
            return <div key={key} className={clsx(styles.formRepeaterRow, dragIndex === index && styles.isDragging, grabbed === key && styles.isGrabbed, activeDropIndex === index && styles.isDropBefore, activeDropIndex === rows.length && index === rows.length - 1 && styles.isDropAfter)} data-flux-repeater-row role="group" aria-label={labelFor(index)} onDragOver={event => {
                if (dragIndex === null) return;
                event.preventDefault();
                const box = event.currentTarget.getBoundingClientRect();
                setDropIndex(event.clientY < box.top + box.height / 2 ? index : index + 1);
            }} onDrop={event => {
                event.preventDefault();
                if (dragIndex !== null && activeDropIndex !== null) move(dragIndex, activeDropIndex > dragIndex ? activeDropIndex - 1 : activeDropIndex);
                dragEnd();
            }}>
                {isReorderable && <button className={styles.formRepeaterHandle} data-flux-repeater-handle type="button" draggable={!scopedDisabled} disabled={scopedDisabled} aria-keyshortcuts="Space ArrowUp ArrowDown" aria-label={translate('flux.repeaterReorder', {label: labelFor(index)})} aria-pressed={grabbed === key} onDragStart={event => dragStart(index, event)} onDragEnd={dragEnd} onKeyDown={event => keyboard(key, event)}><FluxIcon name="grip-vertical" /></button>}
                <div className={styles.formRepeaterRowContent}>{children({index, row})}</div>
                {canRemoveRow && <FluxSecondaryButton data-flux-repeater-remove iconLeading="trash" size="small" aria-label={translate('flux.repeaterRemoveRow', {label: labelFor(index)})} onClick={() => void remove(index)} />}
            </div>;
        })}</div> : empty && <div className={styles.formRepeaterEmpty}>{empty}</div>}
        {canAddRow && <FluxSecondaryButton className={styles.formRepeaterAdd} data-flux-repeater-add iconLeading="plus" label={addLabel ?? translate('flux.repeaterAdd')} size="small" aria-label={addLabel ? undefined : translate('flux.repeaterAddRow', {label: noun})} onClick={add} />}
        <div aria-live="polite" aria-atomic="true" className={styles.formRepeaterLiveRegion}>{live}</div>
    </div></FluxDisabled>;
}
function hasContent(value: unknown): boolean {
    if (value == null || value === '' || value === false) return false;
    if (Array.isArray(value)) return value.some(hasContent);
    if (typeof value === 'object' && !(value instanceof Date)) return Object.values(value).some(hasContent);
    return true;
}
