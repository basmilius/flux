import type { ComponentInternalInstance, Ref } from 'vue';

export default function <T>(instance: ComponentInternalInstance, key: string): Ref<T> {
    if (!instance.exposed || !(key in instance.exposed)) {
        throw new Error(`'${key}' was not exposed by the component.`);
    }

    return instance.exposed[key];
}
