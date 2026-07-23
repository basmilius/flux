<template>
    <FluxProse>
        <h3>Styled table</h3>
        <p>A bare table inside Prose gets prose borders and padding.</p>
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
        <p>Wrapped in Prose Reset, the same markup keeps its own styling but still flows in the rhythm.</p>
        <FluxProseReset>
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
        </FluxProseReset>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxProse, FluxProseReset } from '@flux-ui/components';
</script>
