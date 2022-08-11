import { AddUserSelectorControls } from "../components/add-user-selector/add-user-selector-controls"
import { AddUserSelectorListItem } from "../components/add-user-selector/add-user-selector-interfaces"

declare let $: any

export class AddUserSelectorApiProcessor {
    private addUserSelectorControls: AddUserSelectorControls
    private contractId: string

    constructor(addUserSelectorControls: AddUserSelectorControls, contractId:string) {
        this.addUserSelectorControls = addUserSelectorControls
        this.contractId = contractId

        this.addUserSelectorControls.setOnSelectCallback((id: string, newState: boolean) => {
            if (newState) {
                this.subscribe(id)
            }
            else {
                this.unsubscribe(id)
            }
        })
    }

    private makeList(groups: any, managers: any): Array<AddUserSelectorListItem> {
        let newArr: Array<AddUserSelectorListItem> = []
        for (let g in groups) {
            let newGroupItem: AddUserSelectorListItem = {
                type: "separator",
                text: groups[g],
                id: ":)",
                checked: false
            }
            newArr = [...newArr, newGroupItem]

            for (let m in managers) {
                if (managers[m].group == g) {
                    let newUserItem: AddUserSelectorListItem = {
                        type: "user",
                        text: managers[m].title,
                        id: m,
                        checked: false
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

    private filterList(list: Array<AddUserSelectorListItem>, subscriptions: any): Array<AddUserSelectorListItem> {
        let newList: Array<AddUserSelectorListItem> = []

        for (let item of list) {
            for (let sub of subscriptions) {
                let subId = sub.subscriber_id + ""

                if (subId === item.id) {
                    item.checked = true
                    newList = [...newList, item]
                    continue;
                }
                else {
                    newList = [...newList, item]
                }

            }
        }

        return newList
    }

    private getSubscribersCount(subscriptions: any): number {
        let count = 0
        for (let sub of subscriptions) {
            if (sub.type === "user") {
                count += 1
            }
        }

        return count
    }

    getUnsubscribeFormData(userId: string): string {
        return `request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Buser_id%5D%5B%5D=${userId}&request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Bentity_type%5D=2&request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Bentity_id%5D=${this.contractId}&request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Bevent%5D=chat_message`
    }

    getSubscribeFormData(userId: string): string {
        return `request%5Bsubscriptions%5D%5Bsubscribe%5D%5Buser_id%5D%5B%5D=${userId}&request%5Bsubscriptions%5D%5Bsubscribe%5D%5Bentity_type%5D=2&request%5Bsubscriptions%5D%5Bsubscribe%5D%5Bentity_id%5D=${this.contractId}&request%5Bsubscriptions%5D%5Bsubscribe%5D%5Bevent%5D=chat_message`
    }

    subscribe(userId: string) {
        $.ajax({
            type: 'POST',
            url: "/ajax/v1/subscriptions/subscribe",
            data: this.getSubscribeFormData(userId),
            processData: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }

    unsubscribe(userId: string) {
        $.ajax({
            type: 'POST',
            url: "/ajax/v1/subscriptions/unsubscribe",
            data: this.getUnsubscribeFormData(userId),
            processData: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }

    process() {
        $.get("/ajax/get_managers_with_group/").done((res: any) => {
            let newList = this.makeList(res.groups, res.managers)
            console.log("newlist", newList)

            $.get("/api/v4/leads/504677/subscriptions").done((res2: any) => {
                try {
                    let filteredList = this.filterList(newList, res2._embedded.subscriptions)
                    this.addUserSelectorControls.setNewItemList(newList) 
                    this.addUserSelectorControls.setTitle(`Участников: ${this.getSubscribersCount(res2._embedded.subscriptions)}`)
                } 
                catch (e) {
                    this.addUserSelectorControls.setNewItemList(newList)
                    this.addUserSelectorControls.setTitle("Участников: 0")
                }
            }).fail((err: any) => {
                console.log(err)
            })
                
        }).fail((err: any) => {
            console.log(err)
        })
    }
}