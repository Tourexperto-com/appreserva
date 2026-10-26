<template>
  <header class="w-full flex items-center bg-white border-b border-gris-claro-2 p-5 md:px-30 md:py-8">
    <ButtonIconAction
      :to="to"
      icon="material-symbols:keyboard-arrow-left-rounded"
      :label="t('common.back')"
    />
  </header>
</template>

<script setup>
defineProps({
  to: { type: String, default: '/login' }
})

const { t } = useLocale()
</script>
