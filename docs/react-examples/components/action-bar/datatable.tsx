import { type ComponentProps, useState } from 'react';
import { FluxActionBar, FluxBadge, FluxBadgeStack, FluxDataTable, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton, FluxTableCell, FluxTableHeader } from '@flux-ui/react';
export default function Example() {
    const [searchQuery, setSearchQuery] = useState('');
    const items = (() => Array(5).fill(null).map((_, index) => ({
        id: index,
        name: `Apple Iphone ${10 + index}`,
        price: (900 + index * 100),
        inStock: index % 2 === 0
    })))();
    const filteredItems = (() => {
        if (!searchQuery) {
            return items;
        }
        return items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    })();
    return (<><FluxPane><FluxPaneHeader title={"Iphone's"}></FluxPaneHeader><FluxActionBar primary={<><FluxFormInput value={searchQuery} onValueChange={(next) => setSearchQuery(String(next ?? ''))} type={"search"} iconLeading={"magnifying-glass"} placeholder={"Search anything..."}></FluxFormInput></>} filter={() => (<><FluxPaneBody>{" Filter contents. "}</FluxPaneBody></>)} filterOpener={({ open }) => (<><FluxSecondaryButton iconLeading={"filter"} onClick={() => { open(); }}></FluxSecondaryButton></>)}></FluxActionBar><FluxDataTable items={filteredItems} total={items.length} page={1} perPage={5} limits={[5, 10, 25, 50]} isHoverable columns={[{ key: "name", header: <>{"Name"}</>, render: (row, rowIndex) => { const slotProps = { item: row, index: rowIndex }; const { item: { name } } = slotProps; return <>{name}</>; } }, { key: "price", header: <>{"Price"}</>, render: (row, rowIndex) => { const slotProps = { item: row, index: rowIndex }; const { item: { price } } = slotProps; return <>{"€ "}{price}</>; } }, { key: "inStock", header: <>{"Status"}</>, isShrinking: true, render: (row, rowIndex) => { const slotProps = { item: row, index: rowIndex }; const { item: { inStock } } = slotProps; return <><FluxBadgeStack>{inStock ? (<FluxBadge color={"success"} icon={"circle-check"} label={"In stock"} key={"branch-0"}></FluxBadge>) : (<FluxBadge color={"danger"} icon={"circle-xmark"} label={"Not in stock"} key={"branch-1"}></FluxBadge>)}</FluxBadgeStack></>; } }]}></FluxDataTable></FluxPane></>);
}
