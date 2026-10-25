import { type ComponentProps, useState } from 'react';
import {
    FluxForm,
    FluxFormField,
    FluxFormInput,
    FluxFormRepeater,
    FluxPane,
    FluxPaneBody
} from '@flux-ui/react';
export default function Example() {
    type PhoneNumber = {
        number: string;
    };
    const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
        { number: '+31 6 1234 5678' }
    ]);
    function newPhoneNumber(): PhoneNumber {
        return { number: '' };
    }
    return (
        <>
            <FluxPane style={{ maxWidth: '480px' }}>
                <FluxForm>
                    <FluxPaneBody>
                        <FluxFormRepeater
                            value={phoneNumbers}
                            onValueChange={setPhoneNumbers}
                            addLabel={'Add phone number'}
                            max={3}
                            min={1}
                            rowLabel={'Phone number'}
                            newRow={newPhoneNumber}
                            children={({ index, row }) => (
                                <>
                                    <FluxFormField label={`Phone number ${index + 1}`}>
                                        <FluxFormInput
                                            value={row.number}
                                            onValueChange={(next) =>
                                                setPhoneNumbers((current) =>
                                                    current.map((item) =>
                                                        item === row
                                                            ? {
                                                                  ...item,
                                                                  number: String(next ?? '')
                                                              }
                                                            : item
                                                    )
                                                )
                                            }
                                            type={'tel'}
                                            placeholder={'E.g. +31 6 1234 5678'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                </>
                            )}
                        ></FluxFormRepeater>
                    </FluxPaneBody>
                </FluxForm>
            </FluxPane>
        </>
    );
}
