import { type ComponentProps, useState } from 'react';
import { FluxDisabled, FluxFlex, FluxFormField, FluxFormInput, FluxPrimaryButton, FluxSecondaryButton, FluxToggle } from '@flux-ui/react';
import { ReactPreview } from '../../../../.vitepress/react/Preview';
export default function Example() {
    const [isDisabled, setIsDisabled] = useState<Exclude<ComponentProps<typeof FluxToggle>['checked'], undefined>>(true);
    return (<><ReactPreview><FluxFlex direction={"vertical"} gap={15} style={{ "width": "100%", "maxWidth": "345px" }}><FluxToggle checked={isDisabled} onCheckedChange={setIsDisabled}>{" Disable the section below "}</FluxToggle><FluxDisabled disabled={isDisabled}><FluxFlex direction={"vertical"} gap={9}><FluxFormField label={"First name"}><FluxFormInput placeholder={"E.g. John"}></FluxFormInput></FluxFormField><FluxFormField label={"Last name"}><FluxFormInput placeholder={"E.g. Doe"}></FluxFormInput></FluxFormField><FluxFlex gap={9}><FluxSecondaryButton label={"Cancel"}></FluxSecondaryButton><FluxPrimaryButton label={"Save"}></FluxPrimaryButton></FluxFlex></FluxFlex></FluxDisabled></FluxFlex></ReactPreview></>);
}
