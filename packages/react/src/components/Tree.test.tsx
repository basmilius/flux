import {render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {FluxTree, FluxTreeItem} from './Tree';

describe('FluxTree', () => {
    it('renders nested lists and rich labels with shared marker styles', () => {
        render(<FluxTree aria-label="Hierarchy"><FluxTreeItem label={<strong>Parent</strong>} color="success" isHighlighted>
            <FluxTreeItem label="Child" color="#123456"/>
        </FluxTreeItem></FluxTree>);
        const tree = screen.getByRole('list', {name: 'Hierarchy'});
        expect(within(tree).getAllByRole('listitem')).toHaveLength(2);
        expect(within(tree).getAllByRole('list')).toHaveLength(1);
        expect(screen.getByText('Parent').parentElement?.parentElement?.className).toContain('isHighlighted');
        const marker = screen.getByText('Child').previousElementSibling;
        expect(marker).toHaveStyle({'--tree-marker-color': '#123456'});
        expect(marker).toHaveAttribute('aria-hidden', 'true');
    });
});
