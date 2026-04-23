<template>
    <FluxFormSelect
        v-model="modelValue"
        :disabled="disabled"
        is-searchable
        :options="options"
        :placeholder="placeholder"/>
</template>

<script
    lang="ts"
    setup>
    import { isSSR } from '@flux-ui/internals';
    import type { FluxFormSelectEntry } from '@flux-ui/types';
    import { upperFirst } from 'lodash-es';
    import { computed, toRef } from 'vue';
    import { useDisabled } from '$flux/composable';
    import { useTranslate } from '$flux/composable/private';
    import type { FluxTranslation } from '$flux/data';
    import { TIME_ZONE_GROUP_ORDER, TIME_ZONES } from '$flux/data/timeZones';
    import FluxFormSelect from './FluxFormSelect.vue';

    const modelValue = defineModel<string | null>({
        default: null
    });

    const {
        disabled: componentDisabled
    } = defineProps<{
        readonly disabled?: boolean;
        readonly placeholder?: string;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const options = computed<FluxFormSelectEntry[]>(() => {
        if (isSSR) {
            return [];
        }

        const groups: Record<string, FluxFormSelectEntry[]> = {};
        const options: FluxFormSelectEntry[] = [];

        for (const timeZone of TIME_ZONES) {
            const timeZoneOptions = Intl.DateTimeFormat(navigator.language, {timeZone}).resolvedOptions();
            const timeZoneOffset = new Intl.DateTimeFormat(navigator.language, {timeZone, timeZoneName: 'longOffset'}).formatToParts().find(p => p.type === 'timeZoneName')!.value.substring(3);
            const label = timeZoneOptions.timeZone
                .replaceAll('_', ' ')
                .replaceAll('/', ' / ');

            let group = 'flux.timezoneOther';

            if (label.includes('/')) {
                group = `flux.timezone${upperFirst(label.split('/')[0].trim().toLowerCase())}`;
            }

            groups[group] ??= [];

            if (groups[group].find(go => go.label === label)) {
                continue;
            }

            groups[group].push({
                command: timeZoneOffset,
                label: label,
                value: timeZone
            });
        }

        const sortedGroups = Object.fromEntries(
            Object.entries(groups)
                .sort(([a], [b]) => {
                    const ai = TIME_ZONE_GROUP_ORDER.indexOf(a as FluxTranslation);
                    const bi = TIME_ZONE_GROUP_ORDER.indexOf(b as FluxTranslation);

                    if (ai > bi) {
                        return 1;
                    }

                    if (bi > ai) {
                        return -1;
                    }

                    return 0;
                })
        );

        for (const group in sortedGroups) {
            const groupOptions = sortedGroups[group].sort(({label: labelA}, {label: labelB}) => labelA.localeCompare(labelB));

            options.push({
                label: translate(group as FluxTranslation)
            });

            groupOptions.forEach(go => options.push(go));
        }

        return options;
    });
</script>
