<template>
    <div
        class="theme-toggle"
        :class="{'is-dark': darkMode}">
        <flux-toggle
            v-model="darkMode"
            class="theme-toggle-toggle"/>

        <flux-icon
            class="theme-toggle-icon theme-toggle-icon-light"
            :size="16"
            variant="sun-alt"/>

        <flux-icon
            class="theme-toggle-icon theme-toggle-icon-dark"
            :size="16"
            variant="moon"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxToggle } from '@fancee/flux';
    import { onMounted, ref, watch } from 'vue';

    const darkMode = ref(localStorage.getItem('flux_dark_mode') === '1');

    onMounted(() => updateAttribute());

    function addTransitions(): void {
        document.documentElement.classList.add('flux-docs-switching-theme');

        document.documentElement.addEventListener('transitionend', () => {
            document.documentElement.classList.remove('flux-docs-switching-theme');
        }, {once: true, passive: true});
    }

    function updateAttribute(): void {
        if (darkMode.value) {
            document.documentElement.setAttribute('dark', 'dark');
        } else {
            document.documentElement.removeAttribute('dark');
        }
    }

    watch(darkMode, darkMode => {
        localStorage.setItem('flux_darkMode', darkMode ? '1' : '0');

        addTransitions();
        updateAttribute();
    });
</script>

<style lang="scss">
    .flux-docs-switching-theme {
        &,
        *,
        *::before,
        *::after {
            transition: 420ms var(--swift-out) !important;
            transition-delay: 0ms !important;
            transition-property: all !important;
        }
    }
</style>

<style
    lang="scss"
    scoped>
    .theme-toggle {
        position: relative;
        height: 30px;

        &-icon {
            position: absolute;
            top: 50%;
            pointer-events: none;
            transition: 210ms var(--swift-out);
            transition-property: opacity, scale, translate;
            translate: -50% -50%;

            &-dark {
                left: 39px;
                color: #06aed4;
            }

            &-light {
                left: 15px;
                color: #eaaa08;
            }
        }

        &-toggle {
            margin: 0;
            height: 30px;
            width: 54px;
            border-radius: 15px;

            &::after {
                height: 24px;
                width: 24px;
                border-radius: 12px;
            }

            &:checked {
                background: rgb(var(--gray-5));

                &::after {
                    background: rgb(var(--gray-0));
                    border: 1px solid rgb(var(--gray-5));
                    translate: 23px 0;
                }
            }
        }

        &.is-dark &-icon-dark,
        &:not(.is-dark) &-icon-light {
            opacity: 0;
            scale: .75
        }

        &.is-dark &-icon-dark {
            translate: calc(-50% - 6px) -50%;
        }

        &:not(.is-dark) &-icon-light {
            translate: calc(-50% + 6px) -50%;
        }
    }
</style>
