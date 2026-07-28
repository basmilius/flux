<template>
    <FluxFlex
        align="center"
        :gap="9">
        <FluxHoverCard
            v-for="person of people"
            :key="person.name"
            :label="person.name">
            <template #opener>
                <FluxPersona
                    :avatar-fallback-initials="person.initials"
                    :avatar-size="36"
                    :avatar-src="person.avatar"
                    is-compact
                    :name="person.name"/>
            </template>

            <FluxPersona
                :avatar-fallback-initials="person.initials"
                :avatar-size="42"
                :avatar-src="person.avatar"
                :name="person.name"
                :title="person.title"/>

            <FluxText
                color="muted"
                size="small">
                {{ person.bio }}
            </FluxText>

            <FluxSeparator/>

            <FluxFlex
                align="center"
                :gap="6">
                <FluxIcon
                    name="location-dot"
                    :size="14"/>

                <FluxText
                    color="muted"
                    size="small">
                    {{ person.location }}
                </FluxText>
            </FluxFlex>
        </FluxHoverCard>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxHoverCard, FluxIcon, FluxPersona, FluxSeparator, FluxText } from '@flux-ui/components';

    const people = [
        {
            name: 'Bas Milius',
            initials: 'BM',
            title: 'Flux engineer',
            bio: 'Builds design systems and cares a little too much about a 3px grid.',
            avatar: 'https://avatars.githubusercontent.com/u/978257?v=4',
            location: 'Groenlo, The Netherlands'
        },
        {
            name: 'Jane Doe',
            initials: 'JD',
            title: 'Product designer',
            bio: 'Turns half-finished ideas into flows people actually finish.',
            avatar: undefined,
            location: 'Berlin, Germany'
        },
        {
            name: 'John Doe',
            initials: 'JD',
            title: 'Accessibility lead',
            bio: 'Reviews every component with a screen reader before it ships.',
            avatar: undefined,
            location: 'Lisbon, Portugal'
        }
    ];
</script>
