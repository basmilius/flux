import { ComponentInternalInstance, set } from 'vue-demi';

export function setInstanceProperty(instance: ComponentInternalInstance | Omit<ComponentInternalInstance, 'exposed'>, key: string, value: unknown): void {
    if ('exposed' in instance) {
        instance.exposed && (instance.exposed[key].value = value);
        return;
    }

    set(instance.proxy, key, value);
}
