import { SelectorControls } from "../components/selector/selector-controls";
import { ListItem } from "../components/selector/selector-interfaces";

export function applyDataToSelector(statuses: any, selectedStatusId: number, selectorControls: SelectorControls) {
    console.log(statuses)
    console.log(selectedStatusId)

    let list: Array<ListItem> = []
    let index = 0
    let selectedIndex = 0

    for(let status of statuses) {
        if (status.id == selectedStatusId) {
            selectedIndex = index
        }

        let newListItem: ListItem = {
            key: status.id + "",
            text: status.name,
            color: status.color
        }
        list = [...list, newListItem]
        index++
    }

    console.log("items:", list, selectedIndex)
    selectorControls.setList(list, selectedIndex)
}