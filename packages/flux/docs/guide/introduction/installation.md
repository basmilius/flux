<script setup>
import { FluxDatePicker, FluxPrimaryButton } from '@basmilius/flux';
</script>

# Installation

Flux is a Vue component library that can be used with Vue 3. Its flexibility makes it an ideal solution for developers looking to streamline the process of building consistent and intuitive user interfaces. Flux offers a variety of pre-built components that can be easily integrated into your Vue application, saving you time and effort. Whether you're starting a new project or migrating an existing one, Flux can help you achieve a high-quality user interface with ease.

1. Open your project's root directory in your terminal.

2. Run the following command to install Flux.
   ::: code-group
   
   ```shell [PNPM]
   pnpm install @basmilius/flux
   ```
   
   ```shell [Bun]
   bun add @basmilius/flux
   ```
   
   ```shell [Yarn]
   yarn add @basmilius/flux
   ```
   
   ```shell [NPM]
   npm install @basmilius/flux
   ```
   
   :::
   
3. Once the installation is complete add the following to your main.ts file.
   ```ts
   import '@basmilius/flux/style.css';
   ```
   
4. For setting up icons, please refer to [Font Awesome](./font-awesome).
   
5. Import the components you want to use, like this:
   ```vue
   <template>
       <FluxPane> // [!code focus:5]
           <FluxSecondaryButton
               href="https://flux.bas.dev"
               label="Button"/>
       </FluxPane>
   </template>
   
   <script
       lang="ts"
       setup>
       import { FluxPane, FluxSecondaryButton } from '@basmilius/flux'; // [!code focus]
   </script>
   ```
