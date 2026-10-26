<template>
  <dialog
    ref="dialogRef"
    class="w-[calc(100%-2rem)] max-w-4xl h-[85dvh] m-auto bg-white rounded-[18px] shadow-card backdrop:bg-morado/60 p-0"
    @close="emit('update:modelValue', false)"
    @click="onBackdropClick"
  >
    <div v-if="modelValue" class="w-full h-full flex flex-col">
      <header class="shrink-0 flex items-center gap-3 border-b border-violeta-2 p-4 lg:p-5">
        <h2 class="min-w-0 text-morado text-sm lg:text-base font-bold truncate">{{ title }}</h2>

        <div class="ml-auto shrink-0 flex items-center gap-2">
          <slot name="actions" />

          <button
            type="button"
            class="flex items-center justify-center size-10 lg:size-12 bg-violeta hover:bg-violeta-2 rounded-lg text-white transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
            :aria-label="t('common.close')"
            @click="close"
          >
            <Icon name="material-symbols:close-rounded" class="size-6!" />
          </button>
        </div>
      </header>

      <div class="min-h-0 grow">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const { t } = useLocale()

const dialogRef = ref(null)

function close() {
  dialogRef.value?.close()
}

function onBackdropClick(event) {
  if (event.target === dialogRef.value) close()
}

watch(() => props.modelValue, (open) => {
  if (open) dialogRef.value?.showModal()
  else if (dialogRef.value?.open) dialogRef.value.close()
})

onBeforeUnmount(() => {
  if (dialogRef.value?.open) dialogRef.value.close()
})
</script>
