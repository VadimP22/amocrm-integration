import { twig } from "twig"

export function render(template: {data: string}, data: any): string {
    let t = twig(template)
    return t.render(data)
}

export type RenderCallback = (template: {data: string}, data: any) => string