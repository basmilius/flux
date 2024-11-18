---
outline: deep

props:
    -   name: is-controlled
        description: Allows the group to be controlled through the is-opened prop of each expandable.
        type: boolean
        optional: true

slots:
    -   name: default
        description: Expandables that should be part of the group.
---

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxExpandableGroup, FluxPane } from '@basmilius/flux';
</script>

# Expandable group

This component groups multiple [Expandables](./expandable) together, allowing for collective control of their open and close states. It provides mechanisms to register, unregister, and close all expandable items within the group. The first item in an uncontrolled group opens by default.

<Preview>
    <FluxPane>
        <FluxExpandableGroup>
            <FluxExpandable label="First">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa debitis deleniti dignissimos dolorem ducimus earum error facilis, fugit hic modi nulla odit praesentium rerum voluptate. Ipsum neque quasi sint?
            </FluxExpandable>
            <FluxExpandable label="Second">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa debitis deleniti dignissimos dolorem ducimus earum error facilis, fugit hic modi nulla odit praesentium rerum voluptate. Ipsum neque quasi sint?
            </FluxExpandable>
            <FluxExpandable label="Last">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa debitis deleniti dignissimos dolorem ducimus earum error facilis, fugit hic modi nulla odit praesentium rerum voluptate. Ipsum neque quasi sint?
            </FluxExpandable>
        </FluxExpandableGroup>
    </FluxPane>
</Preview>

<FrontmatterDocs/>
