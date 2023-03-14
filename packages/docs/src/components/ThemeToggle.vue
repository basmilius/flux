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
    import { ref, watch } from 'vue';

    const darkMode = ref(localStorage.getItem('flux_darkMode') === '1');

    watch(darkMode, darkMode => {
        localStorage.setItem('flux_darkMode', darkMode ? '1' : '0');

        if (darkMode) {
            document.documentElement.setAttribute('dark', 'dark');
        } else {
            document.documentElement.removeAttribute('dark');
        }
    }, {immediate: true});
</script>

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
            transition-property: opacity, scale;
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
            scale: .5
        }
    }
</style>
