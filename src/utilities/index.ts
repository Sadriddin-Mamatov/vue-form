export const pick = (obj: Record<string, any>, keys: string[]): Partial<Record<string, any>> => {
    return keys
        .map((k) => (k in obj ? { [k]: obj[k] } : {}))
        .reduce((res, o) => ({ ...res, ...o }), {});
};