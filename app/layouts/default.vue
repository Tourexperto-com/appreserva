<template>
  <div class="min-h-dvh flex bg-white">
    <DefaultSidebar :name="name" :links="links" @logout="signOut" />

    <div class="min-w-0 flex-1 flex flex-col">
      <div
        v-if="staff"
        role="status"
        class="w-full flex items-center justify-between gap-3 sticky top-0 z-20 bg-morado text-white text-xs lg:text-sm font-medium px-5 md:px-30 lg:px-16 py-2.5"
      >
        <span class="min-w-0 truncate">
          Estás viendo la app como <strong class="font-bold">{{ name || email || 'este cliente' }}</strong>
          <span v-if="name && email" class="hidden md:inline opacity-80"> · {{ email }}</span>
        </span>
        <button
          type="button"
          class="shrink-0 font-bold underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          @click="signOut"
        >
          Salir
        </button>
      </div>

      <DefaultHeader v-if="!links.length" :name="name" @logout="signOut" />

      <main class="flex-1">
        <slot />
      </main>

      <DefaultNav v-if="links.length" :links="links" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { name, email, staff, loadName, signOut } = useSession()

onMounted(loadName)

const links = computed(() => {
  const id = route.params.id
  if (!id) return []

  return [
    { to: `/reservas/${id}`, label: 'Detalle', icon: 'material-symbols:location-on-outline-rounded' },
    { to: `/reservas/${id}/pasajeros`, label: 'Pasajeros', icon: 'material-symbols:groups-outline-rounded' },
    { to: `/reservas/${id}/hoteles`, label: 'Hoteles', icon: 'material-symbols:bed-outline-rounded' },
    { to: `/reservas/${id}/documentos`, label: 'Documentos', icon: 'material-symbols:description-outline-rounded' },
    { to: `/reservas/${id}/contacto`, label: 'Contacto', icon: 'material-symbols:call-outline-rounded' }
  ]
})
</script>
