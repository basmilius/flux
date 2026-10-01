import { describe, expect, test } from 'bun:test';
import { ref } from 'vue';
import useFormSelect from '../src/composable/private/useFormSelect';
import { flattenSearch } from '../src/composable/private/useTreeView';

describe('select', () => {
    test('keeps selected labels when the search results exclude their values', () => {
        const registry = ref([{value: 1, label: 'Alice'}, {value: 2, label: 'Bob'}]);
        const options = ref([{value: 2, label: 'Bob'}]);
        const model = ref([1]);
        const {groups, selected} = useFormSelect(model, true, options, undefined, registry);

        expect(selected.value.map(option => option.label)).toEqual(['Alice']);
        expect(groups.value[0][1].map(option => option.label)).toEqual(['Bob']);
        expect(model.value).toEqual([1]);
    });

    test('preserves group boundaries, selection order and first duplicate labels', () => {
        const options = ref([
            {label: 'People'},
            {value: 1, label: 'Alice'},
            {value: 2, label: 'Bob'},
            {value: 1, label: 'Duplicate'},
            {label: 'Other'},
            {value: 3, label: 'Charlie'}
        ]);
        const model = ref([3, 1, 99]);
        const {groups, selected} = useFormSelect(model, true, options);

        expect(selected.value.map(option => option.label)).toEqual(['Charlie', 'Alice']);
        expect(groups.value).toEqual([[{label: 'People'}, [{value: 2, label: 'Bob'}]]]);

        model.value = [2];
        expect(selected.value.map(option => option.label)).toEqual(['Bob']);
        expect(groups.value[1][1].map(option => option.label)).toEqual(['Charlie']);
    });

    test('updates labels when options change and distinguishes numeric and string values', () => {
        const options = ref([{value: 1, label: 'Numeric'}, {value: '1', label: 'String'}]);
        const {selected} = useFormSelect(ref(['1']), false, options);

        expect(selected.value[0].label).toBe('String');
        options.value[1].label = 'Updated';
        expect(selected.value[0].label).toBe('Updated');
    });
});

describe('tree search', () => {
    test('preserves ancestors, sibling guides and prunes nonmatching branches', () => {
        const nodes = [{id: 1, label: 'Root', children: [
            {id: 2, label: 'First', children: [{id: 3, label: 'Target'}]},
            {id: 4, label: 'Ignored'},
            {id: 5, label: 'Second target'}
        ]}];
        const result = flattenSearch(nodes, 'target');

        expect(result.map(node => node.id)).toEqual([1, 2, 3, 5]);
        expect(result.map(node => node.ancestorIds)).toEqual([[], [1], [1, 2], [1]]);
        expect(result.map(node => node.isLast)).toEqual([true, false, true, true]);
        expect(result[2].lineGuides).toEqual([true]);
        expect(result[2].hasChildren).toBe(false);
        expect(flattenSearch(nodes, 'ignored').map(node => node.id)).toEqual([1, 4]);
    });

    test('checks each label once instead of rescanning every matching subtree', () => {
        let reads = 0;
        let node: any = {id: 400, get label() { reads++; return 'target'; }};

        for (let id = 399; id > 0; id--) {
            node = {id, get label() { reads++; return 'branch'; }, children: [node]};
        }

        expect(flattenSearch([node], 'target')).toHaveLength(400);
        expect(reads).toBe(800);
    });
});
