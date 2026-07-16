<script lang="ts">
    import { flattenVNodeTree, prefersReducedMotion } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { cloneVNode, defineComponent, Fragment, h, onBeforeUnmount, type PropType, ref, watch } from 'vue';
    import $style from '~flux/visuals/css/component/Attention.module.scss';

    type AttentionEffect = 'pulse' | 'shake' | 'bounce' | 'tada';

    export default defineComponent({
        inheritAttrs: false,
        props: {
            duration: {default: 700, type: Number},
            effect: {default: 'pulse', type: String as PropType<AttentionEffect>},
            trigger: {default: undefined, type: null as unknown as PropType<unknown>}
        },
        emits: {
            finished: () => true
        },
        setup(props, {attrs, emit, expose, slots}) {
            const EFFECT_CLASSES: Record<AttentionEffect, string> = {
                pulse: $style.pulse,
                shake: $style.shake,
                bounce: $style.bounce,
                tada: $style.tada
            };

            const isPlaying = ref(false);

            let restartFrame = 0;

            // Drop the effect class and re-add it two frames later so the animation
            // restarts cleanly, even when the same effect is played back to back.
            function play(): void {
                if (prefersReducedMotion()) {
                    emit('finished');
                    return;
                }

                cancelAnimationFrame(restartFrame);
                isPlaying.value = false;

                restartFrame = requestAnimationFrame(() => {
                    restartFrame = requestAnimationFrame(() => {
                        isPlaying.value = true;
                    });
                });
            }

            function onAnimationEnd(event: AnimationEvent): void {
                if (event.target !== event.currentTarget) {
                    return;
                }

                isPlaying.value = false;
                emit('finished');
            }

            watch(() => props.trigger, () => {
                play();
            });

            onBeforeUnmount(() => {
                cancelAnimationFrame(restartFrame);
            });

            expose({
                play
            });

            return () => h(
                Fragment,
                flattenVNodeTree(slots.default?.() ?? []).map(vnode => cloneVNode(vnode, {
                    ...attrs,
                    class: clsx(
                        attrs.class as string,
                        isPlaying.value && EFFECT_CLASSES[props.effect]
                    ),
                    style: {
                        '--attention-duration': props.duration
                    },
                    onAnimationend: onAnimationEnd
                }))
            );
        }
    });
</script>
