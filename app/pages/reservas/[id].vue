<template>
  <div class="w-full flex flex-col">
    <State :pending="pending" :error="error" :error-text="t('reserva.error')">
      <ReservaHero :reserva="reserva" @logout="signOut" />

      <div class="w-full max-w-300 flex flex-col gap-6 px-5 md:px-30 lg:px-8 py-6 md:py-9">
        <NuxtPage :reserva="reserva" />
      </div>
    </State>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { signOut } = useSession()
const { t, setLocale } = useLocale()

const { data: reserva, pending, error } = useReserva(route.params.id)

watch(() => reserva.value?.idioma, setLocale, { immediate: true })
</script>
