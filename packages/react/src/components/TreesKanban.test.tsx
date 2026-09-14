import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
    FluxFormTimeZonePicker,
    FluxFormTreeViewSelect,
    FluxKanban,
    FluxKanbanColumn,
    FluxKanbanItem,
    FluxKanbanSwimlane,
    FluxTreeView
} from './TreesKanban';

const tree = [
    { id: 'projects', label: 'Projects', children: [{ id: 'flux', label: 'Flux' }] },
    { id: 'archive', label: 'Archive', disabled: true }
];

describe('tree controls', () => {
    it('matches Vue\'s default collapsed and unhighlighted tree presentation', () => {
        render(<FluxTreeView options={tree} />);
        expect(screen.queryByText('Flux')).not.toBeInTheDocument();
        expect(screen.getByRole('tree')).not.toHaveAttribute('aria-activedescendant');
        expect(screen.getByRole('treeitem', { name: /Projects/ })).toHaveAttribute('aria-selected', 'false');
    });

    it('renders the connector structure used by the shared tree styles', () => {
        render(<FluxTreeView options={tree} expandedDepth={2} />);
        const child = screen.getByText('Flux').closest('[role="treeitem"]')!;
        expect(child.firstElementChild).toHaveStyle({ '--tree-marker-column': '1' });
        expect(child.firstElementChild?.children).toHaveLength(2);
    });

    it('expands and selects nodes with pointer and keyboard controls', () => {
        const onClick = vi.fn();
        render(<FluxTreeView options={tree} expandedDepth={0} onClick={onClick} />);
        expect(screen.queryByText('Flux')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Expand' }));
        expect(screen.getByText('Flux')).toBeInTheDocument();
        fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
        fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
        fireEvent.keyDown(screen.getByRole('tree'), { key: 'Enter' });
        expect(onClick).toHaveBeenCalledWith({ id: 'flux', label: 'Flux' });
    });

    it('searches and changes hierarchical selections', () => {
        const onValueChange = vi.fn();
        render(<FluxFormTreeViewSelect options={tree} value={null} isSearchable onValueChange={onValueChange} placeholder="Choose" />);
        fireEvent.click(screen.getByRole('combobox'));
        fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'Flux' } });
        fireEvent.click(screen.getByRole('option', { name: /Flux/ }));
        expect(onValueChange).toHaveBeenCalledWith('flux');
    });

    it('opens and selects a tree option from the keyboard', () => {
        const onValueChange = vi.fn();
        render(<FluxFormTreeViewSelect options={tree} value={null} onValueChange={onValueChange} placeholder="Choose" />);
        const combobox = screen.getByRole('combobox');
        fireEvent.keyDown(combobox, {key: 'ArrowDown'});
        expect(combobox).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(combobox, {key: 'Enter'});
        expect(onValueChange).toHaveBeenCalledWith('projects');
    });

    it('re-seeds expansion when asynchronous options or depth change', () => {
        const {rerender} = render(<FluxTreeView options={[]} expandedDepth={1} />);
        rerender(<FluxTreeView options={tree} expandedDepth={2} />);
        expect(screen.getByText('Flux')).toBeInTheDocument();
        rerender(<FluxTreeView options={[{id: 'other', label: 'Other', children: [{id: 'child', label: 'Child'}]}]} expandedDepth={2} />);
        expect(screen.queryByText('Flux')).not.toBeInTheDocument();
        expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('provides a searchable IANA time-zone select', () => {
        render(<FluxFormTimeZonePicker value={null} onValueChange={() => undefined} aria-label="Time zone" placeholder="Select zone" />);
        expect(screen.getByRole('combobox', { name: 'Time zone' })).toBeInTheDocument();
        expect(screen.getByRole('searchbox', { name: 'Time zone search' })).toBeInTheDocument();
    });
});

describe('Kanban', () => {
    it('moves a keyboard-grabbed card across columns while preserving numeric ids', () => {
        const onMove = vi.fn();
        render(
            <FluxKanban onMove={onMove}>
                <FluxKanbanColumn columnId={1} label="Todo"><FluxKanbanItem columnId={1} itemId="task">Task</FluxKanbanItem></FluxKanbanColumn>
                <FluxKanbanColumn columnId={2} label="Done" />
            </FluxKanban>
        );
        const item = screen.getByRole('listitem');
        fireEvent.keyDown(item, { key: ' ' });
        fireEvent.keyDown(item, { key: 'ArrowRight' });
        expect(onMove).toHaveBeenCalledWith(expect.objectContaining({ itemId: 'task', fromColumnId: 1, toColumnId: 2 }));
    });

    it('reorders columns from the keyboard', () => {
        const onMoveColumn = vi.fn();
        render(
            <FluxKanban reorderableColumns onMoveColumn={onMoveColumn}>
                <FluxKanbanColumn columnId="todo" label="Todo" />
                <FluxKanbanColumn columnId="done" label="Done" />
            </FluxKanban>
        );
        fireEvent.keyDown(screen.getAllByText('Todo')[0].closest('header')!, { key: 'ArrowRight' });
        expect(onMoveColumn).toHaveBeenCalledWith({ columnId: 'todo', beforeColumnId: undefined });
    });

    it('encodes vertical card destinations with typed before-item ids', () => {
        const onMove = vi.fn();
        render(
            <FluxKanban onMove={onMove}>
                <FluxKanbanColumn columnId={1} label="Todo">
                    <FluxKanbanItem columnId={1} itemId={1}>First</FluxKanbanItem>
                    <FluxKanbanItem columnId={1} itemId={2}>Second</FluxKanbanItem>
                    <FluxKanbanItem columnId={1} itemId={3}>Third</FluxKanbanItem>
                    <FluxKanbanItem columnId={1} itemId={4}>Fourth</FluxKanbanItem>
                </FluxKanbanColumn>
            </FluxKanban>
        );
        const item = screen.getAllByRole('listitem')[1];
        fireEvent.keyDown(item, {key: ' '});
        fireEvent.keyDown(item, {key: 'ArrowUp'});
        expect(onMove).toHaveBeenLastCalledWith(expect.objectContaining({itemId: 2, beforeItemId: 1}));
        fireEvent.keyDown(item, {key: 'ArrowDown'});
        expect(onMove).toHaveBeenLastCalledWith(expect.objectContaining({itemId: 2, beforeItemId: 4}));
    });

    it('collapses swimlanes', () => {
        render(
            <FluxKanban>
                <FluxKanbanSwimlane swimlaneId="team" label="Team" count={1}>
                    <FluxKanbanColumn columnId="todo" label="Todo" />
                </FluxKanbanSwimlane>
            </FluxKanban>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Collapse group' }));
        expect(screen.queryByRole('list', { name: 'Todo' })).not.toBeInTheDocument();
    });
});
