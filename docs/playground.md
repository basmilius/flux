<script lang="ts" setup>
import { FluxButtonGroup, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxPane, FluxPaneBody, FluxSecondaryButton, FluxStack } from '@basmilius/flux';
</script>

# Playground

## Secondary input groups

<FluxPane variant="flat">
    <FluxPaneBody>
        <FluxStack>
            <FluxFormInputGroup>
                <FluxFormInputAddition icon="magnifying-glass"/>
                <FluxFormInput placeholder="Zoek naar alles..."/>
                <FluxFormInputAddition label="⌥⌘F"/>
            </FluxFormInputGroup>
            <FluxFormInput placeholder="Zoek naar alles..."/>
            <FluxFormInputGroup>
                <FluxFormInputAddition icon="magnifying-glass"/>
                <FluxFormInput placeholder="Zoek naar alles..."/>
                <FluxButtonGroup>
                    <FluxSecondaryButton label="Zoek"/>
                </FluxButtonGroup>
            </FluxFormInputGroup>
            <FluxFormInputGroup is-secondary>
                <FluxFormInputAddition icon="magnifying-glass"/>
                <FluxFormInput placeholder="Zoek naar alles..."/>
                <FluxFormInputAddition label="⌥⌘F"/>
            </FluxFormInputGroup>
            <FluxFormInput is-secondary placeholder="Zoek naar alles..."/>
            <FluxFormInputGroup is-secondary>
                <FluxFormInputAddition icon="magnifying-glass"/>
                <FluxFormInput placeholder="Zoek naar alles..."/>
                <FluxButtonGroup>
                    <FluxSecondaryButton label="Zoek"/>
                </FluxButtonGroup>
            </FluxFormInputGroup>
        </FluxStack>
    </FluxPaneBody>
</FluxPane>
