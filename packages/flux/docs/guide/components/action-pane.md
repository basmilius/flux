---
outline: deep

slots:
    - name: default
      description: The content of the action pane.

    - name: buttons
      description: The buttons of the action pane.
---

<script
    lang="ts"
    setup>
    import { FluxActionPane, FluxPrimaryButton, FluxSecondaryButton } from '@basmilius/flux';
</script>

# Action pane

An action pane highlights important actions or new features to the user.

<Preview>
    <FluxActionPane>
        <p>
            <strong>Premium</strong> &mdash; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias at beatae exercitationem explicabo fugiat laborum libero magnam nulla odio, officia quaerat similique, totam ullam voluptate! Ad eaque iste voluptatibus.
        </p>
        <template #buttons>
            <FluxPrimaryButton label="Upgrade now"/>
            <FluxSecondaryButton label="Dismiss"/>
        </template>
    </FluxActionPane>
</Preview>

<FrontmatterDocs/>

## Used components

- [Pane](./pane)
- [Stack](./layout/stack)
