import { config, mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { FluxAction } from '../..';

config.global.components['router-link'] = {
    template: `<a><slot/></a>`
};

it('Renders a basic FluxAction correctly.', async () => {
    const wrapper = mount(FluxAction, {
        props: {
            label: 'Label',
            type: 'button'
        }
    });

    expect(wrapper.props().label).toBe('Label');
    expect(wrapper.props().type).toBe('button');
    expect(wrapper.classes().join(' ')).toBe('flux-button is-medium flux-action');
});

it('Renders a FluxAction with an icon correctly.', async () => {
    const wrapper = mount(FluxAction, {
        props: {
            icon: 'flux-empty',
            label: 'Label',
            type: 'button'
        }
    });

    expect(wrapper.props().icon).toBe('flux-empty');
    expect(wrapper.props().label).toBe('Label');
    expect(wrapper.props().type).toBe('button');
    expect(wrapper.classes().join(' ')).toBe('flux-button is-medium flux-action');
    expect(wrapper.find('svg').classes().join(' ')).toBe('flux-icon flux-button-icon');
});
