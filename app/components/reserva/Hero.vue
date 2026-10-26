<template>
  <div class="w-full h-45 md:h-65 lg:h-40 flex flex-col justify-between relative bg-gris-claro-2 overflow-hidden p-5 md:px-30 md:py-5 lg:p-8">
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="reserva.nombreprod"
      class="w-full h-full absolute inset-0 object-cover"
    />
    <div class="absolute inset-0 bg-linear-to-b from-[#666666]/40 to-black/40" aria-hidden="true" />

    <div class="flex items-center justify-between gap-3 relative">
      <ButtonIconAction
        to="/"
        icon="material-symbols:keyboard-arrow-left-rounded"
        :label="t('reserva.backToTrips')"
      />

      <div class="shrink-0 flex md:hidden items-center gap-2">
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

      <ReservaStatusPill :status="reserva.estado" class="hidden md:inline" />
    </div>

    <div class="flex flex-col items-start gap-2 relative">
      <ReservaStatusPill :status="reserva.estado" class="md:hidden" />
      <h1 class="text-white text-xl lg:text-3xl font-bold text-balance">
        {{ reserva.nombre_programa || reserva.nombreprod }}
      </h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reserva: { type: Object, required: true }
})

defineEmits(['logout'])

const { t } = useLocale()
const { imgSrc } = useImageUrl()

const image = computed(() => imgSrc(props.reserva.img, props.reserva.main_image))
</script>
