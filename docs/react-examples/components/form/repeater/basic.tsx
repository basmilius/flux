import { type ComponentProps, useState } from 'react';
import {
    FluxForm,
    FluxFormField,
    FluxFormInput,
    FluxFormRepeater,
    FluxFormRow,
    FluxPane,
    FluxPaneBody
} from '@flux-ui/react';
export default function Example() {
    type Address = {
        street: string;
        postalCode: string;
        city: string;
    };
    const [addresses, setAddresses] = useState<Address[]>([
        { street: 'Main Street 1', postalCode: '1234 AB', city: 'Amsterdam' }
    ]);
    function newAddress(): Address {
        return { street: '', postalCode: '', city: '' };
    }
    return (
        <>
            <FluxPane style={{ maxWidth: '480px' }}>
                <FluxForm>
                    <FluxPaneBody>
                        <FluxFormRepeater
                            value={addresses}
                            onValueChange={setAddresses}
                            addLabel={'Add another address'}
                            rowLabel={'Address'}
                            newRow={newAddress}
                            children={({ row }) => (
                                <>
                                    <FluxFormField label={'Street'}>
                                        <FluxFormInput
                                            value={row.street}
                                            onValueChange={(next) =>
                                                setAddresses((current) =>
                                                    current.map((item) =>
                                                        item === row
                                                            ? {
                                                                  ...item,
                                                                  street: String(next ?? '')
                                                              }
                                                            : item
                                                    )
                                                )
                                            }
                                            placeholder={'E.g. Main Street 1'}
                                        ></FluxFormInput>
                                    </FluxFormField>
                                    <FluxFormRow>
                                        <FluxFormField label={'Postal code'}>
                                            <FluxFormInput
                                                value={row.postalCode}
                                                onValueChange={(next) =>
                                                    setAddresses((current) =>
                                                        current.map((item) =>
                                                            item === row
                                                                ? {
                                                                      ...item,
                                                                      postalCode: String(next ?? '')
                                                                  }
                                                                : item
                                                        )
                                                    )
                                                }
                                                placeholder={'E.g. 1234 AB'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                        <FluxFormField label={'City'}>
                                            <FluxFormInput
                                                value={row.city}
                                                onValueChange={(next) =>
                                                    setAddresses((current) =>
                                                        current.map((item) =>
                                                            item === row
                                                                ? {
                                                                      ...item,
                                                                      city: String(next ?? '')
                                                                  }
                                                                : item
                                                        )
                                                    )
                                                }
                                                placeholder={'E.g. Amsterdam'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                    </FluxFormRow>
                                </>
                            )}
                        ></FluxFormRepeater>
                    </FluxPaneBody>
                </FluxForm>
            </FluxPane>
        </>
    );
}
