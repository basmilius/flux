<template>
    <FluxComment
        avatar-fallback="neutral"
        avatar-fallback-icon="gear"
        posted-by="System"
        :posted-on="postedOn"
        is-received>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus earum sed tenetur. Amet at dicta explicabo facere, fuga id itaque nisi quam quisquam tempore. Alias asperiores ea odio perspiciatis?
    </FluxComment>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { onMounted, shallowRef } from 'vue';

    // These docs are prerendered, so a timestamp taken during the build would not
    // survive hydration. The browser resolves it once it takes over.
    const postedOn = shallowRef<DateTime>();

    onMounted(() => {
        postedOn.value = DateTime.now().minus({seconds: 45});
    });
</script>
