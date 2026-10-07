import { type ComponentProps, useState } from 'react';
import { FluxActionBar, FluxFormInput, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator } from '@flux-ui/react';
export default function Example() {
    const [searchQuery, setSearchQuery] = useState<Exclude<ComponentProps<typeof FluxFormInput>['value'], undefined>>('');
    return (<><FluxActionBar primary={<><FluxPrimaryButton iconLeading={"circle-plus"} label={"Event"}></FluxPrimaryButton></>} filter={() => (<><FluxPaneBody>{" Filter contents. "}</FluxPaneBody></>)} filterOpener={({ open }) => (<><FluxSecondaryButton iconLeading={"filter"} onClick={() => { open(); }}></FluxSecondaryButton></>)} search={<><FluxFormInput value={searchQuery} onValueChange={(next) => setSearchQuery(next ?? '')} type={"search"} iconLeading={"magnifying-glass"} placeholder={"Search anything..."}></FluxFormInput></>} actionsBeforeSearch={<><FluxSecondaryButton iconLeading={"arrow-down-to-line"} label={"Download"}></FluxSecondaryButton><FluxSeparator direction={"vertical"}></FluxSeparator></>}></FluxActionBar></>);
}
