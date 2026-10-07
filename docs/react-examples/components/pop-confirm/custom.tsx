import { type ComponentProps, useState } from 'react';
import { FluxFlex, FluxFormCheckbox, FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/react';
export default function Example() {
    const [isEverywhere, setIsEverywhere] = useState<Exclude<ComponentProps<typeof FluxFormCheckbox>['checked'], undefined>>(false);
    const [signedOut, setSignedOut] = useState('');
    function signOut(): void {
        setSignedOut(isEverywhere ? 'Signed out of every device.'
            : 'Signed out of this device.');
    }
    return (<><FluxFlex align={"start"} direction={"vertical"} gap={12}><FluxPopConfirm confirmLabel={"Sign out"} isDestructive label={"Sign out"} onConfirm={() => { signOut(); }} opener={({ toggle }) => (<><FluxSecondaryButton iconLeading={"arrow-right-from-bracket"} label={"Sign out"} onClick={() => { toggle(); }}></FluxSecondaryButton></>)}>{() => (<><FluxFlex direction={"vertical"} gap={9}><strong>{"Sign out of this device?"}</strong><FluxFormCheckbox checked={isEverywhere} onCheckedChange={setIsEverywhere} label={"Also sign out everywhere else"}></FluxFormCheckbox></FluxFlex></>)}</FluxPopConfirm>{signedOut ? (<span key={"branch-0"}>{signedOut}</span>) : null}</FluxFlex></>);
}
