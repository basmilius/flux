import {clsx} from 'clsx';
import type {HTMLAttributes, ReactNode} from 'react';
import type {FluxColor, FluxStyle} from '../types';
import styles from '../../../components/src/css/component/Tree.module.scss';

const markerColors: Record<FluxColor, string> = {
    gray: styles.treeItemMarkerGray,
    primary: styles.treeItemMarkerPrimary,
    danger: styles.treeItemMarkerDanger,
    info: styles.treeItemMarkerInfo,
    success: styles.treeItemMarkerSuccess,
    warning: styles.treeItemMarkerWarning
};

export function FluxTree({className, ...props}: HTMLAttributes<HTMLUListElement>) {
    return <ul {...props} className={clsx(styles.tree, className)} role="list" />;
}

export function FluxTreeItem({children, className, color = 'gray', isHighlighted, label, ...props}: Omit<HTMLAttributes<HTMLLIElement>, 'color'> & {color?: FluxColor | string; isHighlighted?: boolean; label?: ReactNode}) {
    const marker = markerColors[color as FluxColor];

    return <li {...props} className={clsx(styles.treeItem, className)}>
        <div className={clsx(styles.treeItemRow, isHighlighted && styles.isHighlighted)}>
            <span className={clsx(styles.treeItemMarker, marker)} style={marker ? undefined : {'--tree-marker-color': color} as FluxStyle} aria-hidden="true" />
            <span className={styles.treeItemLabel}>{label}</span>
        </div>
        {children != null && <ul className={styles.treeItemChildren} role="list">{children}</ul>}
    </li>;
}
