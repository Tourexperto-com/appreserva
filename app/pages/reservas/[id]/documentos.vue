<template>
  <div class="w-full flex flex-col gap-6 md:gap-9 lg:gap-10">
    <p class="text-violeta-texto text-xs lg:text-base font-medium">
      {{ t('documents.intro') }}
    </p>

    <State
      :pending="pending"
      :error="error"
      :empty="!vouchers?.length"
      :error-text="t('documents.error')"
      :empty-text="t('documents.empty')"
    >
      <ul class="w-full flex flex-col gap-3">
        <li v-for="(voucher, i) in vouchers" :key="voucher.id || i">
          <Row :title="voucher.nombre" :subtitle="subtitle(voucher)">
            <template #actions>
              <button
                v-if="isPreviewable(voucher)"
                type="button"
                class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="t('common.view', { name: voucher.nombre })"
                @click="preview = voucher"
              >
                <Icon name="material-symbols:visibility-outline-rounded" size="24" />
              </button>
              <a
                :href="voucher.url_s3"
                download
                class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                :aria-label="t('common.download', { name: voucher.nombre })"
              >
                <Icon name="material-symbols:download-rounded" size="24" />
              </a>
            </template>
          </Row>
        </li>
      </ul>
    </State>

    <Modal v-model="isOpen" :title="preview?.nombre || ''">
      <template #actions>
        <a
          :href="preview?.url_s3"
          download
          class="flex items-center justify-center size-10 lg:size-12 bg-morado hover:bg-morado-hover rounded-lg text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          :aria-label="t('common.download', { name: preview?.nombre })"
        >
          <Icon name="material-symbols:download-rounded" size="24" />
        </a>
      </template>

      <iframe
        v-if="preview"
        :src="preview.url_s3"
        class="w-full h-full border-0"
        :title="preview.nombre"
      />
    </Modal>
  </div>
</template>

<script setup>
const route = useRoute()
const { t } = useLocale()

const { data: vouchers, pending, error } = useReservaVouchers(route.params.id)

const preview = ref(null)

const isOpen = computed({
  get: () => !!preview.value,
  set: (value) => { if (!value) preview.value = null }
})

// solo el PDF se puede ver en un iframe; el resto va directo a descarga.
// hoy la extensión sólo vive en el nombre: tipo es la categoría ("voucher")
// y url_s3 termina en /download
function isPreviewable(voucher) {
  if (!voucher.url_s3) return false
  if (/\.pdf($|[?#])/i.test(voucher.nombre || '')) return true
  return /pdf/i.test(voucher.tipo || '')
}

function subtitle(voucher) {
  return voucher.tipo?.toUpperCase() || ''
}
</script>
