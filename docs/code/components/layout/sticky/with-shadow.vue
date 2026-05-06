<template>
    <div style="height: 240px; width: 100%; overflow: auto; border: 1px solid var(--surface-stroke); border-radius: 6px">
        <FluxSticky has-shadow-on-stick>
            <template #default="{ isStuck }">
                <div :style="{
                    padding: isStuck ? '6px 18px' : '18px',
                    background: 'var(--surface)',
                    fontWeight: isStuck ? 500 : 700,
                    fontSize: isStuck ? '14px' : '20px',
                    transition: 'all .15s var(--swift-out)'
                }">
                    {{ isStuck ? 'Stuck — condensed' : 'Scroll to condense me' }}
                </div>
            </template>
        </FluxSticky>

        <div style="padding: 18px">
            <p
                v-for="i in 18"
                :key="i">
                Body content {{ i }}.
            </p>
        </div>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxSticky } from '@flux-ui/components';
</script>
