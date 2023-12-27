import type { Ref } from 'vue';
import { ref } from 'vue';

let _id: number = 0;

export function useId(): Ref<string> {
    return ref(`flux:${++_id}`);
}
