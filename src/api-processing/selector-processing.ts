import { SelectorControls } from "../components/selector/selector-controls";
import { ListItem } from "../components/selector/selector-interfaces";

declare let $: any

function applyDataToSelector(statuses: any, selectedStatusId: number, selectorControls: SelectorControls) {
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

export function getAndProcessSelectorData(contractId: string, selectorControls: SelectorControls) {

    $.get(`/api/v4/leads/${contractId}`).done((response1: any) => {

        $.get(`/api/v4/leads/pipelines/${response1.pipeline_id}`).done((response2: any) => {
            applyDataToSelector(response2._embedded.statuses, response1.status_id, selectorControls)
        }).fail(function (err: any) {
            console.log(err)
        })

    }).fail(function (err: any) {
        console.log(err)
    })
}

export function updateContractSelectedId(newContractStatusId: string, contractId: string) {
    let newStatusId = parseInt(newContractStatusId)
    let object = {status_id: newStatusId}
    let json = JSON.stringify(object)

    $.ajax({
        type: 'PATCH',
        url: `/api/v4/leads/${contractId}`,
        data: json,
        processData: false,
        contentType: 'application/json',
    }).done(function (response: any) {
        
    }).fail(function (err: any) {
        console.log(err)
    });
}