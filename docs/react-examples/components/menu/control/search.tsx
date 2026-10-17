import { type ComponentProps, useState } from 'react';
import {
    FluxFormInput,
    FluxMenu,
    FluxMenuControl,
    FluxMenuGroup,
    FluxMenuItem,
    FluxMenuSubHeader,
    FluxPane,
    type FluxIconName
} from '@flux-ui/react';
export default function Example() {
    const actions: {
        readonly icon: FluxIconName;
        readonly label: string;
    }[] = [
        { icon: 'scissors', label: 'Cut' },
        { icon: 'copy', label: 'Copy' },
        { icon: 'paste', label: 'Paste' },
        { icon: 'clone', label: 'Duplicate' },
        { icon: 'pen', label: 'Rename' },
        { icon: 'trash', label: 'Delete' }
    ];
    const [query, setQuery] = useState<string>('');
    const filtered = (() =>
        actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase())))();
    return (
        <>
            <FluxPane style={{ width: '300px' }}>
                <FluxMenu>
                    <FluxMenuControl>
                        <FluxFormInput
                            value={query}
                            onValueChange={(next) => setQuery(String(next ?? ''))}
                            type={'search'}
                            iconLeading={'magnifying-glass'}
                            placeholder={'Filter actions...'}
                        ></FluxFormInput>
                    </FluxMenuControl>
                    <FluxMenuGroup>
                        {filtered.map((action) => (
                            <FluxMenuItem
                                key={action.label}
                                iconLeading={action.icon}
                                label={action.label}
                            ></FluxMenuItem>
                        ))}
                        {filtered.length === 0 ? (
                            <FluxMenuSubHeader label={'No matches'}></FluxMenuSubHeader>
                        ) : null}
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>
        </>
    );
}
