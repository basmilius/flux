import { useState } from 'react';
import {
    FluxMenu,
    FluxMenuCheckbox,
    FluxMenuGroup,
    FluxMenuSubHeader,
    FluxPane
} from '@flux-ui/react';
export default function Example() {
    const [columns, setColumns] = useState([
        { label: 'Name', isVisible: true },
        { label: 'Status', isVisible: true },
        { label: 'Owner', isVisible: false },
        { label: 'Last modified', isVisible: true }
    ]);
    return (
        <>
            <FluxPane style={{ width: '270px' }}>
                <FluxMenu>
                    <FluxMenuSubHeader label={'Columns'}></FluxMenuSubHeader>
                    <FluxMenuGroup>
                        {columns.map((column) => (
                            <FluxMenuCheckbox
                                key={column.label}
                                checked={column.isVisible}
                                onCheckedChange={(next) =>
                                    setColumns((current) =>
                                        current.map((item) =>
                                            item === column ? { ...item, isVisible: next } : item
                                        )
                                    )
                                }
                                label={column.label}
                            ></FluxMenuCheckbox>
                        ))}
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>
        </>
    );
}
