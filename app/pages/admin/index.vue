<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-15">
    <template v-if="staffEmail">
      <p class="text-morado text-base lg:text-xl font-semibold">
        Elegí un cliente para ver la app tal como la ve él.
      </p>

      <div class="w-full flex flex-col gap-4">
        <FormTextField v-model="search" label="Buscar cliente" icon="material-symbols:search-rounded"
          placeholder="Nombre, email, número de oportunidad o programa" :error="error" />

        <State
          :pending="pending"
          :error="listError"
          :empty="!clients.length"
          error-text="No se pudo cargar el listado de clientes."
          empty-text="No encontramos clientes con esa búsqueda."
        >
          <ul class="w-full flex flex-col gap-3">
            <li v-for="client in clients" :key="client.id">
              <Row :title="client.nombre || client.email" :subtitle="subtitle(client)">
                <template #actions>
                  <button
                    type="button"
                    class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                    :aria-label="`Ver la app como ${client.nombre || client.email}`"
                    :disabled="opening"
                    @click="openAsClient(client.id)"
                  >
                    <Icon name="material-symbols:visibility-outline-rounded" size="24" />
                  </button>
                </template>
              </Row>
            </li>
          </ul>
        </State>
      </div>

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

const SEARCH_DELAY_MS = 300

const { requestStaffLink, getStaffSession, logoutStaff, listClients, viewAs } = useAuth()
const { reset } = useSession()

const staffEmail = ref('')
const email = ref('')
const search = ref('')
const sent = ref(false)
const error = ref('')
const loading = ref(false)

const clients = ref([])
const pending = ref(false)
const listError = ref(null)
const opening = ref(false)

let searchTimer = null
let lastRequest = 0

try {
  const session = await getStaffSession()
  staffEmail.value = session?.email || ''
} catch {
  staffEmail.value = ''
}

if (staffEmail.value) loadClients()

watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(loadClients, SEARCH_DELAY_MS)
})

onBeforeUnmount(() => clearTimeout(searchTimer))

function subtitle(client) {
  return [
    client.nombre ? client.email : '',
    client.programa,
    client.fecha_salida ? `sale ${formatShortDate(client.fecha_salida)}` : '',
    client.nro_oportunidad ? `Op. ${client.nro_oportunidad}` : ''
  ].filter(Boolean).join(' · ')
}

function expireStaffSession() {
  staffEmail.value = ''
  clients.value = []
  error.value = 'Tu sesión de staff venció. Pedí un link nuevo.'
}

async function loadClients() {
  if (!staffEmail.value) return

  // si se tipea rápido, una respuesta vieja no pisa la de la última búsqueda
  const request = ++lastRequest
  pending.value = true
  listError.value = null

  try {
    const result = await listClients(search.value)
    if (request === lastRequest) clients.value = result
  } catch (err) {
    if (request !== lastRequest) return
    if (err?.response?.status === 401) expireStaffSession()
    else listError.value = err
  } finally {
    if (request === lastRequest) pending.value = false
  }
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
    clients.value = []
    search.value = ''
    sent.value = false
  } catch {
    error.value = 'No se pudo cerrar la sesión. Probá de nuevo.'
  } finally {
    loading.value = false
  }
}

async function openAsClient(id) {
  error.value = ''
  opening.value = true

  try {
    await viewAs(id)
    // la sesión cacheada puede ser de otro cliente que se miró antes
    reset()
    await navigateTo('/')
  } catch (err) {
    const status = err?.response?.status
    if (status === 401) {
      expireStaffSession()
    } else if (status === 404) {
      error.value = 'Ese cliente ya no está disponible.'
    } else {
      error.value = 'No se pudo abrir la sesión del cliente. Probá de nuevo.'
    }
  } finally {
    opening.value = false
  }
}
</script>
