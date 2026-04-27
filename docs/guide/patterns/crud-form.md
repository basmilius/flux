# CRUD form

A typical create/edit pattern: a list view, a router-driven overlay for the form, server-side validation surfaced as inline errors, and a save action that closes the overlay on success.

## Anatomy

The form lives behind a named route (see [Overlay → Router-driven](../components/overlay#router-driven)). The list view triggers it through `router.push`; the overlay reads the resource id from `route.params`.

```ts [router.ts]
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/projects',
        component: () => import('./views/Projects.vue'),
        children: [
            {
                name: 'projects-create',
                path: 'create',
                components: {
                    overlay: () => import('./views/ProjectsForm.vue')
                }
            },
            {
                name: 'projects-edit',
                path: ':id/edit',
                components: {
                    overlay: () => import('./views/ProjectsForm.vue')
                }
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
```

## Form component

`ProjectsForm.vue` reads the optional `id` from the route, fetches the resource on mount, and reuses the same shape for create and edit.

```vue [ProjectsForm.vue]
<template>
    <FluxPane>
        <FluxPaneHeader :title="isEdit ? 'Edit project' : 'New project'">
            <FluxSecondaryButton
                icon-leading="xmark"
                @click="close"/>
        </FluxPaneHeader>

        <FluxForm @submit="onSubmit">
            <FluxPaneBody>
                <FluxFormField
                    label="Name"
                    :error="errors.name">
                    <FluxFormInput
                        v-model="form.name"
                        auto-focus
                        placeholder="E.g. Aurora"/>
                </FluxFormField>

                <FluxFormField
                    label="Description"
                    :error="errors.description">
                    <FluxFormTextArea
                        v-model="form.description"
                        :rows="4"/>
                </FluxFormField>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"
                    @click="close"/>

                <FluxSpacer/>

                <FluxPrimaryButton
                    type="submit"
                    icon-leading="circle-check"
                    label="Save"
                    :is-loading="isSaving"/>
            </FluxPaneFooter>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import { computed, reactive, ref, watchEffect } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { fetchProject, saveProject } from './api';

    const route = useRoute();
    const router = useRouter();

    const id = computed(() => route.params.id as string | undefined);
    const isEdit = computed(() => id.value !== undefined);
    const isSaving = ref(false);

    const form = reactive({
        name: '',
        description: ''
    });

    const errors = reactive<Record<string, string | undefined>>({});

    watchEffect(async () => {
        if (!id.value) {
            return;
        }

        const project = await fetchProject(id.value);
        form.name = project.name;
        form.description = project.description;
    });

    function close(): void {
        router.back();
    }

    async function onSubmit(): Promise<void> {
        isSaving.value = true;

        try {
            const result = await saveProject(id.value, {...form});

            if (result.status === 'invalid') {
                Object.assign(errors, result.errors);
                return;
            }

            close();
        } finally {
            isSaving.value = false;
        }
    }
</script>
```

## Surface validation errors

`FluxFormField` accepts an `error` prop. Pass the server-side validation message there to render it inline below the input. When the field receives focus the error stays visible — the user has to change the value before it disappears.

The simplest approach is to keep an `errors` record indexed by field name and set it after a failed save. If you use a library such as Vuelidate or Zod, map their error output to that shape.

## Trigger the form

Open the form by pushing one of the named routes:

```ts
// New project
router.push({name: 'projects-create'});

// Edit existing project
router.push({name: 'projects-edit', params: {id: project.id}});
```

`router.back()` from inside the form closes the overlay and returns the user to the list view, keeping the URL in sync.
