<template>
    <FluxTypography>
        <h3>Styled table</h3>
        <p>A bare table inside Typography gets prose borders and padding.</p>
        <table>
            <tbody>
                <tr>
                    <td>Light</td>
                    <td>Delicate</td>
                </tr>
                <tr>
                    <td>Dark</td>
                    <td>Full</td>
                </tr>
            </tbody>
        </table>

        <h3>Reset table</h3>
        <p>Wrapped in Typography Reset, the same markup keeps its own styling but still flows in the rhythm.</p>
        <FluxTypographyReset>
            <table>
                <tbody>
                    <tr>
                        <td>Light</td>
                        <td>Delicate</td>
                    </tr>
                    <tr>
                        <td>Dark</td>
                        <td>Full</td>
                    </tr>
                </tbody>
            </table>
        </FluxTypographyReset>
    </FluxTypography>
</template>

<script
    lang="ts"
    setup>
    import { FluxTypography, FluxTypographyReset } from '@flux-ui/components';
</script>
