import { type ModelRef, type Ref, ref, unref, watch } from 'vue';

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

    watch(modelValue, value => {
        localValue.value = options.transformIn ? options.transformIn(value) : value;
    }, {immediate: true});

    watch(localValue, value => {
        unref(flyoutRef)?.close();

        if (options.compareKey && options.compareKey(modelValue.value) === options.compareKey(value)) {
            return;
        }

        modelValue.value = value;
    });

    return localValue;
}
