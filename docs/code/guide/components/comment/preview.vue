<template>
    <Preview>
        <FluxStack>
            <FluxComment
                avatar-fallback="neutral"
                avatar-fallback-icon="gear"
                name="System">
                {{ incoming }}
            </FluxComment>

            <FluxComment
                avatar-fallback-icon="user"
                is-flipped
                is-received
                name="You">
                {{ outgoing }}
            </FluxComment>
        </FluxStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment, FluxStack } from '@basmilius/flux';
    import { faker } from '@faker-js/faker';

    const incoming = faker.lorem.sentences(2);
    const outgoing = faker.lorem.sentences(3);
</script>
