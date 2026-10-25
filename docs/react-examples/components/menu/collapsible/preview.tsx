import {ReactPreview} from '../../../../../.vitepress/react/Preview';
import {
    FluxMenu,
    FluxMenuCollapsible,
    FluxMenuGroup,
    FluxMenuItem,
    FluxPane
} from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <ReactPreview>
                <FluxPane style={{ width: '300px' }}>
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem iconLeading={'grid-2'} label={'Dashboard'}></FluxMenuItem>
                            <FluxMenuCollapsible
                                iconLeading={'cubes'}
                                defaultOpened
                                label={'Projects'}
                            >
                                <FluxMenuItem label={'Active'}></FluxMenuItem>
                                <FluxMenuItem label={'Archived'}></FluxMenuItem>
                                <FluxMenuItem label={'Drafts'}></FluxMenuItem>
                            </FluxMenuCollapsible>
                            <FluxMenuItem iconLeading={'gear'} label={'Settings'}></FluxMenuItem>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxPane>
            </ReactPreview>
        </>
    );
}
