<template>
    <FluxTypography>
        <h3>Unordered list</h3>
        <ul>
            <li>Espresso, the concentrated base for most drinks.
                <ul>
                    <li>Ristretto</li>
                    <li>Lungo</li>
                </ul>
            </li>
            <li>Filter, brewed slowly for a lighter body.</li>
            <li>Cold brew, steeped for many hours.</li>
        </ul>

        <h3>Ordered list</h3>
        <ol>
            <li>Grind the beans just before brewing.</li>
            <li>Rinse the filter and preheat the cup.</li>
            <li>Pour in slow, steady circles.</li>
        </ol>
    </FluxTypography>
</template>

<script
    lang="ts"
    setup>
    import { FluxTypography } from '@flux-ui/components';
</script>
