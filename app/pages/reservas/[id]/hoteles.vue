<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <p class="text-violeta-texto text-xs lg:text-base font-medium">
      {{ t('hotels.intro') }}
    </p>

    <State
      :pending="pending"
      :error="error"
      :empty="!hoteles?.length"
      :error-text="t('hotels.error')"
      :empty-text="t('hotels.empty')"
    >
      <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
        <Accordion
          v-for="(destino, i) in hoteles"
          :key="destino.ciudad || i"
          v-model="open[i]"
          :title="destino.ciudad"
        >
          <Row
            v-for="(hotel, j) in destino.alternativas"
            :key="hotel.nombre || j"
            icon="material-symbols:bed-outline-rounded"
            :title="hotel.nombre"
            :subtitle="hotel.estado || t('hotels.planned')"
          />
        </Accordion>
      </div>
    </State>
  </div>
</template>

<script setup>
const route = useRoute()
const { t } = useLocale()

const { data: hoteles, pending, error } = useReservaHoteles(route.params.id)

const open = reactive({})
</script>
