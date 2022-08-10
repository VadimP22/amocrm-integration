import { SelectorControls } from "../components/selector/selector-controls";
import { ListItem } from "../components/selector/selector-interfaces";

declare let $: any


export class SelectorApiProcessor {
    private selectorControls: SelectorControls
    private contractId: string

    constructor(contractId_: string, selectorControld_: SelectorControls) {
        this.selectorControls = selectorControld_
        this.contractId = contractId_
        this.selectorControls.setOnSelectCallback((key: string) => {this.updateContractSelectedId(key)})
    }

    private applyDataToSelector(statuses: any, selectedStatusId: number) {
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

        this.selectorControls.setList(list, selectedIndex)
    }

    private updateContractSelectedId(newContractStatusId: string) {
        let newStatusId = parseInt(newContractStatusId)
        let object = {status_id: newStatusId}
        let json = JSON.stringify(object)

        $.ajax({
            type: 'PATCH',
            url: `/api/v4/leads/${this.contractId}`,
            data: json,
            processData: false,
            contentType: 'application/json',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }

    process() {
        $.get(`/api/v4/leads/${this.contractId}`).done((response1: any) => {

            $.get(`/api/v4/leads/pipelines/${response1.pipeline_id}`).done((response2: any) => {
                this.applyDataToSelector(response2._embedded.statuses, response1.status_id)
            }).fail(function (err: any) {
                console.log(err)
            })

        }).fail(function (err: any) {
            console.log(err)
        })
    }

}