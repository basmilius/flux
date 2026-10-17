import { type ComponentProps, useState } from 'react';
import {
    FluxForm,
    FluxFormField,
    FluxFormInput,
    FluxFormRepeater,
    FluxPane,
    FluxPaneBody,
    FluxPlaceholder
} from '@flux-ui/react';
export default function Example() {
    type Attendee = {
        email: string;
    };
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    function newAttendee(): Attendee {
        return { email: '' };
    }
    return (
        <>
            <FluxPane style={{ maxWidth: '480px' }}>
                <FluxForm>
                    <FluxPaneBody>
                        <FluxFormRepeater
                            value={attendees}
                            onValueChange={setAttendees}
                            addLabel={'Invite someone'}
                            rowLabel={'Attendee'}
                            newRow={newAttendee}
                            children={({ row }) => (
                                <>
                                    <FluxFormField label={'Email address'}>
                                        <FluxFormInput
                                            value={row.email}
                                            onValueChange={(next) =>
                                                setAttendees((current) =>
                                                    current.map((item) =>
                                                        item === row
                                                            ? { ...item, email: String(next ?? '') }
                                                            : item
                                                    )
                                                )
                                            }
                                            type={'email'}
                                            placeholder={'E.g. john@example.com'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                </>
                            )}
                            empty={
                                <>
                                    <FluxPlaceholder
                                        icon={'user-plus'}
                                        title={'No attendees yet'}
                                        message={
                                            'Invite the people who should receive the meeting notes.'
                                        }
                                        variant={'simple'}
                                    ></FluxPlaceholder>
                                </>
                            }
                        ></FluxFormRepeater>
                    </FluxPaneBody>
                </FluxForm>
            </FluxPane>
        </>
    );
}
