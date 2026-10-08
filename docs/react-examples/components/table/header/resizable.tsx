import { useState } from 'react';
import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/react';
export default function Example() {
    const people = [
        { name: 'Amelia Fox', role: 'Designer', email: 'amelia@example.com' },
        { name: 'Bram de Vries', role: 'Engineer', email: 'bram@example.com' },
        { name: 'Chiara Rossi', role: 'Product manager', email: 'chiara@example.com' }
    ];
    const [widths, setWidths] = useState<{
        name?: number;
        role?: number;
    }>({});
    return (
        <>
            <FluxPane>
                <FluxTable
                    header={
                        <>
                            <FluxTableRow>
                                <FluxTableHeader
                                    isResizable
                                    minWidth={120}
                                    width={widths.name}
                                    onResize={($event) => {
                                        setWidths({ ...widths, name: $event ?? undefined });
                                    }}
                                >
                                    {' Name '}
                                </FluxTableHeader>
                                <FluxTableHeader
                                    isResizable
                                    minWidth={90}
                                    maxWidth={240}
                                    width={widths.role}
                                    onResize={($event) => {
                                        setWidths({ ...widths, role: $event ?? undefined });
                                    }}
                                >
                                    {' Role '}
                                </FluxTableHeader>
                                <FluxTableHeader>{' Email '}</FluxTableHeader>
                            </FluxTableRow>
                        </>
                    }
                >
                    {people.map((person) => (
                        <FluxTableRow key={person.email}>
                            <FluxTableCell>{person.name}</FluxTableCell>
                            <FluxTableCell>{person.role}</FluxTableCell>
                            <FluxTableCell>{person.email}</FluxTableCell>
                        </FluxTableRow>
                    ))}
                </FluxTable>
            </FluxPane>
        </>
    );
}
