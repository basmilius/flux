import {clsx} from 'clsx';
import {Children, cloneElement, isValidElement} from 'react';
import type {CSSProperties, ElementType, HTMLAttributes, ReactElement, ReactNode} from 'react';
import type {FluxAlign, FluxColor, FluxDirection, FluxFlexWrap, FluxJustify, FluxStyle} from '../types';
import flexStyles from '../../../components/src/css/component/Flex.module.scss';
import gridStyles from '../../../components/src/css/component/Grid.module.scss';
import layoutStyles from '../../../components/src/css/component/Layout.module.scss';
import dividerStyles from '../../../components/src/css/component/Divider.module.scss';
import textStyles from '../../../components/src/css/component/Text.module.scss';
import proseStyles from '../../../components/src/css/component/Prose.module.scss';

export interface FluxPolymorphicProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
}

export interface FluxFlexProps extends FluxPolymorphicProps {
    align?: FluxAlign;
    direction?: FluxDirection;
    gap?: number;
    isInline?: boolean;
    justify?: FluxJustify;
    wrap?: FluxFlexWrap;
}

export function FluxFlex({align, as: Component = 'div', children, className, direction = 'horizontal', gap, isInline, justify, style, wrap, ...props}: FluxFlexProps) {
    return (
        <Component
            {...props}
            className={clsx(
                isInline ? flexStyles.flexInline : flexStyles.flex,
                flexStyles[`flexDirection${capitalize(direction)}`],
                align && flexStyles[`flexAlign${capitalize(align)}`],
                justify && flexStyles[`flexJustify${capitalize(justify)}`],
                wrap && flexStyles[`flexWrap${pascalCase(wrap)}`],
                className
            )}
            style={{...style, '--gap': gap !== undefined ? `${gap}px` : undefined} as FluxStyle}
        >{children}</Component>
    );
}

export interface FluxFlexItemProps {
    basis?: number | string;
    children?: ReactNode;
    className?: string;
    grow?: number;
    shrink?: number;
}

export function FluxFlexItem({basis, children, className, grow, shrink}: FluxFlexItemProps) {
    const style: CSSProperties = {flexBasis: typeof basis === 'number' ? `${basis}px` : basis, flexGrow: grow, flexShrink: shrink};
    const childArray = Children.toArray(children);

    if (childArray.length === 1 && isValidElement(childArray[0])) {
        const child = childArray[0] as ReactElement<{className?: string; style?: CSSProperties}>;
        return cloneElement(child, {className: clsx(flexStyles.flexItem, child.props.className, className), style: {...child.props.style, ...style}});
    }

    return <div className={clsx(flexStyles.flexItem, className)} style={style}>{children}</div>;
}

export interface FluxGridProps extends FluxPolymorphicProps {
    columns?: number;
    gap?: number;
}

export function FluxGrid({as: Component = 'div', children, className, columns = 12, gap = 18, style, ...props}: FluxGridProps) {
    return <Component {...props} className={clsx(gridStyles.grid, className)} style={{...style, '--gap': `${gap}px`, '--columns': columns} as FluxStyle}>{children}</Component>;
}

export interface FluxGridColumnProps extends FluxPolymorphicProps {
    lg?: number;
    md?: number;
    sm?: number;
    xl?: number;
    xs?: number;
}

export function FluxGridColumn({as: Component = 'div', children, className, lg, md, sm, style, xl, xs, ...props}: FluxGridColumnProps) {
    const base = xs ?? 12;
    return <Component {...props} className={clsx(gridStyles.gridColumn, className)} style={{...style, '--xs': base, '--sm': sm ?? base, '--md': md ?? sm ?? base, '--lg': lg ?? md ?? sm ?? base, '--xl': xl ?? lg ?? md ?? sm ?? base} as FluxStyle}>{children}</Component>;
}

export function FluxAspectRatio({aspectRatio, as: Component = 'div', children, className, style, ...props}: FluxPolymorphicProps & {aspectRatio: number}) {
    return <Component {...props} className={clsx(layoutStyles.aspectRatio, className)} style={{...style, aspectRatio}}>{children}</Component>;
}

export function FluxContainer({as: Component = 'div', children, className, gutter = 18, style, ...props}: FluxPolymorphicProps & {gutter?: number}) {
    return <Component {...props} className={clsx(layoutStyles.container, className)} style={{...style, '--gutter': `${gutter}px`} as FluxStyle}>{children}</Component>;
}

export function FluxSpacer(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(layoutStyles.spacer, props.className)} />;
}

const spacings = [0, 3, 6, 9, 12, 15, 18, 24, 30, 36, 42, 48, 54, 60, 72, 84, 90, 120] as const;

export function FluxSpacing({size, style, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {size: number}) {
    return <div {...props} style={{...style, flex: `0 0 ${spacings[size] ?? size}px`}} aria-hidden={props['aria-hidden'] ?? true} />;
}

export function FluxDivider({children, className, contentPlacement = 'center', ...props}: HTMLAttributes<HTMLDivElement> & {contentPlacement?: 'start' | 'center' | 'end'}) {
    return (
        <div {...props} className={clsx(dividerStyles[`dividerContent${capitalize(contentPlacement)}`], className)}>
            {children ? <div className={dividerStyles.dividerContent}>{children}</div> : <hr className={dividerStyles.dividerLine} />}
        </div>
    );
}

export function FluxSeparator({className, direction = 'horizontal', ...props}: HTMLAttributes<HTMLDivElement> & {direction?: FluxDirection}) {
    return <div {...props} className={clsx(direction === 'horizontal' ? dividerStyles.separatorHorizontal : dividerStyles.separatorVertical, className)} role="separator" aria-orientation={direction} />;
}

export interface FluxTextProps extends FluxPolymorphicProps {
    align?: 'start' | 'center' | 'end';
    color?: FluxColor | 'muted' | 'prominent';
    size?: 'small' | 'medium' | 'large' | 'display';
    tabular?: boolean;
    truncate?: boolean;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export function FluxText({align, as: Component = 'span', children, className, color, size, style, tabular, truncate, weight, ...props}: FluxTextProps) {
    return <Component
        {...props}
        className={clsx(
            textStyles.text,
            size && textStyles[`textSize${capitalize(size)}`],
            color && textStyles[`textColor${capitalize(color)}`],
            align && textStyles[`textAlign${capitalize(align)}`],
            tabular && textStyles.textTabular,
            truncate && textStyles.textTruncate,
            className
        )}
        style={{...style, fontWeight: weight}}
    >{children}</Component>;
}

export function FluxProse({as: Component = 'div', asChild, children, className, container, ...props}: FluxPolymorphicProps & {asChild?: boolean; container?: boolean}) {
    const proseClass = clsx(proseStyles.prose, container && proseStyles.proseContainer, className);
    if (asChild && isValidElement(children)) {
        const child = children as ReactElement<{className?: string; 'data-prose'?: string}>;
        return cloneElement(child, {...props, className: clsx(proseClass, child.props.className), 'data-prose': ''});
    }
    return <Component {...props} className={proseClass} data-prose="">{children}</Component>;
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function pascalCase(value: string): string {
    return value.split('-').map(capitalize).join('');
}
