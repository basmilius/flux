import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {FluxProgressBar} from './Feedback';

describe('React feedback components', () => {
    it('uses the same vertical flex layout as the Vue progress bar', () => {
        render(<FluxProgressBar status="Uploading" value={0.5} />);
        const progress = screen.getByRole('progressbar');
        expect(progress.className).toMatch(/flexDirectionVertical|flex-direction-vertical/);
        expect(progress).toHaveStyle({'--gap': '6px'});
    });
});
