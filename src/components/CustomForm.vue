<template>
	<div class="default-theme" >
		<div  class="wrapper-forms" >
			<div class="full-height full-width">
				<q-toolbar class="head-wrapper">
					<q-toolbar-title class="headline">All Fields</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 50px); width: 100%">
					<FormComponents @addField="(e) => addField(e)" />
				</q-scroll-area>
			</div>
		</div>
		<div  class="wrapper-forms">
			<div class="full-height full-width">
				<q-toolbar class="head-wrapper">
					<q-toolbar-title class="headline">Form Update</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 50px); width: 100%">
					<FormSettings ref="settingRef" :formConfig="config" @update:config="(e) => (config = e)" />
				</q-scroll-area>
			</div>
		</div>
		<div class="wrapper-forms">
			<div class="full-height full-width">
				<q-toolbar class="head-wrapper">
					<q-toolbar-title class="headline">Form</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 50px); width: 100%">
					<VueForm :formConfig="config" />
				</q-scroll-area>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import VueForm from 'src/components/VueForm.vue';
import FormComponents from './FormComponents.vue';
import FormSettings from './FormSettings.vue';
// config
import formConfig from 'src/config/formConfig.json';
// types
import { FieldInterface } from 'src/@types/form';

const settingRef = ref<typeof FormSettings | null>(null);
const config = ref([...(formConfig.map((e) => ({ ...e, id: uuidv4() })) as FieldInterface[])]);

const addField = (field: FieldInterface) => {
	const order = config.value.reduce((maxV, obj) => (maxV >= obj.order ? maxV : obj.order), 0) + 1;
	const newField: FieldInterface = {
		...field,
		order,
		id: uuidv4(),
		attrs: { ...field.attrs, class: 'col-12' },
		name: 'field' + order,
	};
	if (newField.type == 'select') {
		newField.attrs = {
			...newField.attrs,
			options: [
				{
					label: 'Option qoshildi',
					value: 'opt1',
				},
			],
		};
	}
	config.value = [...config.value, newField];
	nextTick(() => {
		settingRef.value?.openSetting(newField);
	});
};
</script>

<style>
.default-theme{
	width: 70%;
	margin-left: 18%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.wrapper-forms{
	margin-bottom: 100px;
	box-shadow: 2px 2px 10px #ccc;
}
.splitpanes__pane {
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	background-color: #ffffff !important;
}
.head-wrapper{
	background: #56c8da;
	text-align: center;
}
.headline{
	color: #ffffff;
}
</style>
