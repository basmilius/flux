---
outline: deep

props:
    -   name: avatar-alt
        description: A brief description of the image that is shown.
        type: string
        optional: true

    -   name: avatar-fallback
        description: How the fallback to initials should look.
        type: [ '"colored"', '"neutral"' ]
        optional: true

    -   name: avatar-fallback-icon
        description: The icon that is used within the fallback.
        type: IconName
        optional: true

    -   name: avatar-fallback-initials
        description: The initials that are used for the fallback.
        type: string
        optional: true

    -   name: avatar-url
        description: The url to the image source that is used in the avatar.
        type: string
        optional: true

    -   name: is-flipped
        description: Flip the comment.
        type: boolean
        optional: true

    -   name: is-received
        description: Use a received appearance.
        type: boolean
        optional: true

    -   name: name
        description: The name of the comment's author.
        type: string

    -   name: period
        description: The period when the comment was created.
        type: string
        optional: true

slots:
    -   name: default
        description: The contents of the comment.
---

<script
    lang="ts"
    setup>
    import { FluxComment, FluxStack } from '@basmilius/flux';
</script>

# Comment

This component represents a user comment with support for customizable details such as the author's name, avatar, and optional time information. It includes a structured layout with an avatar, header, and message body, allowing additional content to be provided via a slot. Styles can adjust its appearance, such as flipping or differentiating received comments.

<Preview>
    <FluxStack>
        <FluxComment avatar-fallback="neutral" avatar-fallback-icon="gear" name="System">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus earum sed tenetur. Amet at dicta explicabo facere, fuga id itaque nisi quam quisquam tempore. Alias asperiores ea odio perspiciatis?    
        </FluxComment>
        <FluxComment avatar-fallback-icon="user" is-flipped is-received name="Agent">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus earum sed tenetur. Amet at dicta explicabo facere, fuga id itaque nisi quam quisquam tempore. Alias asperiores ea odio perspiciatis?    
        </FluxComment>
    </FluxStack>
</Preview>

<FrontmatterDocs/>

## Examples

## Used components

- [Avatar](./avatar)
