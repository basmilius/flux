import { fluxRegisterIcons } from '@flux-ui/components';
import * as icons from './icons';

// Vue plugin: registers the FontAwesome icon set with Flux. Importing
// @flux-ui/components also pulls in the Flux base stylesheet as a side effect.
export default function flux(): void {
    fluxRegisterIcons(icons);
}
