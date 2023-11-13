<template>
    <flux-action-pane>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        <p>Atque beatae maxime numquam perferendis reprehenderit, repudiandae sit veritatis. Cum facilis laborum natus optio quo quod quos similique vitae! Corporis cupiditate ducimus earum molestiae possimus ut vero. Cum, itaque, nam.</p>
        <p>Aut cum cumque dicta doloribus eaque error esse eveniet explicabo fugiat id, ipsa labore laboriosam maxime modi molestias, necessitatibus neque optio quam quas quasi quia quos reiciendis rem repudiandae soluta.</p>

        <template #buttons>
            <flux-primary-button label="Activate"/>
            <flux-secondary-button label="Keep disabled"/>
        </template>
    </flux-action-pane>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { FluxActionPane, FluxPrimaryButton, FluxSecondaryButton } from '@fancee/flux';
</script>
