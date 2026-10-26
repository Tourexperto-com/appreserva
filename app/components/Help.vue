<template>
  <div class="w-full flex items-start lg:items-center gap-3 lg:gap-6 bg-gris-claro border border-violeta-2 rounded-[18px] shadow-card p-3 lg:px-5 lg:py-4">
    <div class="shrink-0 flex items-center justify-center size-8.5 lg:size-13 bg-magenta rounded-[10px]">
      <Icon name="material-symbols:headset-mic-outline-rounded" class="size-6! lg:size-7! text-white" />
    </div>
    <div class="min-w-0 flex-1 flex flex-col justify-center gap-0.5 lg:gap-2">
      <p class="text-morado text-sm lg:text-base font-bold">{{ t('help.title') }}</p>
      <p class="text-gris text-xs lg:text-sm font-medium">{{ t('help.text') }}</p>
    </div>
  </div>
</template>

<script setup>
const { t } = useLocale()
</script>
