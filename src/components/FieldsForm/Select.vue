<template>
	<q-select
		:model-value="modelValue"
		map-options
		emit-value
		dropdown-icon="expand_more"
		outlined
		:menu-offset="[0, 8]"
		color="primary"
		v-bind="$attrs"
		use-input
		input-debounce="300"
		:options="list"
        :option-label="optionLabel"
		@update:model-value="(e) => $emit('update:modelValue', e)"
		@filter="filterFn"
	/>
</template>

<script  setup lang="ts">
import { QSelect } from 'quasar';
import { computed, ref } from 'vue';
const props =
	defineProps<{
		modelValue: QSelect['modelValue'];
		options: QSelect['options'];
		parentId?: string | number | null;
		parentKey?: string;
		optionLabel?: string;
	}>();

defineEmits(['update:modelValue']);

const optionsComp = computed(() => {

	if (props.parentId && props.parentKey) {
		return props.options?.filter((e) => e[props.parentKey!] == props.parentId) as any[];
	}
	return props.options as any[];
});

const list = ref(optionsComp.value);

const filterFn = async (val: string, update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void) => {
	if (val === '') {
		update(() => {
			list.value = optionsComp.value;
		});
		return;
	}

	update(() => {
		const needle = val.toLowerCase();
		list.value = props.optionLabel
			? optionsComp.value.filter((v) => v[props.optionLabel as string]?.toLowerCase().indexOf(needle) > -1)
			: [];
	});
};
</script>
