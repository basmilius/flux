import { type ComponentProps, useState } from 'react';
import { FluxFormField, FluxFormSelectAsync, FluxPane, FluxPaneBody, type FluxFormSelectEntry, type FluxFormSelectValueSingle } from '@flux-ui/react';
export default function Example() {
    const OPTIONS = [
        { value: 1, label: 'Alice' },
        { value: 2, label: 'Bob' },
        { value: 3, label: 'Charlie' }
    ];
    const [single, setSingle] = useState<Exclude<ComponentProps<typeof FluxFormSelectAsync>['value'], undefined>>(1);
    const [multiple, setMultiple] = useState<FluxFormSelectValueSingle[]>([1]);
    async function fetchOptions(values: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]> {
        return OPTIONS.filter(option => values.includes(option.value));
    }
    async function fetchRelevant(): Promise<FluxFormSelectEntry[]> {
        return OPTIONS;
    }
    async function fetchSearch(query: string): Promise<FluxFormSelectEntry[]> {
        await new Promise(resolve => setTimeout(resolve, 450));
        const search = query.toLowerCase();
        return OPTIONS.filter(option => option.label.toLowerCase().includes(search)
            || (search === 'robert' && option.value === 2));
    }
    return (<><FluxPane><FluxPaneBody><FluxFormField label={"Single selection"}><FluxFormSelectAsync value={single} onValueChange={setSingle} fetchOptions={fetchOptions} fetchRelevant={fetchRelevant} fetchSearch={fetchSearch}></FluxFormSelectAsync></FluxFormField><FluxFormField label={"Multiple selections"}><FluxFormSelectAsync value={multiple} onValueChange={value => setMultiple(Array.isArray(value) ? value : [])} fetchOptions={fetchOptions} fetchRelevant={fetchRelevant} fetchSearch={fetchSearch} isMultiple></FluxFormSelectAsync></FluxFormField><p>{"Selected values: "}{single}{" / "}{multiple.join(', ') || 'none'}</p></FluxPaneBody></FluxPane></>);
}
