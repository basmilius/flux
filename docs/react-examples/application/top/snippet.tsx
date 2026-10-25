import { FluxApplicationTop, FluxPrimaryButton, FluxTabBarItem } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <FluxApplicationTop
                icon={'house'}
                title={'Dashboard'}
                end={
                    <>
                        <FluxPrimaryButton iconLeading={'plus'} label={'New'}></FluxPrimaryButton>
                    </>
                }
                tabs={
                    <>
                        <FluxTabBarItem
                            label={'Overview'}
                            to={{ pathname: '/dashboard.overview' }}
                        ></FluxTabBarItem>
                        <FluxTabBarItem
                            label={'Activity'}
                            to={{ pathname: '/dashboard.activity' }}
                        ></FluxTabBarItem>
                    </>
                }
            ></FluxApplicationTop>
        </>
    );
}
