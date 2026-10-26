<template>
  <div class="w-full max-w-200 flex flex-col gap-6 px-5 md:px-30 lg:px-12 pt-3 md:pt-8 pb-6 md:pb-8 lg:pb-10">
    <div class="w-full flex flex-col items-start gap-3">
      <ButtonIconAction
        v-if="backTo"
        :to="backTo"
        icon="material-symbols:keyboard-arrow-left-rounded"
        :label="t('common.back')"
      />
      <h1 class="text-morado text-[22px] lg:text-3xl font-bold text-balance">
        {{ t('install.title') }}
      </h1>
    </div>

    <section v-for="guide in t('install.guides')" :key="guide.title" class="w-full flex flex-col gap-3">
      <h2 class="text-morado text-base font-semibold">{{ guide.title }}</h2>
      <ol class="w-full flex flex-col list-decimal text-morado text-xs md:text-sm font-medium pl-4.5">
        <li v-for="(step, i) in guide.steps" :key="i">{{ step }}</li>
      </ol>
    </section>

    <Help />
  </div>
</template>

<script setup>
defineProps({
  backTo: { type: String, default: '' }
})

const { t } = useLocale()
</script>
