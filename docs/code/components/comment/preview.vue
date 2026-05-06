<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="18">
            <FluxComment
                avatar-alt="Profile picture of Bas Milius"
                avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
                posted-by="Bas Milius"
                :posted-on="incomingPostedOn"
                is-received>
                {{ incoming }}
            </FluxComment>

            <FluxComment
                avatar-fallback-icon="user"
                posted-by="You"
                :posted-on="outgoingPostedOn">
                {{ outgoing }}
            </FluxComment>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment, FluxFlex } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { DateTime } from 'luxon';

    const incoming = faker.lorem.sentences(2);
    const outgoing = faker.lorem.sentences(3);

    const incomingPostedOn = DateTime.now().minus({minutes: 15});
    const outgoingPostedOn = DateTime.now();
</script>
