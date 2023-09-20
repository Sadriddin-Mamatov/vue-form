<template>
	<FormTemplateVue :formFields="formFields" />
</template>

<script  setup lang="ts">
import { getComponent } from './ComponentTypes';
import { useFormStore } from 'src/stores/Store';
import { FieldInterface } from 'src/@types/form';
import FormTemplateVue from './FormTemplate.vue';
import { computed } from 'vue';

const props = defineProps<{ formConfig: FieldInterface[] }>();

const store = useFormStore();

const formFields = computed(() => {
	const formDataKeys = Object.keys(store.formData);

	// remove object key
	formDataKeys.forEach((fKey) => {
		if (!props.formConfig.find((e) => e.name == fKey)) {
			delete store.formData[fKey];
		}
	});

	return props.formConfig.map((field) => {
		let component = getComponent(field.type);

		let val: any = '';
		if (field.type == 'checkbox') {
			val = [];
			store.formData[field.name] = [];
		} else {
			val = null;
			store.formData[field.name] = '';
		}

		return { ...field, modelValue: val, component };
	});
});
</script>
