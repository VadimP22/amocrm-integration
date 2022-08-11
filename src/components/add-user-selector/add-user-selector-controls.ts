import { E } from "../../utilities/dom"
import { AddUserSelectorListItem } from "./add-user-selector-interfaces"



export class AddUserSelectorControls {
    private itemList: Array<AddUserSelectorListItem>
    private onSelectCallback: (id: string, newState: boolean) => void

    private root: HTMLElement | null
    private title: HTMLElement | null
    private list: HTMLElement | null

    constructor() {
        this.itemList = []
        this.onSelectCallback = (id, newState) => {console.log(id, newState)}

        this.root = document.getElementById("add-user-selector-root")
        this.title = document.getElementById("add-user-selector-title")
        this.list = document.getElementById("add-user-selector-list")

        if (this.title != null) {
            this.title.innerHTML = "Загрузка..."
            this.title.onclick = () => {this.toggleList()}
        }

        if (this.list != null) {
            this.list.innerHTML = ""
        }
    }

    setOnSelectCallback(newCb: (id: string, newState: boolean) => void) {
        this.onSelectCallback = newCb
    }

    setTitle(newTitle: string) {
        if (this.title != null) {
            this.title.innerHTML = newTitle
        }
    }

    toggleList() {
        if (this.list != null) {
            this.list.classList.toggle("hidden")
        }
    }

    private toggleDot(dot: boolean): boolean {
        return !dot
    }

    setNewItemList(newItemList: Array<AddUserSelectorListItem>) {
        this.itemList = newItemList
        
        if (this.list != null) {
            this.list.innerHTML = ""
            let index = 0
            for (let item of this.itemList) {

                if (item.type == "separator") {
                    let newSeparator = E("div", "bg-slate-400 text-gray-200 uppercase font-semibold px-2 py-1 cursor-default")
                    newSeparator.innerHTML = item.text
                    this.list.appendChild(newSeparator)
                } 
                else {
                    let newUser = E("div", "flex justify-between items-center bg-white text-gray-800 font-semibold px-2 py-1 hover:bg-slate-200 cursor-pointer")
                    newUser.innerHTML = `<div>${item.text}<div>`
                    newUser.onclick = () => {
                        item.checked = this.toggleDot(item.checked)
                        this.onSelectCallback(item.id, item.checked)
                        this.setNewItemList(this.itemList)
                    }

                    let dot = E("div", "w-2.5 h-2.5 rounded-full inline-block ml-4")

                    if (item.checked) {
                        dot.classList.add("bg-green-400")
                    } else {
                        dot.classList.add("bg-gray-400")
                    }

                    newUser.appendChild(dot)
                    this.list.appendChild(newUser)
                }


                index += 1
            }
        }
    }
}