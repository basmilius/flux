import { type ComponentProps, useState } from 'react';
import { FluxFormRangeSlider } from '@flux-ui/react';
export default function Example() {
    const [ranges, setRanges] = useState<Exclude<ComponentProps<typeof FluxFormRangeSlider>['value'], undefined>>([25, 75]);
    return (<><FluxFormRangeSlider isTicksVisible value={ranges} onValueChange={setRanges}></FluxFormRangeSlider></>);
}
