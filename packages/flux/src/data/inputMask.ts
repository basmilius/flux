import type { InputMask } from 'imask';
import imask from 'imask/holder';

import 'imask/masked/pattern';

function bic(element: HTMLInputElement): InputMask<{}> {
    return imask(element, {
        definitions: {
            '#': /[A-Z0-9]/
        },
        mask: 'aaaaaa##[000]',
        prepareChar: (str: string) => str.toUpperCase()
    });
}

function iban(element: HTMLInputElement): InputMask<{}> {
    return imask(element, {
        definitions: {
            '#': /[A-Z0-9]/
        },
        mask: 'aa00 #### 0000 0000[ 0000 0000 0000 0000]',
        prepareChar: (str: string) => str.toUpperCase()
    });
}

function vat(element: HTMLInputElement): InputMask<{}> {
    return imask(element, {
        definitions: {
            '#': /[A-Z0-9]/
        },
        mask: 'aa########[#####]',
        prepareChar: (str: string) => str.toUpperCase()
    });
}

export type {
    InputMask
};

export type Masks =
    | 'bic'
    | 'iban'
    | 'vat';

export default {
    bic,
    iban,
    vat
};
