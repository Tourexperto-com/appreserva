<template>
  <div class="w-full flex flex-col gap-6">
    <template v-if="error">
      <p role="alert" class="text-error text-sm">{{ error }}</p>
      <ButtonPrimary to="/login">
        {{ t('verify.retry') }}
      </ButtonPrimary>
    </template>

    <p v-else class="text-gris text-sm">{{ t('verify.checking') }}</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

const { verify } = useAuth()
const { t } = useLocale()
const route = useRoute()
const error = ref('')

const token = route.query.token

if (!token) {
  error.value = t('common.invalidLink')
} else {
  try {
    await verify(token)
    await navigateTo('/')
  } catch {
    error.value = t('verify.expired')
  }
}
</script>
