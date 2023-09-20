<template>
    <q-radio outlined :model-value="modelValue" :val="val" color="primary" v-bind="$attrs" @update:model-value="e => $emit('update:modelValue', e)" />
</template>

<script lang='ts' setup>
import { QRadio } from 'quasar';

defineProps<{ modelValue: QRadio['modelValue'], val: QRadio['val'] }>()

defineEmits(['update:modelValue']);

</script>