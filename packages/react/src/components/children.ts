import {Children, Fragment, isValidElement, type ReactElement, type ReactNode} from 'react';

export function flattenElements<P = Record<string, unknown>>(children: ReactNode): ReactElement<P>[] {
    const elements: ReactElement<P>[] = [];
    Children.forEach(children, child => {
        if (!isValidElement(child)) return;
        if (child.type === Fragment) elements.push(...flattenElements<P>((child.props as {children?: ReactNode}).children));
        else elements.push(child as ReactElement<P>);
    });
    return elements;
}
