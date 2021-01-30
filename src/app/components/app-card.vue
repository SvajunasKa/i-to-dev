<template>
  <div class="app-card pt-4">
    <div class="font-bold text-base">
      <slot name="title"/>
    </div>
    <div class="text-sm">
      <slot/>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
name: "app-card"
})
</script>

<style scoped>

</style>