<template>
  <NuxtLink
    :to="`/reservas/${reserva.id}`"
    class="w-full flex flex-col rounded-[18px] shadow-card overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
  >
    <div class="w-full h-40 md:h-50 flex flex-col justify-between relative bg-gris-claro-2 p-3 md:p-6">
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="reserva.nombre_programa || reserva.nombreprod"
        class="w-full h-full absolute inset-0 object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-linear-to-b from-[#666666]/40 to-black/40" aria-hidden="true" />

      <ReservaStatusPill :status="reserva.estado" class="relative" />

      <div class="relative flex flex-col gap-0.5">
        <p class="text-white text-xl lg:text-[28px] font-bold text-balance">{{ reserva.nombre_programa || reserva.nombreprod }}</p>
        <p class="font-inter text-white text-xs lg:text-sm font-medium">{{ dateRange }}</p>
      </div>
    </div>

    <div class="w-full flex items-center justify-between gap-3 bg-gris-claro px-5 md:px-6 py-3 md:py-6 lg:p-6">
      <div class="min-w-0 flex flex-1 items-center lg:flex-col lg:items-start justify-between lg:justify-start gap-3">
        <span v-if="duration" class="flex items-center gap-2 font-inter text-gris text-xs lg:text-sm font-medium">
          <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="shrink-0 size-4! lg:size-5! text-morado" />
          {{ duration }}
        </span>

        <span v-if="reserva.cant_pasajeros" class="flex items-center gap-2 font-inter text-gris text-xs lg:text-sm font-medium">
          <Icon name="material-symbols:groups-outline-rounded" class="shrink-0 size-4! lg:size-5! text-morado" />
          {{ t('trips.pax', { n: reserva.cant_pasajeros }) }}
        </span>
      </div>

      <Icon name="material-symbols:keyboard-arrow-right-rounded" class="shrink-0 size-4! lg:size-6! text-morado" />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  reserva: { type: Object, required: true }
})

const { t } = useLocale()
const { imgSrc } = useImageUrl()

const image = computed(() => imgSrc(props.reserva.img, props.reserva.main_image))

const dateRange = computed(() => {
  const from = formatShortDate(props.reserva.fecha_salida)
  const to = formatShortDate(props.reserva.fecha_regreso)
  return from && to ? `${from} – ${to}` : from || to
})

const duration = computed(() => {
  const { duration_days: days, duration_nights: nights } = props.reserva
  if (!days) return ''
  return nights ? t('trips.daysNights', { days, nights }) : t('trips.days', { days })
})
</script>
