<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <p class="text-violeta-texto text-xs lg:text-base font-medium">
      {{ intro }}
    </p>

    <State
      :pending="pending"
      :error="error"
      :empty="!pasajeros?.length"
      :error-text="t('passengers.error')"
      :empty-text="t('passengers.empty')"
    >
      <ul class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
        <li v-for="(pasajero, i) in pasajeros" :key="pasajero.id || i">
          <Accordion v-model="open[i]">
            <template #summary>
              <span class="flex items-center gap-3 lg:gap-4">
                <Avatar :name="fullName(pasajero)" size="lg" />
                <span class="flex flex-col text-left">
                  <span class="text-morado text-base lg:text-xl font-bold">{{ fullName(pasajero) }}</span>
                  <span v-if="pasajero.genero" class="text-gris text-xs lg:text-sm font-medium">{{ pasajero.genero }}</span>
                </span>
              </span>
            </template>

            <dl class="w-full grid grid-cols-2 gap-3 pl-13">
              <div v-if="pasajero.nro_pasaporte" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">{{ t('passengers.passport') }}</dt>
                <dd class="font-inter text-morado text-sm lg:text-base font-medium">{{ pasajero.nro_pasaporte }}</dd>
              </div>
              <div v-if="pasajero.fecha_nacimiento" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">{{ t('passengers.birth') }}</dt>
                <dd class="font-inter text-morado text-sm lg:text-base font-medium">{{ formatFecha(pasajero.fecha_nacimiento) }}</dd>
              </div>
              <div v-if="pasajero.nacionalidad" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">{{ t('passengers.nationality') }}</dt>
                <dd class="text-morado text-sm lg:text-base font-semibold">{{ pasajero.nacionalidad }}</dd>
              </div>
              <div v-if="pasajero.genero" class="flex flex-col">
                <dt class="text-gris text-xs lg:text-sm font-medium">{{ t('passengers.gender') }}</dt>
                <dd class="text-morado text-sm lg:text-base font-semibold">{{ pasajero.genero }}</dd>
              </div>
            </dl>
          </Accordion>
        </li>
      </ul>
    </State>
  </div>
</template>

<script setup>
const route = useRoute()
const { t } = useLocale()

const { data: pasajeros, pending, error } = useReservaPasajeros(route.params.id)

const open = reactive({})

const intro = computed(() => {
  const total = pasajeros.value?.length || 0
  if (!total) return t('passengers.intro')
  return total === 1 ? t('passengers.introOne') : t('passengers.introMany', { n: total })
})

function fullName(pasajero) {
  return [pasajero.nombre, pasajero.apellido].filter(Boolean).join(' ')
}
</script>
