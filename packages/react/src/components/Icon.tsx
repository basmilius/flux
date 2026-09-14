import { clsx } from "clsx";
import type { MouseEventHandler } from "react";
import type { FluxColor, FluxIconName, FluxIconStyle } from "../types";
import iconStyles from "../../../components/src/css/component/Icon.module.scss";

export type FluxIconTuple = [number, number, Array<number | string>, string, string | string[]];

export interface FluxIconDefinition {
    icon: FluxIconTuple;
    iconName: string;
}

export type FluxIcons = Record<string, FluxIconDefinition | undefined>;

export interface FluxIconConfig {
    renderMode: "svg" | "font";
    defaultStyle: FluxIconStyle;
    styleOverrides: Partial<Record<FluxIconName, FluxIconStyle>>;
}

export interface ConfigureIconsOptions {
    renderMode?: FluxIconConfig["renderMode"];
    defaultStyle?: FluxIconStyle;
    styleOverrides?: FluxIconConfig["styleOverrides"];
    icons?: FluxIcons | readonly FluxIconDefinition[];
}

export const iconRegistry: Record<string, FluxIconTuple> = {};
const registry = iconRegistry;
export type Icon = FluxIconTuple;
export type IconRegistry = Partial<Record<FluxIconName, Icon>>;
export type Icons = FluxIcons;
export type IconRenderMode = FluxIconConfig["renderMode"];
export type IconConfig = FluxIconConfig;

export const iconConfig: FluxIconConfig = {
    renderMode: "svg",
    defaultStyle: "solid",
    styleOverrides: {},
};

export function configureIcons(options: ConfigureIconsOptions): void {
    if (options.renderMode) iconConfig.renderMode = options.renderMode;
    if (options.defaultStyle) iconConfig.defaultStyle = options.defaultStyle;
    if (options.styleOverrides) Object.assign(iconConfig.styleOverrides, options.styleOverrides);
    if (options.icons) registerIcons(options.icons);
}

export function fluxRegisterIcons(icons: FluxIcons | readonly FluxIconDefinition[]): void {
    registerIcons(icons);
}

function registerIcons(icons: FluxIcons | readonly FluxIconDefinition[]): void {
    for (const definition of Object.values(icons)) {
        if (!definition) continue;
        registry[definition.iconName] = definition.icon;

        for (const alias of definition.icon[2]) {
            if (typeof alias === "string") registry[alias] = definition.icon;
        }
    }
}

export interface FluxIconProps {
    ariaLabel?: string;
    className?: string;
    color?: FluxColor;
    iconStyle?: FluxIconStyle;
    name?: FluxIconName;
    onClick?: MouseEventHandler<HTMLElement | SVGSVGElement>;
    size?: number | string;
}

const colorClasses: Record<FluxColor, string> = {
    gray: iconStyles.iconGray,
    primary: iconStyles.iconPrimary,
    danger: iconStyles.iconDanger,
    info: iconStyles.iconInfo,
    success: iconStyles.iconSuccess,
    warning: iconStyles.iconWarning,
};

const fontStyleClasses: Record<FluxIconStyle, string> = {
    solid: "fa-solid",
    regular: "fa-regular",
    light: "fa-light",
    thin: "fa-thin",
    duotone: "fa-duotone",
    brands: "fa-brands",
};

export function FluxIcon({ ariaLabel, className, color, iconStyle, name, onClick, size }: FluxIconProps) {
    const resolvedStyle = iconStyle ?? (name ? iconConfig.styleOverrides[name] : undefined) ?? iconConfig.defaultStyle;
    const definition = name ? registry[name] : undefined;
    const fontSize = typeof size === "number" ? `${size}px` : size;

    if (iconConfig.renderMode === "svg" && definition) {
        const [width, height, , , iconPaths] = definition;
        const paths = Array.isArray(iconPaths) ? iconPaths : [iconPaths];

        return (
            <svg className={clsx(iconStyles.fontAwesomeIcon, color && colorClasses[color], className)} viewBox={`0 0 ${width} ${height}`} style={{ fontSize, scale: width / 512 > 1 ? width / 512 : undefined }} focusable="false" role={ariaLabel ? "img" : undefined} aria-hidden={ariaLabel ? undefined : true} aria-label={ariaLabel} onClick={onClick as MouseEventHandler<SVGSVGElement>}>
                {paths.map((path, index) => (
                    <path key={index} d={path} fill="currentColor" />
                ))}
            </svg>
        );
    }

    if (iconConfig.renderMode === "font" && name) {
        return (
            <i className={clsx(iconStyles.iconFont, fontStyleClasses[resolvedStyle], color && colorClasses[color], className)} style={{ fontSize }} role={ariaLabel ? "img" : undefined} aria-hidden={ariaLabel ? undefined : true} aria-label={ariaLabel} onClick={onClick as MouseEventHandler<HTMLElement>}>
                {resolvedStyle === "duotone" ? (
                    <>
                        <span className={iconStyles.iconFontSecondary}>{name}##</span>
                        <span className={iconStyles.iconFontPrimary}>{name}#</span>
                    </>
                ) : (
                    name
                )}
            </i>
        );
    }

    return <i className={clsx(iconStyles.icon, className)} aria-hidden="true" />;
}
