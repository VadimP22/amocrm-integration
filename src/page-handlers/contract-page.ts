import { renderSelector } from "../components/selector/selector-render"

export function onContractPage() {
    let root = document.querySelector("#edit_card > div > div.card-entity-form__top > div.linked-form__field.linked-form__field_status.linked-form__field_status-lead")
    if (root != null) {
        renderSelector(root)
    }
}