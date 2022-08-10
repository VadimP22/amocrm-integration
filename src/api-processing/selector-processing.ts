import { SelectorControls } from "../components/selector/selector-controls";
import { ListItem } from "../components/selector/selector-interfaces";

declare let $: any

export function applyDataToSelector(statuses: any, selectedStatusId: number, selectorControls: SelectorControls) {
    //console.log(statuses)
    //console.log(selectedStatusId)

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

    //console.log("items:", list, selectedIndex)
    selectorControls.setList(list, selectedIndex)
}

export function updateSelectedId(newContractStatusId: string, contractId: string) {
    let newStatusId = parseInt(newContractStatusId)
    let object = {status_id: newStatusId}
    let json = JSON.stringify(object)

    //console.log(json, contractId)

    $.ajax({
        type: 'PATCH',
        url: `/api/v4/leads/${contractId}`,
        data: json,
        processData: false,
        contentType: 'application/json',
        /* success and error handling omitted for brevity */
    }).done(function (response: any) {
        //console.log('success updateContractStatusId', response);
    }).fail(function (err: any) {
        //console.log('error updateContractStatusId', err);
    });
}