<template>
    <q-input outlined :model-value="modelValue" color="primary" v-bind="$attrs" @update:model-value="e => $emit('update:modelValue', e)" />
</template>

<script lang='ts' setup>
import { QInput } from 'quasar';

defineProps<{ modelValue: QInput['modelValue'] }>()
defineEmits(['update:modelValue']);

</script>