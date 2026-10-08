import { type ComponentProps, useState } from 'react';
import { FluxForm, FluxFormDateRangeInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    const [value, setValue] = useState<Exclude<ComponentProps<typeof FluxFormDateRangeInput>['value'], undefined>>([
        DateTime.now().startOf('month'),
        DateTime.now().endOf('month')
    ]);
    return (<><FluxPane style={{ "maxWidth": "390px" }}><FluxForm><FluxPaneBody><FluxFormField label={"Month"}><FluxFormDateRangeInput value={value} onValueChange={setValue} rangeMode={"month"}></FluxFormDateRangeInput></FluxFormField></FluxPaneBody></FluxForm></FluxPane></>);
}
