<template>
	<form class="form-wrapper q-pa-md row q-col-gutter-sm" @submit.prevent="onSubmit">
		<template v-for="field in fields">
			<template v-if="field.type == 'select'">
				<Component
					:is="field.component"
					v-model="formData[field.name]"
					v-bind="{ ...field.attrs, ...getComponentField(field) }"
					:type="field.type"
					:parentId="formData[field.attrs.parent]"
					:parentKey="field.attrs.parent + '_id'"
					@update:modelValue="
						updateField({
							key: field.name,
							value: formData[field.name],
						})
					"
				/>
			</template>
			<template v-else>
				<Component
					:is="field.component"
					v-model="formData[field.name]"
					v-bind="{ ...field.attrs, ...getComponentField(field) }"
					:type="field.type"
					@update:modelValue="
						updateField({
							key: field.name,
							value: formData[field.name],
						})
					"
				/>
			</template>
		</template>
		<div class="flex justify-end">
			<q-btn type="submit" label="Submit" color="grey" unelevated no-caps />
		</div>
	</form>

	<q-dialog v-model="dialog">
		<q-card style="min-width:400px max-width:80%">
			<q-card-section>
				<h4 class="text-center text-positive">Result</h4>

				<div class="flex flex-center column q-my-md text-body1">
					<code>
						{{formData}}
					</code>
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormStore } from 'src/stores/Store';
import { FieldInterface } from 'src/types/form';
import { pick } from 'src/utilities/index.ts';

const props = withDefaults(
	defineProps<{
		formFields: FieldInterface[];
	}>(),
	{
		formFields: () => [],
	},
);

const dialog = ref(false);
const fields = computed(() => props.formFields.sort((a, b) => a.order - b.order));

function getComponentField(field: FieldInterface) {
	return {
		...pick(field, ['name', 'validation', 'type', 'text', 'label']),
	};
}

// Pinia store
const store = useFormStore();
const { formData } = storeToRefs(store);
const updateField = (payload: { key: string; value: string }) => {
	store.$patch((state) => {
		state.formData[payload.key] = payload.value;
	});
};

const onSubmit = () => {
	console.log('submit', formData.value);
	dialog.value = true;
};
</script>

<style>
.form-wrapper {
	width: 100%;
}
</style>
