import { type ComponentProps, useState } from 'react';
import { FluxForm, FluxFormDateRangeInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    const [value, setValue] = useState<Exclude<ComponentProps<typeof FluxFormDateRangeInput>['value'], undefined>>([
        DateTime.now().startOf('week'),
        DateTime.now().endOf('week')
    ]);
    return (<><FluxPane style={{ "maxWidth": "390px" }}><FluxForm><FluxPaneBody><FluxFormField label={"Week"}><FluxFormDateRangeInput value={value} onValueChange={setValue} rangeMode={"week"}></FluxFormDateRangeInput></FluxFormField></FluxPaneBody></FluxForm></FluxPane></>);
}
