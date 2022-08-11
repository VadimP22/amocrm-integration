import { renderAddUserSelector } from "../components/add-user-selector/add-user-selector-render"
import { renderSelector } from "../components/selector/selector-render"
import { renderUserSelector } from "../components/user-selector/user-selector-render"

export function onContractPage() {
    let root = document.querySelector("#edit_card > div > div.card-entity-form__top > div.linked-form__field.linked-form__field_status.linked-form__field_status-lead")
    if (root != null) {
        renderSelector(root)
    }

    let userSelectorRoot = document.querySelector("#edit_card > div > div.card-entity-form__main-fields.js-card-main-fields > div.linked-form__field.linked-form__field_reassign > div.linked-form__field__value")
    if (userSelectorRoot != null) {
        renderUserSelector(userSelectorRoot)
    }

    let addUserSelectorRoot = document.querySelector("#card_holder > div.js-card-feed.card-holder__feed > div > div.notes-wrapper__scroller.custom-scroll > div > div.notes-wrapper__filter-and-chat-users.js-notes-filter-and-chat-users > div > div.notes-wrapper__chat-users-wrapper > div")
    if(addUserSelectorRoot != null) {
        renderAddUserSelector(addUserSelectorRoot)
    }
}