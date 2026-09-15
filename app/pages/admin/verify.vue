<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15">
    <template v-if="error">
      <p role="alert" class="text-error text-sm">{{ error }}</p>
      <ButtonPrimary to="/admin">
        Pedir otro link
      </ButtonPrimary>
    </template>

    <template v-else>
      <p class="text-morado text-base lg:text-xl font-semibold">
        Entrá al panel de staff de Mis Reservas.
      </p>

      <ButtonPrimary :disabled="loading" @click="enter">
        {{ loading ? 'Verificando…' : 'Entrar al panel' }}
      </ButtonPrimary>
    </template>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

const { verifyStaff } = useAuth()
const route = useRoute()
const error = ref('')
const loading = ref(false)

const token = route.query.token
if (!token) error.value = 'Enlace inválido.'

// El link es de un solo uso y se canjea recién con el clic: un escáner de mail que abre la URL,
// aunque ejecute JS, no lo gasta salvo que además haga clic
async function enter() {
  loading.value = true

  try {
    await verifyStaff(token)
    await navigateTo('/admin', { replace: true })
  } catch {
    error.value = 'El link venció, ya se usó o no es válido.'
  } finally {
    loading.value = false
  }
}
</script>
