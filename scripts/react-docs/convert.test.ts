import { describe, expect, test } from 'bun:test';
import ts from '../../packages/react/node_modules/typescript';
import { convert } from './convert';

function example(template: string, script: string) {
    const result = convert(
        `<template>${template}</template><script setup lang="ts">${script}</script>`,
        'test.vue',
        () => {}
    );
    const parsed = ts.createSourceFile(
        'test.tsx',
        result,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
    );
    expect((parsed as ts.SourceFile & { parseDiagnostics: unknown[] }).parseDiagnostics).toEqual(
        []
    );
    return result;
}

describe('React documentation conversion', () => {
    test('updates React state without rewriting ordinary object values', () => {
        const output = example(
            '<FluxPrimaryButton :label="option.value" @click="count++"/>',
            `import {FluxPrimaryButton} from '@flux-ui/components'; import {ref} from 'vue'; const count = ref(0); const option = {value: 'Save'};`
        );
        expect(output).toContain('label={option.value}');
        expect(output).toContain('setCount(count + 1)');
        expect(output).not.toContain("from 'vue'");
    });

    test('preserves typed arrays and object-literal bindings', () => {
        const output = example(
            '<div :style="{display: \'flex\'}">{{ items[0].value }}</div>',
            `const items: {value: string}[] = [{value: 'One'}];`
        );
        expect(output).toMatch(/}\[\] = \[/);
        expect(output).toContain('items[0].value');
    });

    test('keeps template loops and conditional branches', () => {
        const output = example(
            '<template v-for="item in items" :key="item.id"><strong v-if="item.active">Yes</strong><span v-else>No</span></template>',
            `const items = [{id: 1, active: true}];`
        );
        expect(output).toContain('.map(');
        expect(output).toContain('key={item.id}');
        expect(output).toContain('item.active ?');
        expect(output).toContain('"No"');
    });

    test('uses the checkbox callback without confusing native input attributes', () => {
        const output = example(
            '<FluxFormCheckbox v-model="checked"/><FluxFormInput v-model="name"/>',
            `import {FluxFormCheckbox, FluxFormInput} from '@flux-ui/components'; import {ref} from 'vue'; const checked = ref(false); const name = ref('');`
        );
        expect(output).toContain('onCheckedChange={setChecked}');
        expect(output).toContain('value={name}');
        expect(output).toContain('onValueChange=');
    });

    test('cleans up intervals', () => {
        const output = example(
            '<div>{{ count }}</div>',
            `import {useInterval} from '@basmilius/common'; import {ref} from 'vue'; const count = ref(0); useInterval(100, () => count.value++);`
        );
        expect(output).toContain('useEffect(');
        expect(output).toContain('clearInterval(timer)');
        expect(output).toContain('[count]');
    });

    test('passes inline event callbacks instead of returning an unused function', () => {
        const output = example(
            '<FluxFormInput :value="name" @update:model-value="value => name = value"/>',
            `import {ref} from 'vue'; const name = ref('');`
        );
        expect(output).toContain('onValueChange={value => setName(value)}');
        expect(output).toContain('FluxFormInput');
    });

    test('invokes named handlers after applying event modifiers', () => {
        const output = example('<button @click.prevent="save"/>', 'function save() {}');
        expect(output).toContain('$event.preventDefault();');
        expect(output).toContain('(save)($event)');
    });

    test('uses React component handles for imperative template refs', () => {
        const output = example(
            '<button @click="palette?.open()"/><FluxCommandPalette ref="palette" :sources="[]"/>',
            `import {useTemplateRef} from 'vue'; import {FluxCommandPalette} from '@flux-ui/components'; const palette = useTemplateRef<InstanceType<typeof FluxCommandPalette>>('palette');`
        );
        expect(output).toContain('ComponentRef<typeof FluxCommandPalette>');
        expect(output).toContain('palette.current?.open()');
        expect(output).toContain('ref={palette}');
    });

    test('uses React createElement for programmatically built content', () => {
        const output = example(
            '<div>{{ label }}</div>',
            `import {h} from 'vue'; const label = h('span', {}, 'Hello');`
        );
        expect(output).toContain("createElement('span', {}, 'Hello')");
        expect(output).toContain("from 'react'");
    });

    test('does not publish mutable array state as a working React example', () => {
        expect(() =>
            example(
                '<div/>',
                `import {ref} from 'vue'; const items = ref<string[]>([]); function add() {items.value.push('One');}`
            )
        ).toThrow('immutable React state updates');
    });

    test('copies Set and Map state before updating it', () => {
        const output = example('<div/>', "import {reactive, ref} from 'vue'; const collapsed = reactive(new Set<string>()); const labels = ref(new Map<string, string>()); function toggle() {collapsed.add('src'); collapsed.delete('lib'); labels.value.set('src', 'Source'); labels.value.clear();}");
        expect(output.match(/setCollapsed\(current =>/g)).toHaveLength(2);
        expect(output.match(/setLabels\(current =>/g)).toHaveLength(2);
        expect(output).toContain('new Set(current)');
        expect(output).toContain('new Map(current)');
        expect(output).not.toContain('collapsed.add(');
    });

    test('preserves window views and the height transition reference', () => {
        const output = example('<FluxPane v-height-transition><FluxWindow><template #default="{transitionTo}"><button @click="transitionTo(\'settings\')">Settings</button></template><template #settings="{transitionTo}"><button @click="transitionTo(\'default\')">Back</button></template></FluxWindow></FluxPane>', '');
        expect(output).toContain('useHeightTransition()');
        expect(output).toContain('ref={heightTransition');
        expect(output).toMatch(/views=\{\{\s*"default":/);
        expect(output).toContain('"settings":');
    });

    test('uses the CSS-module extension recognized by Vite', () => {
        const files: string[] = [];
        convert(
            '<template><div :class="$style.test"/></template><style module>.test {color: red;}</style>',
            'style.vue',
            (name) => files.push(name)
        );
        expect(files).toEqual(['style-0.module.scss']);
    });
    test('keeps nested loops scoped and keys unique', () => {
        const output = example(
            '<template v-for="group of groups" :key="group.id"><div v-for="item of group.items" :key="item.id">{{item.name}}</div></template>',
            "const groups = [{id: 1, items: [{id: 2, name: 'Child'}]}];"
        );
        expect(output).toContain('Fragment key={group.id}');
        expect(output).toContain('key={item.id}');
    });

    test('renders calendar entries as direct children instead of fragments', () => {
        const output = example(
            '<FluxCalendar><template v-for="item of items" :key="item.id"><FluxCalendarItem :id="item.id" :date="item.date"/></template></FluxCalendar>',
            "import {DateTime} from 'luxon'; const items = [{id: 1, date: DateTime.now()}];"
        );
        expect(output).toContain('<FluxCalendarItem key={item.id}');
        expect(output).not.toContain('Fragment');
    });

    test('maps rich content to the React content props', () => {
        const output = example(
            '<FluxAiToolCall name="search"><template #result><strong>Found</strong></template></FluxAiToolCall><FluxDescriptionItem><template #label><strong>Name</strong></template></FluxDescriptionItem>',
            ''
        );
        expect(output).toContain('resultContent={() =>');
        expect(output).toContain('labelContent={');
    });

    test('updates nested model state immutably', () => {
        const output = example(
            '<FluxFormInput v-model="form.name"/>',
            "import {reactive} from 'vue'; const form = reactive({name: 'Bas'});"
        );
        expect(output).toMatch(/setForm\(current =>/);
        expect(output).toContain('...current');
    });

    test('uses reactive DOM references for scroll containers', () => {
        const output = example(
            '<div ref="container"><FluxBackToTop :scroll-container="container"/></div>',
            "import {useTemplateRef} from 'vue'; const container = useTemplateRef<HTMLDivElement>('container');"
        );
        expect(output).toContain('ref={setContainer}');
        expect(output).toContain('scrollContainer={container}');
    });
    test('keeps cell layout when converting table slots', () => {
        const output = example('<FluxDataTable :items="[]"><template #header><FluxTableHeader>Name</FluxTableHeader></template><template #name="{item}"><FluxTableCell content-direction="column" :content-gap="3"><strong>{{item.name}}</strong></FluxTableCell></template></FluxDataTable>', '');
        expect(output).toContain('cellProps:');
        expect(output).toContain('"contentDirection": "column"');
        expect(output).toContain('"contentGap": 3');
    });

    test('uses the shared React preview without adding a CSS-module wrapper', () => {
        const output = convert('<template><Preview><div :class="$style.sample"/></Preview></template><style module>.sample {padding: 3px;}</style>', 'components/sample.vue', () => {});
        expect(output).toContain('<ReactPreview>');
        expect(output).not.toContain('react-example-');
    });
});
