<template>
  <section class="w-full flex flex-col gap-3 lg:gap-4">
    <h2 class="text-morado text-base lg:text-xl font-bold">{{ t('datosTex.title') }}</h2>

    <div v-if="agente?.nombre" class="flex flex-col gap-1">
      <p class="flex items-center gap-2 lg:gap-3 text-morado text-xs lg:text-sm font-semibold">
        <Icon name="material-symbols:support-agent-rounded" size="16" class="shrink-0" />
        {{ t('datosTex.agent', { name: agente.nombre }) }}
      </p>
      <a
        v-if="agente.email"
        :href="`mailto:${agente.email}`"
        class="text-violeta-texto text-xs lg:text-sm font-medium hover:text-magenta transition-colors duration-200 pl-6"
      >
        {{ agente.email }}
      </a>
    </div>

    <p class="flex items-center gap-2 lg:gap-3 text-morado text-xs lg:text-sm font-semibold">
      <NuxtImg src="/images/icons/whatsapp-morado.svg" alt="" class="shrink-0 size-4" />
      {{ t('datosTex.whatsapp') }}
      <span class="font-inter text-violeta-texto font-medium">{{ t('datosTex.whatsappNumber') }}</span>
    </p>

    <div class="flex flex-col gap-1">
      <p class="flex items-center gap-2 lg:gap-3 text-morado text-xs lg:text-sm font-semibold">
        <Icon name="material-symbols:phone-in-talk-outline-rounded" size="16" class="shrink-0" />
        {{ t('datosTex.calls') }}
      </p>
      <ul class="flex flex-col gap-1 pl-6">
        <li v-for="tel in TELEFONOS" :key="tel.country" class="flex items-center gap-2">
          <span class="text-morado text-xs lg:text-sm font-semibold">{{ t(`datosTex.countries.${tel.country}`) }}</span>
          <a
            :href="`tel:${tel.numero}`"
            class="font-inter text-violeta-texto text-xs lg:text-sm font-medium hover:text-magenta transition-colors duration-200"
          >
            {{ tel.numero }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const TELEFONOS = [
  { country: 'argentina', numero: '+541152372827' },
  { country: 'brazil', numero: '+552120421626' },
  { country: 'chile', numero: '+56224053096' },
  { country: 'colombia', numero: '+576017702903' },
  { country: 'spain', numero: '+34910601755' },
  { country: 'usa', numero: '+13022087264' },
  { country: 'mexico', numero: '+525585262118' }
]

defineProps({
  agente: { type: Object, default: null }
})

const { t } = useLocale()
</script>
