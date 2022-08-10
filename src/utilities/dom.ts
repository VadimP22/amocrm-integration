export function E(tagName: keyof HTMLElementTagNameMap, className: string): HTMLElement {
    let element = document.createElement(tagName)
    element.className = className
    return element
}