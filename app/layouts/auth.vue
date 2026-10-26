<template>
  <div class="min-h-dvh flex flex-col lg:flex-row bg-white">
    <div
      class="w-full lg:w-1/2 h-[52dvh] md:h-[69dvh] lg:h-dvh shrink-0 flex flex-col justify-between lg:justify-end relative bg-morado overflow-hidden px-5 md:px-30 py-6 md:py-15 lg:p-15">
      <NuxtImg src="/images/login-hero.jpg" alt="" class="w-full h-full absolute inset-0 object-cover"
        aria-hidden="true" />
      <div class="absolute inset-0 bg-[linear-gradient(21.77deg,#2E014A_34.86%,rgba(46,1,74,0)_89.28%)]"
        aria-hidden="true" />

      <ButtonIconAction
        to="/instalar"
        icon="material-symbols:info-outline-rounded"
        :label="t('auth.howToInstall')"
        class="self-start relative lg:hidden"
      />

      <div class="w-full flex flex-col gap-6 md:gap-12 relative">
        <NuxtImg src="/images/logo.svg" alt="Tour Experto" class="w-25 md:w-50" />
        <p class="text-white text-[22px] lg:text-[32px] font-bold text-balance">
          {{ t('auth.tagline') }}
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex-1 flex flex-col lg:justify-center px-5 md:px-30 lg:px-15 py-8 md:py-18.5 lg:py-0">
      <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useLocale()
</script>
