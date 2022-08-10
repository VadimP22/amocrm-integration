import { RenderCallback } from "../utilities/render"
import { Item } from "./interfaces"
import template from "templates/controls/select.twig"

export function fetchDataAndRenderTemplate(renderCallback: RenderCallback): string {
    let items: Array<Item> = [
        {id: "id1", option: "option1", bg_color: "#f29272"},
        {id: "id2", option: "option2", bg_color: "#72f283"},
        {id: "id3", option: "option3", bg_color: "#72a7f2"}
    ]

    return renderCallback({data: template}, {items, selected_bg_color: "transparent"})
}

export function initContractStateSelector(renderCallback: RenderCallback) {
    let element = document.querySelector("#edit_card > div > div.card-entity-form__top > div.linked-form__field.linked-form__field_status.linked-form__field_status-lead")

    if (element != null) {
        element.innerHTML = "Загрузка..."
        element.innerHTML = fetchDataAndRenderTemplate(renderCallback)
    }
    else {
        return
    }
}