import type { Ref } from 'vue';
import { ref } from 'vue';

let id: number = 0;

export function useId(): Ref<string> {
    return useId.generate();
}

useId.generate = function (): Ref<string> {
    return ref(`flux:${++id}`);
};
