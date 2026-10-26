<template>
  <header class="w-full flex lg:hidden items-center justify-between gap-3 bg-white border-b border-gris-claro-2 p-5 md:px-30 md:py-8">
    <div class="min-w-0 flex items-center gap-3">
      <Avatar :name="name" size="lg" />
      <div class="min-w-0 flex flex-col">
        <span class="text-violeta-texto text-xs font-medium">{{ t('common.hello') }}</span>
        <span class="text-morado text-base font-bold truncate">{{ name }}</span>
      </div>
    </div>

    <div class="shrink-0 flex items-center gap-2">
      <ButtonIconAction
        to="/instalar"
        icon="material-symbols:info-outline-rounded"
        :label="t('common.howToInstall')"
      />
      <ButtonIconAction
        icon="material-symbols:logout-rounded"
        :label="t('common.logout')"
        @click="$emit('logout')"
      />
    </div>
  </header>
</template>

<script setup>
defineProps({
  name: { type: String, default: '' }
})

defineEmits(['logout'])

const { t } = useLocale()
</script>
