<template>
	<div class="row q-col-gutter-sm q-pa-md">
		<q-input label="Search" v-model="search" clearable outlined dense class="col-12">
			<template #prepend>
				<q-icon name="search" />
			</template>
		</q-input>

		<div v-for="(comp, i) in componentFilter" :key="i" class="col-6">
			<ComponentCard :type="comp.type">
				<template #header>
					<div class="flex justify-between items-center">
						<q-avatar size="xl" color="grey-3" text-color="grey" icon="grid_view" />
						<q-btn
							icon="add"
							unelevated
							class="bg-grey-3 text-grey q-pa-sm q-py-xs"
							@click="addField(comp)"
						/>
					</div>
				</template>
				<template #body>
					<!-- @vue-ignore -->
					<Component
						:is="getComponent(comp.type as COMPONENT_MAP_TYPES)"
						:modelValue="['checkbox', 'select'].includes(comp.type) ? [] : ''"
						v-bind="{ ...comp.attrs }"
						:type="comp.type"
						disable
					/>
				</template>
			</ComponentCard>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { COMPONENT_MAP_TYPES, getComponent } from './ComponentTypes';
import components from 'src/config/components.json';
import ComponentCard from 'src/components/Card/ComponentCard.vue';
import { FieldInterface } from 'src/types/form';

const emit = defineEmits(['addField']);

const search = ref('');
const componentFilter = computed(
	() => (search.value ? components.filter((e) => e.type.includes(search.value)) : components) as FieldInterface[],
);

const addField = (field: FieldInterface) => {
	emit('addField', field);
};
</script>
