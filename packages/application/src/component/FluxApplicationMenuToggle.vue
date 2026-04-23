<template>
    <FluxMenuItem :class="$style.applicationMenuToggle">
        <template #before>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
                :class="$style.applicationMenuToggleIcon">
                <path
                    fill-rule="evenodd"
                    d="M0 15V3a3 3 0 0 1 3-3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a3.04 3.04 0 0 1-3-3M2 3a1 1 0 0 1 1-1h2v14H3a1 1 0 0 1-1-1z"
                    clip-rule="evenodd"/>

                <path d="M16 15V3a1 1 0 0 0-1-1h-5a1 1 0 0 1 0-2h5c1.63.04 3 1.33 3 3v12a3.07 3.07 0 0 1-3 3h-5a1 1 0 1 1 0-2h5a1 1 0 0 0 1-1"/>
            </svg>
        </template>
    </FluxMenuItem>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenuItem } from '@flux-ui/components';
    import $style from '../css/component/ApplicationMenu.module.scss';
</script>
