import { COMPONENT_TYPES } from "src/components/ComponentTypes";
export interface Attrs {
    options?: string[] | any[];
    placeholder?: string;
    class?:string;
    [x: string]: any
}

export interface Validation {
    required?: boolean;
    minLength?: number;
    email?: boolean;
    numeric?: boolean;
}

export interface FieldInterface {
    id:string;
    type: COMPONENT_TYPES;
    name: string;
    label?: string;
    attrs?: Options;
    validation?: Validation;
    component?: any;
    modelValue?: any;
    order:number
}
