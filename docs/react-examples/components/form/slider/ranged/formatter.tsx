import { type ComponentProps, useState } from 'react';
import { FluxFormRangeSlider } from '@flux-ui/react';
export default function Example() {
    const [ranges, setRanges] = useState<Exclude<ComponentProps<typeof FluxFormRangeSlider>['value'], undefined>>([25, 75]);
    function customFormatter(value: number): string {
        const formatter = new Intl.NumberFormat(navigator.language, {
            currency: 'EUR',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency'
        });
        return formatter.format(value);
    }
    return (<><FluxFormRangeSlider isTicksVisible value={ranges} onValueChange={setRanges} min={0} max={100} step={0.5} formatter={customFormatter}></FluxFormRangeSlider></>);
}
