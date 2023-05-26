<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <!-- component with nested async dependencies -->
    <main>
      <RouterView />
    </main>

    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  
</template>