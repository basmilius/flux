<template>
    <FluxPane>
        <FluxPaneHeader
            icon="calendar"
            subtitle="North depot · Quarterly safety inspection"
            title="Plan a site visit"/>

        <FluxForm @submit="save">
            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxFormStep title="Choose a visit window">
                        <FluxFormField
                            :error="errors.window"
                            label="Available dates">
                            <FluxFormDateRangeInput v-model="visitWindow"/>
                        </FluxFormField>
                        <FluxFormField
                            :error="errors.startsAt"
                            label="Arrival date and time">
                            <FluxFormDateTimeInput v-model="startsAt"/>
                        </FluxFormField>
                        <FluxFormField
                            :error="errors.timeZone"
                            label="Site time zone">
                            <FluxFormTimeZonePicker v-model="timeZone"/>
                        </FluxFormField>
                    </FluxFormStep>

                    <FluxFormStep
                        subtitle="The first attendee is the on-site contact. Drag the handles to change the order."
                        title="Add attendees">
                        <FluxFormRepeater
                            v-model="attendees"
                            add-label="Add attendee"
                            is-reorderable
                            :max="5"
                            :min="1"
                            :new-row="newAttendee"
                            row-label="Attendee">
                            <template #default="{row}">
                                <FluxFormColumn>
                                    <FluxFormField label="Name">
                                        <FluxFormInput
                                            v-model="row.name"
                                            auto-complete="name"
                                            placeholder="Full name"/>
                                    </FluxFormField>
                                    <FluxFormField label="Email address">
                                        <FluxFormInput
                                            v-model="row.email"
                                            auto-complete="email"
                                            placeholder="name@example.com"
                                            type="email"/>
                                    </FluxFormField>
                                </FluxFormColumn>
                            </template>
                        </FluxFormRepeater>
                        <FluxText
                            v-if="errors.attendees"
                            color="danger"
                            role="alert"
                            size="small">
                            {{ errors.attendees }}
                        </FluxText>
                    </FluxFormStep>
                </FluxFormColumn>
            </FluxPaneBody>

            <FluxPaneBody v-if="savedSummary">
                <FluxNotice
                    color="success"
                    icon="circle-check"
                    :message="savedSummary"/>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>
                <FluxPrimaryButton
                    icon-leading="calendar-check"
                    is-submit
                    label="Save visit"/>
            </FluxPaneFooter>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormColumn, FluxFormDateRangeInput, FluxFormDateTimeInput, FluxFormField, FluxFormInput, FluxFormRepeater, FluxFormStep, FluxFormTimeZonePicker, FluxNotice, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSpacer, FluxText } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref, watch } from 'vue';

    type Attendee = { name: string; email: string };
    type VisitErrors = { window?: string; startsAt?: string; timeZone?: string; attendees?: string };

    const visitWindow = ref<[DateTime, DateTime] | null>([
        DateTime.fromISO('2026-10-12', {zone: 'Europe/Amsterdam'}),
        DateTime.fromISO('2026-10-16', {zone: 'Europe/Amsterdam'})
    ]);
    const startsAt = ref<DateTime | null>(DateTime.fromISO('2026-10-13T09:30', {zone: 'Europe/Amsterdam'}));
    const timeZone = ref<string | null>('Europe/Amsterdam');
    const attendees = ref<Attendee[]>([{name: 'Koen Doorn', email: 'koen@example.com'}]);
    const errors = ref<VisitErrors>({});
    const savedSummary = ref('');

    watch([visitWindow, startsAt, timeZone, attendees], () => {
        savedSummary.value = '';
        errors.value = {};
    }, {deep: true});

    function newAttendee(): Attendee {
        return {name: '', email: ''};
    }

    function save(): void {
        const nextErrors: VisitErrors = {};
        const arrival = startsAt.value;
        const range = visitWindow.value;
        const zone = timeZone.value;

        if (!range?.every(date => date.isValid)) {
            nextErrors.window = 'Choose a start and end date.';
        } else if (range[0].startOf('day') > range[1].startOf('day')) {
            nextErrors.window = 'The end date must follow the start date.';
        }

        if (!arrival?.isValid) {
            nextErrors.startsAt = 'Choose an arrival date and time.';
        } else if (range && !nextErrors.window && (arrival.startOf('day') < range[0].startOf('day') || arrival.startOf('day') > range[1].startOf('day'))) {
            nextErrors.startsAt = 'Arrival must fall within the visit window.';
        }

        if (!zone) {
            nextErrors.timeZone = 'Choose the site time zone.';
        }

        if (!attendees.value.length || attendees.value.some(attendee => !attendee.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email.trim()))) {
            nextErrors.attendees = 'Enter a name and valid email address for every attendee.';
        }

        errors.value = nextErrors;

        if (Object.keys(nextErrors).length || !arrival || !zone) {
            return;
        }

        const localArrival = arrival.setZone(zone, {keepLocalTime: true});
        savedSummary.value = `Visit saved for ${localArrival.toFormat('d LLL yyyy, HH:mm')} (${zone}) with ${attendees.value.length} ${attendees.value.length === 1 ? 'attendee' : 'attendees'}.`;
    }
</script>
