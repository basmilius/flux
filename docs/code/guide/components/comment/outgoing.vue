<template>
    <FluxComment
        avatar-fallback-icon="user"
        posted-by="You"
        :posted-on="postedOn">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus earum sed tenetur. Amet at dicta explicabo facere, fuga id itaque nisi quam quisquam tempore. Alias asperiores ea odio perspiciatis?
    </FluxComment>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment } from '@flux-ui/flux';
    import { DateTime } from 'luxon';

    const postedOn = DateTime.now();
</script>
