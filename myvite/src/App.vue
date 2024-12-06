<script setup lang="ts">
import { useDisplayStore } from './stores/DisplayStore';
const displayStore = useDisplayStore()

</script>

<template>
  <component :is="displayStore.display"/>
</template>
