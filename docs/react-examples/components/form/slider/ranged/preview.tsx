import { type ComponentProps, useState } from 'react';
import { FluxFormRangeSlider, FluxPane, FluxPaneBody } from '@flux-ui/react';
import { ReactPreview } from '../../../../../../.vitepress/react/Preview';
export default function Example() {
    const [ranges, setRanges] = useState<Exclude<ComponentProps<typeof FluxFormRangeSlider>['value'], undefined>>([25, 75]);
    return (<><ReactPreview><FluxPane style={{ "maxWidth": "390px" }}><FluxPaneBody><FluxFormRangeSlider isTicksVisible value={ranges} onValueChange={setRanges}></FluxFormRangeSlider></FluxPaneBody></FluxPane></ReactPreview></>);
}
