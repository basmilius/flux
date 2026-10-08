import { type ComponentProps, useState } from 'react';
import { FluxForm, FluxFormDateTimeInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    const [min, setMin] = useState(DateTime.now().startOf('day'));
    const [max, setMax] = useState(DateTime.now().plus({ days: 7 }).endOf('day'));
    const [value, setValue] = useState<Exclude<ComponentProps<typeof FluxFormDateTimeInput>['value'], undefined>>(DateTime.now());
    return (<><FluxPane style={{ "maxWidth": "390px" }}><FluxForm><FluxPaneBody><FluxFormField label={"Starts on"}><FluxFormDateTimeInput value={value} onValueChange={setValue} min={min} max={max}></FluxFormDateTimeInput></FluxFormField></FluxPaneBody></FluxForm></FluxPane></>);
}
