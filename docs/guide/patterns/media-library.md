# Media library

A media library turns a pile of uploads into a browsable, editable collection: a responsive grid of thumbnails, drop-to-upload with live progress, and per-asset cropping. This recipe combines the gallery, drop zone and focal-point components into one screen.

::: render
render=../../code/guide/patterns/media-library/preview.vue
:::

Each asset is a `FluxAspectRatio` thumbnail with a `FluxBadgeStack` overlaying its type and a `FluxRemove` button in the corner — the badges and the remove control never nest inside one another. A trailing `FluxGallery` shows recently imported items using the built-in `FluxGalleryItem` grid.

## Examples

::: example Upload queue || A `FluxDropZone` accepting multiple images, followed by an upload list mixing `FluxProgressBar` rows with a `FluxSkeleton` placeholder for a still-processing file. The trailing `FluxClickablePane` opens the file picker — a single clickable target with no nested controls.
example=../../code/guide/patterns/media-library/upload.vue
:::

::: example Focal point editor || A `FluxFocalPointEditor` bound to a live `FluxFocalPointImage` thumbnail. Drag the focal point and open an enlarged `FluxOverlay` preview to see the crop applied at a larger size.
example=../../code/guide/patterns/media-library/editor.vue
:::

## Used components

`FluxGallery`, `FluxGalleryItem`, `FluxFocalPointEditor`, `FluxFocalPointImage`, `FluxAspectRatio`, `FluxDropZone`, `FluxPlaceholder`, `FluxOverlay`, `FluxRemove`, `FluxBadge`, `FluxBadgeStack`, `FluxGrid`, `FluxGridColumn`, `FluxFlex`, `FluxSkeleton`, `FluxProgressBar`, `FluxClickablePane`, `FluxItem`, `FluxItemStack`, `FluxItemMedia`, `FluxItemContent`, `FluxItemActions`, `FluxAction`, `FluxBoxedIcon`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`, `FluxPrimaryButton`, `FluxSecondaryButton`, `FluxIcon`, `FluxSpacing`.
