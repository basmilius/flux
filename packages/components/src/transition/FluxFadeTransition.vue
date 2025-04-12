<template>
    <Transition
        :mode="mode"
        :enter-active-class="$style.fadeTransitionEnterActive"
        :enter-from-class="$style.fadeTransitionEnterFrom"
        :enter-to-class="$style.fadeTransitionEnterTo"
        :leave-active-class="$style.fadeTransitionLeaveActive"
        :leave-from-class="$style.fadeTransitionLeaveFrom"
        :leave-to-class="$style.fadeTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Transition.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly mode?: 'in-out' | 'out-in';
    }>();
</script>
