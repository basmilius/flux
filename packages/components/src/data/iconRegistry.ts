import type { FluxIconName } from '@flux-ui/types';
import type { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';

type Icon = [number, number, string[], string, IconPathData];
type IconRegistry = Partial<{ [key in FluxIconName]: Icon; }>;
type Icons = Record<string, IconDefinition>;

export let iconRegistry: IconRegistry = {};

export function fluxRegisterIcons(icons: Icons | readonly IconDefinition[]): void {
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
