import { useState } from 'react';
import { FluxPane, FluxPaneHeader, FluxPaneBody, FluxFormColumn, FluxFormField, FluxFormSlider, FluxFormRangeSlider, FluxFormFader, FluxColorSelect, FluxColorPicker, FluxTicks } from '@flux-ui/react';

export default function Ranges() {
    const [form, setForm] = useState({
        volume: 40,
        priceRange: [20, 80] as [number, number],
        brightness: 65,
        accent: '#4f46e5',
        color: '#4f46e5'
    });

    return (
        <FluxPane>
            <FluxPaneHeader icon={'sliders-simple'} subtitle={'Sliders, faders and colors'} title={'Ranges'}></FluxPaneHeader>
            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxFormField label={'Volume'}>
                        <FluxFormSlider
                            value={form.volume}
                            onValueChange={(next) =>
                                setForm((current) => ({
                                    ...current,
                                    ['volume']: next
                                }))
                            }
                            isTicksVisible
                        ></FluxFormSlider>
                    </FluxFormField>
                    <FluxFormField label={'Price range'}>
                        <FluxFormRangeSlider
                            value={form.priceRange}
                            onValueChange={(next) =>
                                setForm((current) => ({
                                    ...current,
                                    ['priceRange']: next
                                }))
                            }
                        ></FluxFormRangeSlider>
                    </FluxFormField>
                    <FluxFormField label={'Brightness'}>
                        <FluxFormFader
                            value={form.brightness}
                            onValueChange={(next) =>
                                setForm((current) => ({
                                    ...current,
                                    ['brightness']: next
                                }))
                            }
                            color={'warning'}
                            iconLeading={'sun'}
                            label={'Brightness'}
                        ></FluxFormFader>
                    </FluxFormField>
                    <FluxFormField label={'Accent'}>
                        <FluxColorSelect
                            value={form.accent}
                            onValueChange={(next) =>
                                setForm((current) => ({
                                    ...current,
                                    ['accent']: next
                                }))
                            }
                            isCustomAllowed
                        ></FluxColorSelect>
                    </FluxFormField>
                    <FluxFormField label={'Color picker'}>
                        <FluxColorPicker
                            value={form.color}
                            onValueChange={(next) =>
                                setForm((current) => ({
                                    ...current,
                                    ['color']: typeof next === 'string' ? next : `rgb(${next.join(' ')})`
                                }))
                            }
                            isAlphaEnabled
                            type={'hex'}
                        ></FluxColorPicker>
                    </FluxFormField>
                    <FluxFormField label={'Ticks'}>
                        <FluxTicks min={0} max={100}></FluxTicks>
                    </FluxFormField>
                </FluxFormColumn>
            </FluxPaneBody>
        </FluxPane>
    );
}
