import { type ComponentProps, useState } from 'react';
import { FluxDisabled, FluxFlex, FluxFormField, FluxFormInput, FluxPrimaryButton, FluxSecondaryButton, FluxToggle } from '@flux-ui/react';
export default function Example() {
    const [isDisabled, setIsDisabled] = useState<Exclude<ComponentProps<typeof FluxToggle>['checked'], undefined>>(false);
    return (<><FluxFlex direction={"vertical"} gap={9}><FluxToggle checked={isDisabled} onCheckedChange={setIsDisabled}>{" Disable everything below "}</FluxToggle><FluxDisabled disabled={isDisabled}><FluxFormField label={"First name"}><FluxFormInput placeholder={"E.g. John"}></FluxFormInput></FluxFormField><FluxFormField label={"Last name"}><FluxFormInput placeholder={"E.g. Doe"}></FluxFormInput></FluxFormField><FluxFlex gap={9}><FluxSecondaryButton label={"Cancel"}></FluxSecondaryButton><FluxPrimaryButton label={"Save"}></FluxPrimaryButton></FluxFlex></FluxDisabled></FluxFlex></>);
}
