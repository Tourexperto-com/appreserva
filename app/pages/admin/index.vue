<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15">
    <template v-if="staffEmail">
      <p class="text-morado text-base lg:text-xl font-semibold">
        Buscá un cliente para ver la app tal como la ve él.
      </p>

      <form class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15" @submit.prevent="openAsClient">
        <FormTextField v-model="search" label="Cliente" icon="material-symbols:search-rounded"
          placeholder="Email o número de oportunidad" required :error="error" />

        <ButtonPrimary type="submit" :disabled="loading">
          {{ loading ? 'Buscando…' : 'Ver como este cliente' }}
        </ButtonPrimary>
      </form>

      <div class="w-full flex flex-wrap items-center justify-between gap-3">
        <p class="text-gris text-xs lg:text-sm font-medium">Ingresaste como {{ staffEmail }}.</p>
        <button
          type="button"
          class="text-magenta text-xs lg:text-sm font-bold underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          :disabled="loading"
          @click="closeStaffSession"
        >
          Cerrar sesión de staff
        </button>
      </div>
    </template>

    <template v-else>
      <p class="text-morado text-base lg:text-xl font-semibold">
        {{ sent
          ? 'Si tu email está habilitado, te llega un link para entrar. Vence en 15 minutos.'
          : 'Panel de staff. Ingresá con tu email de Tour Experto.' }}
      </p>

      <form v-if="!sent" class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15" @submit.prevent="requestLink">
        <FormTextField v-model="email" label="Correo electrónico" type="email"
          icon="material-symbols:mail-outline-rounded" placeholder="Ingresá aquí tu email" autocomplete="email" required
          :error="error" />

        <ButtonPrimary type="submit" :disabled="loading">
          {{ loading ? 'Enviando…' : 'Enviar link' }}
        </ButtonPrimary>
      </form>
    </template>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

const { requestStaffLink, getStaffSession, logoutStaff, viewAs } = useAuth()
const { reset } = useSession()

const staffEmail = ref('')
const email = ref('')
const search = ref('')
const sent = ref(false)
const error = ref('')
const loading = ref(false)

try {
  const session = await getStaffSession()
  staffEmail.value = session?.email || ''
} catch {
  staffEmail.value = ''
}

async function requestLink() {
  error.value = ''
  loading.value = true

  try {
    await requestStaffLink(email.value)
    sent.value = true
  } catch {
    error.value = 'No se pudo enviar el link. Probá de nuevo.'
  } finally {
    loading.value = false
  }
}

async function closeStaffSession() {
  error.value = ''
  loading.value = true

  try {
    await logoutStaff()
    reset()
    staffEmail.value = ''
    search.value = ''
    sent.value = false
  } catch {
    error.value = 'No se pudo cerrar la sesión. Probá de nuevo.'
  } finally {
    loading.value = false
  }
}

async function openAsClient() {
  error.value = ''
  loading.value = true

  try {
    await viewAs(search.value)
    // la sesión cacheada puede ser de otro cliente que se miró antes
    reset()
    await navigateTo('/')
  } catch (err) {
    const status = err?.response?.status
    if (status === 401) {
      staffEmail.value = ''
      error.value = 'Tu sesión de staff venció. Pedí un link nuevo.'
    } else if (status === 404) {
      error.value = 'No encontramos un cliente con ese dato.'
    } else {
      error.value = 'No se pudo abrir la sesión del cliente. Probá de nuevo.'
    }
  } finally {
    loading.value = false
  }
}
</script>
