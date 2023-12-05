import type { ComponentInternalInstance } from 'vue';

export function setInstanceProperty(instance: ComponentInternalInstance, key: string, value: unknown): void {
    instance.exposed && (instance.exposed[key].value = value);
}
