<template>
    <q-item-label>{{ $attrs['label'] }}</q-item-label>
    <q-option-group outlined :model-value="modelValue" color="primary" :options="options" v-bind="$attrs" @update:model-value="e => $emit('update:modelValue', e)" />
</template>

<script lang='ts' setup>
import { QOptionGroupProps } from 'quasar';

defineProps<{ modelValue: QOptionGroupProps['modelValue'], options: QOptionGroupProps['options'] }>()
defineEmits(['update:modelValue']);

</script>