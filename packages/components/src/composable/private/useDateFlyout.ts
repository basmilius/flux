import { type ModelRef, ref, type Ref, unref, watch } from 'vue';

type FlyoutLike = {
    close(): void;
};

type UseDateFlyoutOptions<T> = {
    compareKey?(value: T | null): string | number | null | undefined;
    transformIn?(value: T | null): T | null;
};

export default function <T>(
    modelValue: ModelRef<T | null>,
    flyoutRef: Readonly<Ref<FlyoutLike | null>>,
    options: UseDateFlyoutOptions<T> = {}
): Ref<T | null> {
    const localValue = ref<T | null>(null) as Ref<T | null>;

    let isExternalUpdate = false;

    watch(localValue, value => {
        if (isExternalUpdate) {
            isExternalUpdate = false;
            return;
        }

        unref(flyoutRef)?.close();

        if (options.compareKey && options.compareKey(modelValue.value) === options.compareKey(value)) {
            return;
        }

        modelValue.value = value;
    });

    watch(modelValue, value => {
        const next = options.transformIn ? options.transformIn(value) : value;

        if (Object.is(next, unref(localValue))) {
            return;
        }

        isExternalUpdate = true;
        localValue.value = next;
    }, {immediate: true});

    return localValue;
}
