import { defineStore } from "pinia";

interface FormDataType {
    [key: string]: any
}

export const useFormStore = defineStore({
    id: "formStore",
    state: () => ({
        formData: {} as FormDataType,
    }),
});