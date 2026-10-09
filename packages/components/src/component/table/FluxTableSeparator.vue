<template>
    <div
        :class="$style.tableRow"
        role="presentation">
        <div
            :class="$style.tableSeparator"
            aria-hidden="true"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/components/css/component/Table.module.scss';
</script>
