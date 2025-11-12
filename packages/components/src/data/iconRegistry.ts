import type { FluxIconName } from '@flux-ui/types';
import type { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';

type Icon = [number, number, string[], string, IconPathData];
type IconRegistry = Partial<{ [key in FluxIconName]: Icon; }>;
type Icons = Record<string, IconDefinition>;

export let iconRegistry: IconRegistry = {};

export function fluxRegisterIcons(icons: Icons): void {
    iconRegistry = Object.keys(icons).reduce((acc: IconRegistry, key: string) => {
        if (!icons[key]) {
            return acc;
        }

        const {icon, iconName} = icons[key];
        acc[iconName as FluxIconName] = icon;

        if (Array.isArray(icon[2])) {
            icon[2].forEach((iconName: string) => acc[iconName as FluxIconName] = icon);
        }

        return acc;
    }, {});
}
