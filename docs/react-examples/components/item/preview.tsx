import { FluxAvatar, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/react';
import { ReactPreview } from '../../../../.vitepress/react/Preview';
export default function Example() {
    const people = [
        { name: 'Bas Milius', role: 'Engineer', avatar: 'https://avatars.githubusercontent.com/u/978257?v=4' },
        { name: 'Jane Doe', role: 'Designer', avatar: null },
        { name: 'John Doe', role: 'Product manager', avatar: null }
    ];
    return (<><ReactPreview><FluxPane style={{ "width": "min(100%, 420px)" }}><FluxItemStack>{(people).map((person) => (<FluxItem key={person.name}><FluxItemMedia isCenter size={40}><FluxAvatar alt={person.name} fallbackIcon={person.avatar ? undefined : 'user'} src={person.avatar ?? undefined} size={40}></FluxAvatar></FluxItemMedia><FluxItemContent isCenter><strong>{person.name}</strong><span style={{ "fontSize": ".875rem", "opacity": ".6" }}>{person.role}</span></FluxItemContent></FluxItem>))}</FluxItemStack></FluxPane></ReactPreview></>);
}
