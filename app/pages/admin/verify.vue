<template>
  <div class="w-full flex flex-col gap-6">
    <template v-if="error">
      <p role="alert" class="text-error text-sm">{{ error }}</p>
      <ButtonPrimary to="/admin">
        Pedir otro link
      </ButtonPrimary>
    </template>

    <p v-else class="text-gris text-sm">Verificando acceso…</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

const { verifyStaff } = useAuth()
const route = useRoute()
const error = ref('')

const token = route.query.token

// El link se consume con esta llamada, no al abrir la URL: un escáner de mail que solo baja la página no lo gasta
if (!token) {
  error.value = 'Enlace inválido.'
} else {
  try {
    await verifyStaff(token)
    await navigateTo('/admin', { replace: true })
  } catch {
    error.value = 'El link venció, ya se usó o no es válido.'
  }
}
</script>
