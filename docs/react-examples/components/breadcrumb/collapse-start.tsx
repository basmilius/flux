import {FluxBreadcrumb, FluxBreadcrumbItem} from '@flux-ui/react';
export default function Example() {
    return <div style={{maxWidth: 360}}><FluxBreadcrumb collapse="start">
        <FluxBreadcrumbItem href="#" icon="house" label="Home" />
        <FluxBreadcrumbItem href="#" label="Clients" />
        <FluxBreadcrumbItem href="#" label="Acme Corporation" />
        <FluxBreadcrumbItem href="#" label="Projects" />
        <FluxBreadcrumbItem href="#" label="Website Redesign" />
        <FluxBreadcrumbItem label="Homepage" />
    </FluxBreadcrumb></div>;
}
