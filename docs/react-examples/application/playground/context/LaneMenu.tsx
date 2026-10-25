import {
    FluxApplicationMenuContext,
    FluxMenuGroup,
    FluxMenuItem,
    useRoute,
    useRouter
} from '@flux-ui/react';
export default function Example() {
    const route = useRoute();
    const router = useRouter();
    return (
        <>
            <FluxApplicationMenuContext
                icon={'truck'}
                subtitle={'Rotterdam to Hamburg'}
                title={'Lane RTM-HAM'}
            ></FluxApplicationMenuContext>
            <FluxMenuGroup>
                <FluxMenuItem
                    iconLeading={'gauge'}
                    isActive={route?.fullPath === '/lanes/rtm-ham'}
                    label={'Performance'}
                    onClick={() => {
                        router?.navigate?.('/lanes/rtm-ham');
                    }}
                ></FluxMenuItem>
                <FluxMenuItem
                    iconLeading={'money-bill'}
                    isActive={route?.fullPath === '/lanes/rtm-ham/rates'}
                    label={'Rates'}
                    onClick={() => {
                        router?.navigate?.('/lanes/rtm-ham/rates');
                    }}
                ></FluxMenuItem>
                <FluxMenuItem iconLeading={'calendar'} label={'Departures'}></FluxMenuItem>
                <FluxMenuItem iconLeading={'file-lines'} label={'Documents'}></FluxMenuItem>
            </FluxMenuGroup>
        </>
    );
}
