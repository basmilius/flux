import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxDisabled} from './components/DisplayExtended';
import {FluxFormField, FluxFormCheckbox, FluxToggle} from './components/Forms';
import {FluxFormRadioGroup, FluxFormRadio} from './components/AdvancedForms';
import {FluxItem, FluxItemContent} from './components/Composition';
import {FluxMenu} from './components/Menus';
import {FluxSegmentedControl} from './components/Navigation';
import {useContext} from 'react';
import {FluxMenuPersistentInjectionKey, useDisabled, useFormFieldInjection, useFormRadioGroupInjection, useSegmentedControlInjection} from './compatibility';

describe('component context APIs', () => {
    it('exposes the live component state through public injection hooks', () => {
        function Probe() {
            const disabled = useDisabled(false);
            const field = useFormFieldInjection();
            const radio = useFormRadioGroupInjection();
            const segment = useSegmentedControlInjection();
            const persistent = useContext(FluxMenuPersistentInjectionKey);
            return <output>{JSON.stringify({disabled, field: field?.error, radio: radio?.value, segment: segment?.value, persistent})}</output>;
        }
        render(<FluxDisabled><FluxFormField label="Choice" error="Required"><FluxFormRadioGroup value="one"><FluxSegmentedControl value="list" onValueChange={() => {}}><FluxMenu isPersistent><Probe /></FluxMenu></FluxSegmentedControl></FluxFormRadioGroup></FluxFormField></FluxDisabled>);
        expect(JSON.parse(screen.getByRole('status').textContent!)).toEqual({disabled: true, field: 'Required', radio: 'one', segment: 'list', persistent: true});
    });
    it('makes an entire item label its control without nested labels', () => {
        const onCheckedChange = vi.fn();
        const {container} = render(<FluxItem isControl><FluxItemContent>Receive updates</FluxItemContent><FluxFormCheckbox onCheckedChange={onCheckedChange} /></FluxItem>);
        const checkbox = screen.getByRole('checkbox', {name: 'Receive updates'});
        expect(container.querySelector('label label')).toBeNull();
        fireEvent.click(screen.getByText('Receive updates'));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
        expect(container.querySelector('label')).toHaveAttribute('for', checkbox.id);
    });
    it('registers switch and radio controls with their item', () => {
        const {container} = render(<><FluxItem isControl><FluxItemContent>Enabled</FluxItemContent><FluxToggle /></FluxItem><FluxFormRadioGroup value="yes"><FluxItem isControl><FluxItemContent>Yes</FluxItemContent><FluxFormRadio value="yes" /></FluxItem></FluxFormRadioGroup></>);
        expect(screen.getByRole('switch', {name: 'Enabled'})).toBeInTheDocument();
        expect(screen.getByRole('radio', {name: 'Yes'})).toBeChecked();
        expect(container.querySelector('label label')).toBeNull();
    });
});
