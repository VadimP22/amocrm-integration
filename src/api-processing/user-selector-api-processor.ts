import { UserSelectorControls } from "../components/user-selector/user-selector-controls";
import { UserSelectorListItem } from "../components/user-selector/user-selector-interfaces";

declare let $: any

export class UserSelectorApiProcessor {
    private userSelectorControls: UserSelectorControls
    private contractId: string

    constructor(userSelectorControls: UserSelectorControls, contractId:string) {
        this.userSelectorControls = userSelectorControls
        this.contractId = contractId

        this.userSelectorControls.setOnSelectCallback((id: string) => {this.updateAssignee(id + '')})
    }

    private makeList(groups: any, managers: any): Array<UserSelectorListItem> {
        let newArr: Array<UserSelectorListItem> = []
        for (let g in groups) {
            let newGroupItem: UserSelectorListItem = {
                type: "separator",
                text: groups[g],
                id: ":)"
            }
            newArr = [...newArr, newGroupItem]

            for (let m in managers) {
                if (managers[m].group == g) {
                    let newUserItem: UserSelectorListItem = {
                        type: "user",
                        text: managers[m].title,
                        id: m
                    }
                    newArr = [...newArr, newUserItem]
                }
            }
        }


        return newArr
    }

    private updateAssignee(id: string) {
        let newAssigneeId = parseInt(id)
        let object = {responsible_user_id: newAssigneeId}
        let json = JSON.stringify(object)

        $.ajax({
            type: 'PATCH',
            url: `/api/v4/leads/${this.contractId}`,
            data: json,
            processData: false,
            contentType: 'application/json',
        }).done(function (response: any) {
            console.log(response)
        }).fail(function (err: any) {
            console.log(err)
        });
    }


    process() {
        $.get("/ajax/get_managers_with_group/").done((res: any) => {
            let newList = this.makeList(res.groups, res.managers)
            let index = 0

            $.get(`/api/v4/leads/${this.contractId}`).done((response: any) => {
                let id = response.responsible_user_id + ""

                for (let i of newList) {
                    if (i.id === id) {
                        console.log("i.id", i.id)
                        break;
                    }
                    index += 1
                }

                this.userSelectorControls.setNewItemList(newList, index)
            }).fail((err: any) => {
                console.log(err)
            })
            
        }).fail((err: any) => {
            console.log(err)
        })
    }
}