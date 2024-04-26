export function formatString(template: string, values: any[]) {
    return template.replace(/{}/g, () => values.shift());
}
