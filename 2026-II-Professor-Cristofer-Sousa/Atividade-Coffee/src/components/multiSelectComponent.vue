<template>
<div class="flex items-center gap-[0.4vw]">
  <label class="text-white text-[1.2vw]" :for="props.id">{{ props.label }}</label>
  <select class="text-white border-[2px] text-[1.2vw] border-[#dedede] border-solid rounded-md w-min p-[0.5vw]" @change="emits('update:modelValue', ($event.target as HTMLInputElement).value)" :id="props.id">
<!--     <option value="" selected disabled hidden>{{ props.label }}</option> -->
    <option
    v-for="(option, index) in props.options"
    :key="index"
    :value="option">
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
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
