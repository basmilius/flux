import { type ComponentProps, useState } from 'react';
import { FluxFormSlider } from '@flux-ui/react';
export default function Example() {
    const [value, setValue] = useState<Exclude<ComponentProps<typeof FluxFormSlider>['value'], undefined>>(25);
    function customFormatter(value: number): string {
        const formatter = new Intl.NumberFormat(navigator.language, {
            currency: 'EUR',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency'
        });
        return formatter.format(value);
    }
    return (<><FluxFormSlider isTicksVisible value={value} onValueChange={setValue} min={0} max={100} step={0.5} formatter={customFormatter}></FluxFormSlider></>);
}
