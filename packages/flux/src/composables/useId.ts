import { Ref, ref } from 'vue-demi';

let _id: number = 0;

export function useId(): Ref<string> {
    return ref(`flux${++_id}`);
}
