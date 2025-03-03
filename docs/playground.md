<script lang="ts" setup>
import { FluxBoxedIcon, FluxButtonGroup, FluxCheckbox, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxNotice, FluxPane, FluxPaneBody, FluxPaneDeck, FluxPaneFooter, FluxPaneHeader, FluxProgressBar, FluxFormPinInput, FluxQuantitySelector, FluxSecondaryButton, FluxStack, FluxToggle } from '@basmilius/flux';
</script>

# Playground

## Progress bar

<Preview>
    <FluxPane>
        <FluxPaneBody>
            <FluxProgressBar :value=".5"/><br>
            <FluxProgressBar :value="1"/>
        </FluxPaneBody>
    </FluxPane>
</Preview>

## Pane deck

<Preview>
    <FluxPaneDeck>
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
    </FluxPaneDeck>
</Preview>

## Notice in pane

<Preview>
    <FluxPane variant="flat">
        <FluxPaneHeader title="Pane"/>
        <FluxNotice variant="warning" icon="circle-check" message="Lorem ipsum dolor sit amet." is-fluid #end>
            <FluxSecondaryButton label="More info"/>
        </FluxNotice>
        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.
        </FluxPaneBody>
    </FluxPane>
</Preview>

## Notice

<Preview>
    <FluxPane variant="flat">
        <FluxPaneBody>
            <FluxStack :gap="15">
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." #end>
                    <FluxSecondaryButton label="Do something"/>
                </FluxNotice>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." is-closeable/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." is-closeable is-loading/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet."/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." variant="primary"/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." variant="danger"/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." variant="info"/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." variant="success"/>
                <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." variant="warning"/>
            </FluxStack>
        </FluxPaneBody>
    </FluxPane>
</Preview>

## Boxed icon

<FluxPane variant="flat">
    <FluxPaneBody>
        <FluxStack direction="horizontal">
            <FluxBoxedIcon :size="54" variant="rocket"/>
            <FluxBoxedIcon color="gray" :size="54" variant="rocket"/>
            <FluxBoxedIcon color="primary" :size="54" variant="rocket"/>
            <FluxBoxedIcon color="danger" :size="54" variant="rocket"/>
            <FluxBoxedIcon color="info" :size="54" variant="rocket"/>
            <FluxBoxedIcon color="success" :size="54" variant="rocket"/>
            <FluxBoxedIcon color="warning" :size="54" variant="rocket"/>
        </FluxStack>
    </FluxPaneBody>
</FluxPane>

## Toggle

<FluxPane variant="flat">
    <FluxPaneBody>
        <FluxToggle/>
    </FluxPaneBody>
</FluxPane>

## PIN input

<FluxPane variant="flat">
    <FluxPaneBody>
        <FluxFormPinInput/>
    </FluxPaneBody>
</FluxPane>

## Quantity selector

<FluxPane variant="flat">
    <FluxPaneBody>
        <FluxQuantitySelector/>
    </FluxPaneBody>
</FluxPane>

## Checkbox

<FluxPane variant="flat">
    <FluxPaneBody>
        <FluxCheckbox label="Checkbox"/>
    </FluxPaneBody>
</FluxPane>

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
