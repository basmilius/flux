<script lang="ts" setup>
import {
    FluxBoxedIcon,
    FluxButtonGroup,
    FluxCheckbox,
    FluxFormInput,
    FluxFormInputAddition,
    FluxFormInputGroup,
    FluxNotice,
    FluxPane,
    FluxPaneBody,
    FluxPaneDeck,
    FluxPaneFooter,
    FluxPaneHeader,
    FluxProgressBar,
    FluxFormPinInput,
    FluxQuantitySelector,
    FluxSecondaryButton,
    FluxSegmentedControl,
    FluxStack,
    FluxTabBar,
    FluxTabBarItem,
    FluxToggle
} from '@flux-ui/components';
</script>

# Playground

## Tab bar

<FluxView>
    <FluxTabBar>
        <FluxTabBarItem label="Invoices" is-active/>
        <FluxTabBarItem label="Quotes"/>
        <FluxTabBarItem label="Payment"/>
    </FluxTabBar>
</FluxView>

## Segmented control

<FluxView>
    <FluxSegmentedControl
        :items="[
            {icon: 'grid-2', label: 'Grid'},
            {icon: 'list', label: 'List'},
            {icon: 'rectangle-history', label: 'Stack'}
        ]"
        style="width: 390px"/>
</FluxView>

## Progress bar

<FluxView>
    <FluxStack :gap="15">
        <FluxProgressBar :value=".5"/>
        <FluxProgressBar :value="1"/>
    </FluxStack>
</FluxView>

## Pane deck

<FluxView>
    <FluxPaneDeck :min-column-width="240">
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
        <FluxPane><FluxPaneBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.</FluxPaneBody></FluxPane>
    </FluxPaneDeck>
</FluxView>

## Notice in pane

<FluxView>
    <FluxPane variant="flat">
        <FluxPaneHeader title="Pane"/>
        <FluxNotice color="warning" icon="circle-check" message="Lorem ipsum dolor sit amet." is-fluid #end>
            <FluxSecondaryButton label="More info"/>
        </FluxNotice>
        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, sapien eu tincidunt tincidunt, elit sapien ornare elit, quis efficitur libero ligula et massa.
        </FluxPaneBody>
    </FluxPane>
</FluxView>

## Notice

<FluxView>
    <FluxStack :gap="15">
        <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." #end>
            <FluxSecondaryButton label="Do something"/>
        </FluxNotice>
        <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." is-closeable/>
        <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet." is-closeable is-loading/>
        <FluxNotice icon="circle-check" message="Lorem ipsum dolor sit amet."/>
        <FluxNotice color="primary" icon="circle-check" message="Lorem ipsum dolor sit amet."/>
        <FluxNotice color="danger" icon="circle-check" message="Lorem ipsum dolor sit amet."/>
        <FluxNotice color="info" icon="circle-check" message="Lorem ipsum dolor sit amet."/>
        <FluxNotice color="success" icon="circle-check" message="Lorem ipsum dolor sit amet."/>
        <FluxNotice color="warning" icon="circle-check" message="Lorem ipsum dolor sit amet."/>
    </FluxStack>
</FluxView>

## Boxed icon

<FluxView>
    <FluxStack direction="horizontal" :gap="21">
        <FluxBoxedIcon  name="rocket" :size="54"/>
        <FluxBoxedIcon color="gray" name="rocket" :size="54"/>
        <FluxBoxedIcon color="primary" name="rocket" :size="54"/>
        <FluxBoxedIcon color="danger" name="rocket" :size="54"/>
        <FluxBoxedIcon color="info" name="rocket" :size="54"/>
        <FluxBoxedIcon color="success" name="rocket" :size="54"/>
        <FluxBoxedIcon color="warning" name="rocket" :size="54"/>
    </FluxStack>
</FluxView>

## Toggle

<FluxView>
    <FluxToggle/>
</FluxView>

## PIN input

<FluxView>
    <FluxFormPinInput/>
</FluxView>

## Quantity selector

<FluxView>
    <FluxQuantitySelector/>
</FluxView>

## Checkbox

<FluxView>
    <FluxCheckbox label="Checkbox"/>
</FluxView>

## Secondary input groups

<FluxView>
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
</FluxView>
