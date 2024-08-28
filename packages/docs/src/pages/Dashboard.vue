<template>
    <FluxDashboard :class="$style.dashboard">
        <template #header>
            <FluxDashboardHeader title="Buyers">
                <template #start>
                    <FluxIcon variant="user"/>
                </template>

                <template #end>
                    <FluxPrimaryButton
                        icon-before="circle-plus"
                        label="Event"/>
                </template>
            </FluxDashboardHeader>
        </template>

        <template #navigation>
            <FluxDashboardNavigation>
                <template #logo>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 480 480">
                        <path
                            fill="#fff"
                            d="m170.928 209.823-30.626 4.996 4.403 26.945 30.626-4.996c8.266-1.348 12.494-7.869 11.205-15.755-1.228-7.514-7.342-12.539-15.608-11.19ZM153.044 292.792l31.485-5.136c9.293-1.516 13.87-8.13 12.432-16.929-1.258-7.699-7.502-13.458-17.141-11.886l-31.485 5.136 4.709 28.815Z"/>
                        <path
                            fill="#fff"
                            fill-rule="evenodd"
                            d="m130.362 65.433 159.464-26.012c58.714-9.577 114.089 30.263 123.685 88.986l26.062 159.491c9.596 58.723-30.221 114.091-88.935 123.669l-159.464 26.012c-58.714 9.577-114.089-30.263-123.685-88.986L41.427 189.102C31.83 130.379 71.648 75.011 130.362 65.433Zm80.416 147.141c2.517 15.399-4.753 27.129-15.207 31.281 12.546.018 24.429 11.07 26.946 26.47 2.995 18.332-6.143 34.878-27.998 38.443l-49.39 8.057c-8.257 1.347-13.717-2.848-15.184-11.823l-15.458-94.596c-1.438-8.799 2.404-14.511 10.661-15.857l47.494-7.748c21.855-3.565 35.471 9.46 38.136 25.773Zm104.821-46.598a21.434 21.434 0 0 1 11.462-5.728 21.635 21.635 0 0 1 16.202 3.684 21.648 21.648 0 0 1 8.821 14.084l14.809 90.627a13.32 13.32 0 0 1-11.049 14.951 13.324 13.324 0 0 1-15.236-10.664l-12.471-76.316-19.446 90.001a7.597 7.597 0 0 1-6.206 5.903 7.608 7.608 0 0 1-7.764-3.624l-47.096-79.147 12.471 76.316a13.221 13.221 0 0 1-10.779 15.131 13.473 13.473 0 0 1-15.364-10.866l-14.814-90.653a21.671 21.671 0 0 1 14.139-23.798 21.671 21.671 0 0 1 25.995 9.528l35.424 59.764 14.755-67.949a21.438 21.438 0 0 1 6.147-11.244Z"
                            clip-rule="evenodd"/>
                    </svg>
                </template>

                <FluxMenu>
                    <FluxTooltip
                        axis="horizontal"
                        content="Home">
                        <FluxMenuItem
                            icon-before="grid-2"
                            label="Home"/>
                    </FluxTooltip>

                    <FluxDivider/>

                    <FluxMenuItem
                        icon-before="user"
                        label="Buyers"/>

                    <FluxMenuItem
                        icon-before="shopping-bag"
                        label="Shops"/>

                    <FluxSpacer/>

                    <FluxDivider/>

                    <FluxMenuItem
                        icon-before="gear"
                        label="Settings"/>
                </FluxMenu>
            </FluxDashboardNavigation>
        </template>

        <template #side>
            <FluxDashboardSide title="Filter">
                <template #top-bar-start>
                    <FluxIcon variant="filter"/>
                </template>

                <template #top-bar-end>
                    <FluxSecondaryButton icon-before="trash"/>
                </template>

                <div style="padding: 0 30px 30px">
                    <p v-for="_ of 10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore ducimus, et possimus praesentium soluta tempora? Blanditiis, dolorem ducimus, eius et inventore ipsam magni maiores, obcaecati officia quam ratione ut?</p>
                </div>
            </FluxDashboardSide>
        </template>

        <FluxPane style="margin: 0 30px 30px">
            <FluxPaneBody v-for="_ of 15">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, animi aspernatur earum eligendi enim exercitationem expedita, incidunt iusto mollitia neque officiis pariatur quod recusandae repellat sit. Cum nesciunt numquam voluptas!</p>
                <p>A ab accusamus deserunt dicta dolore explicabo minima minus quos, sapiente sunt? Aperiam architecto commodi consectetur debitis eius eligendi eum ex illum, laboriosam odit quaerat ratione repellendus reprehenderit, saepe voluptatibus!</p>
                <p>Aliquid, quam quia quos repellendus sint ut voluptate? A adipisci animi, consequatur delectus distinctio dolor doloremque dolores ea eaque eum fugiat fugit iusto nobis obcaecati repellendus ullam veritatis, vero? Deserunt?</p>
            </FluxPaneBody>
        </FluxPane>
    </FluxDashboard>
</template>

<script
    lang="ts"
    setup>
    import { FluxDashboard, FluxDashboardHeader, FluxDashboardNavigation, FluxDashboardSide, FluxDivider, FluxIcon, FluxMenu, FluxMenuItem, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxTooltip } from '@basmilius/flux';
</script>

<style
    lang="scss"
    module>
    //@use 'sass:color';
    //
    //@function to-rgb($hex) {
    //    @return color.red($hex) color.green($hex) color.blue($hex);
    //}
    //
    //.dashboard {
    //    --primary-0: #{to-rgb(#ffffff)};
    //    --primary-1: #{to-rgb(#fdf2f8)};
    //    --primary-2: #{to-rgb(#fce7f4)};
    //    --primary-3: #{to-rgb(#fbcfe9)};
    //    --primary-4: #{to-rgb(#f8a9d6)};
    //    --primary-5: #{to-rgb(#f373ba)};
    //    --primary-6: #{to-rgb(#ea4a9e)};
    //    --primary-7: #{to-rgb(#d9297c)};
    //    --primary-8: #{to-rgb(#bc1a62)};
    //    --primary-9: #{to-rgb(#a51a56)};
    //    --primary-10: #{to-rgb(#821946)};
    //    --primary-11: #{to-rgb(#4f0826)};
    //}
</style>
