import type { FluxIconName, FluxIconStyle } from '@flux-ui/types';
import type { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';
import { reactive } from 'vue';

type Icon = [number, number, string[], string, IconPathData];
type IconRegistry = Partial<{ [key in FluxIconName]: Icon; }>;
type Icons = Record<string, IconDefinition>;

type IconRenderMode = 'svg' | 'font';

type IconConfig = {
    renderMode: IconRenderMode;
    defaultStyle: FluxIconStyle;
    styleOverrides: Partial<Record<FluxIconName, FluxIconStyle>>;
};

type ConfigureIconsOptions = {
    readonly renderMode?: IconRenderMode;
    readonly defaultStyle?: FluxIconStyle;
    readonly styleOverrides?: Partial<Record<FluxIconName, FluxIconStyle>>;
    readonly icons?: Icons | readonly IconDefinition[];
};

export let iconRegistry: IconRegistry = {};

export const iconConfig: IconConfig = reactive({
    renderMode: 'svg',
    defaultStyle: 'solid',
    styleOverrides: {}
});

export function configureIcons(options: ConfigureIconsOptions): void {
    if (options.renderMode) {
        iconConfig.renderMode = options.renderMode;
    }

    if (options.defaultStyle) {
        iconConfig.defaultStyle = options.defaultStyle;
    }

    if (options.styleOverrides) {
        Object.assign(iconConfig.styleOverrides, options.styleOverrides);
    }

    if (options.icons) {
        registerIcons(options.icons);
    }
}

/**
 * @deprecated Use {@link configureIcons} instead: `configureIcons({icons})`.
 */
export function fluxRegisterIcons(icons: Icons | readonly IconDefinition[]): void {
    registerIcons(icons);
}

function registerIcons(icons: Icons | readonly IconDefinition[]): void {
    iconRegistry = Object.values(icons).reduce((registry: IconRegistry, definition: IconDefinition) => {
        if (!definition) {
            return registry;
        }

        const {icon, iconName} = definition;
        registry[iconName as FluxIconName] = icon;

        if (Array.isArray(icon[2])) {
            icon[2].forEach((alias: string) => {
                registry[alias as FluxIconName] = icon;
            });
        }

        return registry;
    }, {...iconRegistry});
}
