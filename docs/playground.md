<script lang="ts" setup>
import {
    FluxAction,
    FluxBoxedIcon,
    FluxButtonGroup,
    FluxCheckbox,
    FluxFormInput,
    FluxFormInputAddition,
    FluxFormInputGroup,
    FluxFormSelect,
    FluxGallery,
    FluxGalleryItem,
    FluxInfo,
    FluxInfoStack,
    FluxNotice,
    FluxOverlay,
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
    FluxSeparator,
    FluxSpacer,
    FluxSpinner,
    FluxStack,
    FluxStatistic,
    FluxTabBar,
    FluxTabBarItem,
    FluxTimeline,
    FluxTimelineItem,
    FluxToggle,
    FluxToolbar,
    FluxToolbarGroup,
    FluxTooltip
} from '@flux-ui/components';
import { ref } from 'vue';

const isOverlayOpen = ref(false);
const isOverlay2Open = ref(false);
</script>

# Playground

## Overlay

<FluxView>
    <FluxSecondaryButton label="Open" @click="isOverlayOpen = true"/>
    <FluxSecondaryButton label="Open 2" @click="isOverlay2Open = true"/>
    <FluxOverlay is-closeable @close="isOverlayOpen = false">
        <FluxPane v-if="isOverlayOpen">
            <FluxPaneBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt enim error, harum impedit in inventore ipsa ipsam itaque minus necessitatibus nesciunt nihil nulla officia qui repudiandae unde voluptates. Dolore, fuga.</p>
                <p>Ad architecto, atque eaque enim, expedita maiores mollitia obcaecati possimus quibusdam, rem repellat sit voluptatem? Aperiam commodi expedita harum in ipsa labore laudantium nam nemo, pariatur quisquam ratione repudiandae sapiente.</p>
            </FluxPaneBody>
            <FluxPaneBody>
                <FluxFormSelect :options="[{label: 'Één blok', value: 1}, {label: 'Twee blokken', value: 2}, {label: 'Drie blokken', value: 3}]"/>
            </FluxPaneBody>
            <FluxPaneFooter>
                <FluxSecondaryButton label="Close" @click="isOverlayOpen = false"/>
                <FluxSecondaryButton label="Open 2" @click="isOverlay2Open = true"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
    <FluxOverlay is-closeable @close="isOverlay2Open = false">
        <FluxPane v-if="isOverlay2Open">
            <FluxPaneBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim excepturi illum possimus quo quod sequi suscipit temporibus ullam voluptate. Dolorum eaque, sint. Consequuntur delectus, eius fugit officiis provident quia quis.</p>
            </FluxPaneBody>
            <FluxPaneFooter>
                <FluxSecondaryButton label="Close" @click="isOverlay2Open = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</FluxView>

## Tooltip

<FluxView>
    <FluxStack direction="horizontal" :gap="15">
        <FluxTooltip content="Tooltip content">
            <FluxSecondaryButton label="Button"/>
        </FluxTooltip>
        <FluxTooltip>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam architecto aspernatur, commodi, deserunt dolorum eum expedita iusto maiores molestiae nihil non praesentium, quibusdam quisquam recusandae reprehenderit saepe sapiente vero.</p>
            </template>
            <FluxSecondaryButton label="Button"/>
        </FluxTooltip>
    </FluxStack>
</FluxView>

## Spinner

<FluxView>
    <FluxSpinner/>
</FluxView>

## Tab bar

<FluxView>
    <FluxTabBar>
        <FluxTabBarItem label="Invoices" is-active/>
        <FluxTabBarItem label="Quotes"/>
        <FluxTabBarItem label="Payment"/>
        <FluxTabBarItem v-for="num of 10" :label="`Tab ${num}`"/>
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

## Gallery

<FluxView>
    <FluxGallery is-editable>
        <FluxGalleryItem is-deletable url="/assets/demo/image-1.jpg" alt="Image 1"/>
        <FluxGalleryItem is-deletable url="/assets/demo/image-2.jpg" alt="Image 2"/>
        <FluxGalleryItem is-deletable url="/assets/demo/image-3.jpg" alt="Image 3"/>
        <FluxGalleryItem is-deletable url="/assets/demo/image-4.jpg" alt="Image 4"/>
        <FluxGalleryItem is-pending url="/assets/demo/image-5.jpg" alt="Image 5"/>
    </FluxGallery>
</FluxView>

## Info

<FluxView>
    <FluxInfoStack>
        <FluxInfo icon="square-dashed"><strong>Age</strong><br><span>18-30</span></FluxInfo>
    </FluxInfoStack>
</FluxView>

## Statistic

<FluxView>
    <FluxStack direction="horizontal" :gap="15">
        <FluxStatistic change-color="success" change-icon="square-dashed" change-value="13%" color="primary" direction="horizontal" icon="square-dashed" label="Sales" value="456"/>
        <FluxStatistic change-color="success" change-icon="square-dashed" change-value="13%" color="primary" direction="horizontal" icon="square-dashed" label="Customers" value="123"/>
    </FluxStack>
</FluxView>

## Timeline

<FluxView>
    <FluxTimeline>
        <FluxTimelineItem color="danger" icon="square-dashed" title="Timeline item" when="March 13, 2025">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, similique, voluptates! A aspernatur dolore, enim ipsa numquam rem repellat tempora voluptate. Aperiam autem delectus dolores laborum nesciunt officiis perspiciatis temporibus!</p>
        </FluxTimelineItem>
        <FluxTimelineItem color="gray" icon="square-dashed" title="Timeline item" when="March 13, 2025">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, similique, voluptates! A aspernatur dolore, enim ipsa numquam rem repellat tempora voluptate. Aperiam autem delectus dolores laborum nesciunt officiis perspiciatis temporibus!</p>
        </FluxTimelineItem>
        <FluxTimelineItem color="warning" icon="square-dashed" title="Timeline item" when="March 13, 2025">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, similique, voluptates! A aspernatur dolore, enim ipsa numquam rem repellat tempora voluptate. Aperiam autem delectus dolores laborum nesciunt officiis perspiciatis temporibus!</p>
        </FluxTimelineItem>
    </FluxTimeline>
</FluxView>

## Toolbar

<FluxView>
    <FluxPane>
        <FluxPaneHeader title="Content"/>
        <FluxToolbar>
            <FluxToolbarGroup>
                <FluxAction icon="square-dashed"/>
            </FluxToolbarGroup>
            <FluxSeparator direction="vertical"/>
            <FluxToolbarGroup>
                <FluxAction icon="square-dashed"/>
                <FluxAction icon="square-dashed"/>
                <FluxAction icon="square-dashed"/>
            </FluxToolbarGroup>
            <FluxSeparator direction="vertical"/>
            <FluxToolbarGroup>
                <FluxAction icon="square-dashed"/>
                <FluxAction icon="square-dashed"/>
            </FluxToolbarGroup>
            <FluxSeparator direction="vertical"/>
            <FluxToolbarGroup>
                <FluxAction icon="square-dashed" is-destructive/>
            </FluxToolbarGroup>
            <FluxSpacer/>
            <FluxToolbarGroup>
                <FluxAction icon="ellipsis-v"/>
            </FluxToolbarGroup>
        </FluxToolbar>
        <FluxPaneBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut culpa, dolorum eaque explicabo minus nobis perferendis quas, quod repudiandae sit sunt tempore! Aut blanditiis corporis dolorem nesciunt quis totam.</p>
        </FluxPaneBody>
    </FluxPane>
</FluxView>
