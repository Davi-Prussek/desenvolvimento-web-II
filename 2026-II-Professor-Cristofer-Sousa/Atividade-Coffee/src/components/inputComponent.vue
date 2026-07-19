<template>
<div class="flex flex-col gap-[0.4vw]">
  <label class="text-[1.2vw] text-white" :for="props.id">{{ props.label }}</label>
<input
class="text-white border-2 border-[#dedede] border-solid rounded-md p-[0.5vw] px-[1vw] text-[1.2vw]"
@input="emits('update:modelValue',($event.target as HTMLInputElement).value)"
:type="props.type"
:placeholder="props.placeholder"
:value="props.modelValue"
:id="props.id"
>
</div>
</template>
<script setup lang="ts">

type InputType = 'text' | 'number'
type dados = number | string | null

  const props = defineProps<{
    label: string
    id: string
    type: InputType
    modelValue: dados
    placeholder: string
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: dados): void
  }>()
</script>
<!-- Esse componente só me prova mais um dia como o emits é coisa maligna -->
