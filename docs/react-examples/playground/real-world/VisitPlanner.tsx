import { type ComponentProps, useState } from 'react';
import {
    FluxForm,
    FluxFormColumn,
    FluxFormDateRangeInput,
    FluxFormDateTimeInput,
    FluxFormField,
    FluxFormInput,
    FluxFormRepeater,
    FluxFormStep,
    FluxFormTimeZonePicker,
    FluxNotice,
    FluxPane,
    FluxPaneBody,
    FluxPaneFooter,
    FluxPaneHeader,
    FluxPrimaryButton,
    FluxSpacer,
    FluxText
} from '@flux-ui/react';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
export default function Example() {
    type Attendee = {
        name: string;
        email: string;
    };
    type VisitErrors = {
        window?: string;
        startsAt?: string;
        timeZone?: string;
        attendees?: string;
    };
    const [visitWindow, setVisitWindow] = useState<
        Exclude<ComponentProps<typeof FluxFormDateRangeInput>['value'], undefined>
    >([
        DateTime.fromISO('2026-10-12', { zone: 'Europe/Amsterdam' }),
        DateTime.fromISO('2026-10-16', { zone: 'Europe/Amsterdam' })
    ]);
    const [startsAt, setStartsAt] = useState<
        Exclude<ComponentProps<typeof FluxFormDateTimeInput>['value'], undefined>
    >(DateTime.fromISO('2026-10-13T09:30', { zone: 'Europe/Amsterdam' }));
    const [timeZone, setTimeZone] = useState<string>('Europe/Amsterdam');
    const [attendees, setAttendees] = useState<Attendee[]>([
        { name: 'Koen Doorn', email: 'koen@example.com' }
    ]);
    const [errors, setErrors] = useState<VisitErrors>({});
    const [savedSummary, setSavedSummary] = useState('');
    useEffect(() => {
        setSavedSummary('');
        setErrors({});
    }, [visitWindow, startsAt, timeZone, attendees]);
    function newAttendee(): Attendee {
        return { name: '', email: '' };
    }
    function save(): void {
        const nextErrors: VisitErrors = {};
        const arrival = startsAt;
        const range = visitWindow;
        const zone = timeZone;
        if (!range?.every((date) => date.isValid)) {
            nextErrors.window = 'Choose a start and end date.';
        } else if (range[0].startOf('day') > range[1].startOf('day')) {
            nextErrors.window = 'The end date must follow the start date.';
        }
        if (!arrival?.isValid) {
            nextErrors.startsAt = 'Choose an arrival date and time.';
        } else if (
            range &&
            !nextErrors.window &&
            (arrival.startOf('day') < range[0].startOf('day') ||
                arrival.startOf('day') > range[1].startOf('day'))
        ) {
            nextErrors.startsAt = 'Arrival must fall within the visit window.';
        }
        if (!zone) {
            nextErrors.timeZone = 'Choose the site time zone.';
        }
        if (
            !attendees.length ||
            attendees.some(
                (attendee) =>
                    !attendee.name.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email.trim())
            )
        ) {
            nextErrors.attendees = 'Enter a name and valid email address for every attendee.';
        }
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length || !arrival || !zone) {
            return;
        }
        const localArrival = arrival.setZone(zone, { keepLocalTime: true });
        setSavedSummary(
            `Visit saved for ${localArrival.toFormat('d LLL yyyy, HH:mm')} (${zone}) with ${attendees.length} ${attendees.length === 1 ? 'attendee' : 'attendees'}.`
        );
    }
    return (
        <>
            <FluxPane>
                <FluxPaneHeader
                    icon={'calendar'}
                    subtitle={'North depot · Quarterly safety inspection'}
                    title={'Plan a site visit'}
                ></FluxPaneHeader>
                <FluxForm onSubmit={save}>
                    <FluxPaneBody>
                        <FluxFormColumn>
                            <FluxFormStep title={'Choose a visit window'}>
                                <FluxFormField error={errors.window} label={'Available dates'}>
                                    <FluxFormDateRangeInput
                                        value={visitWindow}
                                        onValueChange={setVisitWindow}
                                    ></FluxFormDateRangeInput>
                                </FluxFormField>
                                <FluxFormField
                                    error={errors.startsAt}
                                    label={'Arrival date and time'}
                                >
                                    <FluxFormDateTimeInput
                                        value={startsAt}
                                        onValueChange={setStartsAt}
                                    ></FluxFormDateTimeInput>
                                </FluxFormField>
                                <FluxFormField error={errors.timeZone} label={'Site time zone'}>
                                    <FluxFormTimeZonePicker
                                        value={timeZone}
                                        onValueChange={(value) => setTimeZone(String(value ?? ''))}
                                    ></FluxFormTimeZonePicker>
                                </FluxFormField>
                            </FluxFormStep>
                            <FluxFormStep
                                subtitle={
                                    'The first attendee is the on-site contact. Drag the handles to change the order.'
                                }
                                title={'Add attendees'}
                            >
                                <FluxFormRepeater
                                    value={attendees}
                                    onValueChange={setAttendees}
                                    addLabel={'Add attendee'}
                                    isReorderable
                                    max={5}
                                    min={1}
                                    newRow={newAttendee}
                                    rowLabel={'Attendee'}
                                    children={({ row }) => (
                                        <>
                                            <FluxFormColumn>
                                                <FluxFormField label={'Name'}>
                                                    <FluxFormInput
                                                        value={row.name}
                                                        onValueChange={(next) =>
                                                            setAttendees((current) =>
                                                                current.map((item) =>
                                                                    item === row
                                                                        ? {
                                                                              ...item,
                                                                              name: String(
                                                                                  next ?? ''
                                                                              )
                                                                          }
                                                                        : item
                                                                )
                                                            )
                                                        }
                                                        autoComplete={'name'}
                                                        placeholder={'Full name'}
                                                    ></FluxFormInput>
                                                </FluxFormField>
                                                <FluxFormField label={'Email address'}>
                                                    <FluxFormInput
                                                        value={row.email}
                                                        onValueChange={(next) =>
                                                            setAttendees((current) =>
                                                                current.map((item) =>
                                                                    item === row
                                                                        ? {
                                                                              ...item,
                                                                              email: String(
                                                                                  next ?? ''
                                                                              )
                                                                          }
                                                                        : item
                                                                )
                                                            )
                                                        }
                                                        autoComplete={'email'}
                                                        placeholder={'name@example.com'}
                                                        type={'email'}
                                                    ></FluxFormInput>
                                                </FluxFormField>
                                            </FluxFormColumn>
                                        </>
                                    )}
                                ></FluxFormRepeater>
                                {errors.attendees ? (
                                    <FluxText color={'danger'} role={'alert'} size={'small'}>
                                        {errors.attendees}
                                    </FluxText>
                                ) : null}
                            </FluxFormStep>
                        </FluxFormColumn>
                    </FluxPaneBody>
                    {savedSummary ? (
                        <FluxPaneBody>
                            <FluxNotice
                                color={'success'}
                                icon={'circle-check'}
                                message={savedSummary}
                            ></FluxNotice>
                        </FluxPaneBody>
                    ) : null}
                    <FluxPaneFooter>
                        <FluxSpacer></FluxSpacer>
                        <FluxPrimaryButton
                            iconLeading={'calendar-check'}
                            isSubmit
                            label={'Save visit'}
                        ></FluxPrimaryButton>
                    </FluxPaneFooter>
                </FluxForm>
            </FluxPane>
        </>
    );
}
