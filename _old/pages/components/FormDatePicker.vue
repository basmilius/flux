<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form date picker"/>

        <Preview>
            <FluxPane style="width: 360px">
                <FluxPaneBody>
                    <FluxFormDateInput v-model="date"/>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A date picker input is a common feature in forms that allows users to select a specific date,
                and optionally a time, from a calendar. By using this component, users can conveniently and
                accurately choose the desired date and time without leaving the form, enhancing their
                overall experience.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['angle-left', 'angle-right', 'calendar']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxFormDateInput</code></td>
                    <td>Allows the user to select a single date.</td>
                </tr>
                <tr>
                    <td><code>FluxFormDateRangeInput</code></td>
                    <td>Allows the user to select a date range.</td>
                </tr>
                <tr>
                    <td><code>FluxFormDateTimeInput</code></td>
                    <td>Allows the user to select a date and time.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="FormDateInput">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>DateTime | null</code></td>
                        <td>The value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>auto-complete</code><code>string</code></td>
                        <td>Please refer to the HTMLInputElement documentation for examples of values that can be given here.</td>
                    </tr>
                    <tr>
                        <td><code>auto-focus</code><code>boolean</code></td>
                        <td>Give the input focus when it is mounted.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-hour-only</code><code>boolean</code></td>
                        <td>Forces the user to only update the hour.</td>
                    </tr>
                    <tr>
                        <td><code>is-readonly</code><code>boolean</code></td>
                        <td>Indicates that the field is readonly.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>DateTime</code></td>
                        <td>The maximum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>DateTime</code></td>
                        <td>The minimum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: DateTime | null): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                    <tr>
                        <td><code>blur</code><code>(): void</code></td>
                        <td>Triggered when the input loses focus.</td>
                    </tr>
                    <tr>
                        <td><code>focus</code><code>(): void</code></td>
                        <td>Triggered when the input gains focus.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FormDateRangeInput">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>DateTime | null</code></td>
                        <td>The value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>auto-complete</code><code>string</code></td>
                        <td>Please refer to the HTMLInputElement documentation for examples of values that can be given here.</td>
                    </tr>
                    <tr>
                        <td><code>auto-focus</code><code>boolean</code></td>
                        <td>Give the input focus when it is mounted.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-readonly</code><code>boolean</code></td>
                        <td>Indicates that the field is readonly.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>DateTime</code></td>
                        <td>The maximum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>DateTime</code></td>
                        <td>The minimum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                    <tr>
                        <td><code>range-mode</code><code>'range' | 'week' | 'month'</code></td>
                        <td>The range type to use.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: DateTime | null): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                    <tr>
                        <td><code>blur</code><code>(): void</code></td>
                        <td>Triggered when the input loses focus.</td>
                    </tr>
                    <tr>
                        <td><code>focus</code><code>(): void</code></td>
                        <td>Triggered when the input gains focus.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="FormDateTimeInput">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>DateTime | null</code></td>
                        <td>The value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>auto-complete</code><code>string</code></td>
                        <td>Please refer to the HTMLInputElement documentation for examples of values that can be given here.</td>
                    </tr>
                    <tr>
                        <td><code>auto-focus</code><code>boolean</code></td>
                        <td>Give the input focus when it is mounted.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-readonly</code><code>boolean</code></td>
                        <td>Indicates that the field is readonly.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>DateTime</code></td>
                        <td>The maximum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>DateTime</code></td>
                        <td>The minimum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: DateTime | null): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                    <tr>
                        <td><code>blur</code><code>(): void</code></td>
                        <td>Triggered when the input loses focus.</td>
                    </tr>
                    <tr>
                        <td><code>focus</code><code>(): void</code></td>
                        <td>Triggered when the input gains focus.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="singleCode"
                :component="single"
                title="Single date"
                description="Used to allow the user to select a single date."/>

            <ApiExample
                :code="dateRangeCode"
                :component="dateRange"
                title="Date range"
                description="Used to allow the user to select a date range."/>

            <ApiExample
                :code="dateTimeCode"
                :component="dateTime"
                title="Date time"
                description="Used to allow the user to select a date and time."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormDateInput, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';
    import dateRange from '@/code/components/formDatePicker/dateRange.vue';
    import dateRangeCode from '@/code/components/formDatePicker/dateRange.vue?raw';
    import dateTime from '@/code/components/formDatePicker/dateTime.vue';
    import dateTimeCode from '@/code/components/formDatePicker/dateTime.vue?raw';
    import single from '@/code/components/formDatePicker/singleDate.vue';
    import singleCode from '@/code/components/formDatePicker/singleDate.vue?raw';

    const date = ref(DateTime.now());
</script>
