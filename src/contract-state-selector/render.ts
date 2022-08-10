import template from "templates/controls/select.twig"
import { RenderCallback } from "../utilities/render"
import { Item } from "./interfaces"

export function fetchDataAndRenderTemplate(renderCallback: RenderCallback): string {
    let items: Array<Item> = [
        {id: "id1", option: "option1", bg_color: "red"},
        {id: "id2", option: "option2", bg_color: "blue"},
        {id: "id3", option: "option3", bg_color: "green"}
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