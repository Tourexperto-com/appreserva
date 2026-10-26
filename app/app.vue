<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale } = useLocale()

useHead({ htmlAttrs: { lang: computed(() => DATE_LOCALES[locale.value]) } })
</script>
