<template>
  <aside class="w-72.5 shrink-0 h-dvh hidden lg:flex flex-col sticky top-0 bg-gris-claro-2 px-8 py-12">
    <div class="flex items-center gap-4">
      <Avatar :name="name" size="xl" />
      <div class="min-w-0 flex flex-col">
        <span class="text-violeta-texto text-sm font-medium">{{ t('common.hello') }}</span>
        <span class="text-morado text-xl font-bold truncate">{{ name }}</span>
      </div>
    </div>

    <nav v-if="links.length" class="flex flex-col gap-5 pt-8">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-4 rounded-xl text-base font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta px-6 py-3.5"
        :class="route.path === link.to
          ? 'bg-magenta-switch text-magenta font-bold'
          : 'text-gris hover:bg-gris-claro-3/50'"
      >
        <Icon :name="link.icon" class="shrink-0 size-7!" />
        {{ link.label }}
      </NuxtLink>
    </nav>

    <button
      type="button"
      class="w-full flex items-center justify-center gap-4 mt-auto bg-gris hover:bg-morado rounded-md text-white text-base font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta px-6 py-3.5"
      @click="$emit('logout')"
    >
      {{ t('common.logout') }}
      <Icon name="material-symbols:logout-rounded" />
    </button>
  </aside>
</template>

<script setup>
defineProps({
  name: { type: String, default: '' },
  links: { type: Array, default: () => [] }
})

defineEmits(['logout'])

const { t } = useLocale()

const route = useRoute()
</script>
