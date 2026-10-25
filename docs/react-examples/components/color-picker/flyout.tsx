import { type CSSProperties, type ComponentProps, useState } from 'react';
import { FluxColorPicker, FluxFlyout, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/react';
function parseStyle(value: CSSProperties | string): CSSProperties {
    if (typeof value !== 'string') return value;
    return Object.fromEntries(
        value
            .split(';')
            .filter((part) => part.includes(':'))
            .map((part) => {
                const colon = part.indexOf(':');
                const name = part.slice(0, colon).trim();
                return [
                    name.startsWith('--')
                        ? name
                        : name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
                    part.slice(colon + 1).trim()
                ];
            })
    );
}
export default function Example() {
    const [color, setColor] = useState<[number, number, number]>([31, 75, 109]);
    return (
        <>
            <FluxFlyout
                opener={({ open }) => (
                    <>
                        <FluxSecondaryButton
                            label={'Pick color...'}
                            onClick={() => {
                                open();
                            }}
                            before={
                                <>
                                    <div
                                        style={parseStyle({
                                            background: `rgb(${color.join(' ')})`,
                                            borderRadius: '99px',
                                            width: '24px',
                                            height: '24px',
                                            position: 'relative',
                                            flexShrink: 0
                                        })}
                                    ></div>
                                </>
                            }
                        ></FluxSecondaryButton>
                    </>
                )}
                children={() => (
                    <>
                        <FluxPaneBody style={{ width: '330px' }}>
                            <FluxColorPicker
                                value={color}
                                onValueChange={(value) => {
                                    if (Array.isArray(value)) setColor(value);
                                }}
                                type={'rgb'}
                            ></FluxColorPicker>
                        </FluxPaneBody>
                    </>
                )}
            ></FluxFlyout>
        </>
    );
}
