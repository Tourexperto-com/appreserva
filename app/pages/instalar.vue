<template>
  <NuxtLayout v-if="resolved && authenticated" name="default">
    <InstalarGuia back-to="/" />
  </NuxtLayout>

  <div v-else-if="resolved" class="min-h-dvh flex flex-col bg-white">
    <DefaultHeaderBack />
    <main class="flex-1 border-t border-gris-claro-2">
      <InstalarGuia />
    </main>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { authenticated, resolved } = useAuthStatus()
</script>
