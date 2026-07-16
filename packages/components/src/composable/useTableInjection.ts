import { inject, ref } from 'vue';
import { FluxTableInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxTableInjectionKey, () => ({
        activeRow: ref(null),
        columns: ref([]),
        pinnedEdges: ref({end: -1, start: -1}),
        pinnedOffsets: ref(new Map<number, number>()),
        registerColumn: () => () => {
        },
        registerTreeNode: () => () => {
        }
    }), true);
}
