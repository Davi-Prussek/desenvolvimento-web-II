<template>
  <div class="flex items-center gap-[0.4vw]">
    <label class="text-white text-[1.2vw] flex-1" :for="props.id">
      {{ props.label }}
    </label>

    <select
      class="appearance-none text-[1.2vw] text-white border-2 border-[#dedede] rounded-md flex-1 p-[0.5vw]"
      :id="props.id"
      :value="props.modelValue ?? ''"
      @change="changeValue"
    >
      <option value="" disabled hidden>
        {{ props.default }}
      </option>

      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option"
        class="text-black">
        {{ option }}
      </option>

    </select>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  label: string
  id: string
  options: string[]
  modelValue: string | null
  default?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

function changeValue(event: Event) {
  const select = event.target as HTMLSelectElement

  emits(
    'update:modelValue',
    select.value === '' ? null : select.value
  )
}

</script>
