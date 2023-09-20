import Input from 'src/components/FieldsForm/Input.vue'
import OptionGroup from 'src/components/FieldsForm/OptionGroup.vue'
import Select from 'src/components/FieldsForm/Select.vue'

export const COMPONENT_MAP = {
  text: Input,
  textarea: Input,
  radio: OptionGroup,
  checkbox: OptionGroup,
  select: Select,
};

export type COMPONENT_MAP_TYPES = keyof typeof COMPONENT_MAP

export function getComponent(type: COMPONENT_MAP_TYPES) {
  return COMPONENT_MAP[type];
}
