import { E } from "../../utilities/dom"
import { UserSelectorListItem } from "./user-selector-interfaces"

export class UserSelectorControls {
    private itemList: Array<UserSelectorListItem>
    private onSelectCallback: (id: string) => void

    private root: HTMLElement | null
    private title: HTMLElement | null
    private list: HTMLElement | null

    constructor() {
        this.itemList = []
        this.onSelectCallback = (id) => {console.log(id)}

        this.root = document.getElementById("user-selector-root")
        this.title = document.getElementById("user-selector-title")
        this.list = document.getElementById("user-selector-list")

        if (this.title != null) {
            this.title.innerHTML = "Загрузка..."
            this.title.onclick = () => {this.toggleList()}
        }

        if (this.list != null) {
            this.list.innerHTML = ""
        }
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

    setNewItemList(newItemList: Array<UserSelectorListItem>, selectedIndex: number) {
        this.itemList = newItemList
        
        if (this.list != null) {
            let index = 0
            for (let item of this.itemList) {
                if (index == selectedIndex) {
                    this.setTitle(item.text)
                }

                if (item.type == "separator") {
                    let newSeparator = E("div", "bg-slate-400 text-gray-200 uppercase font-semibold px-2 py-1 cursor-default")
                    newSeparator.innerHTML = item.text
                    this.list.appendChild(newSeparator)
                } 
                else {
                    let newUser = E("div", "bg-white text-gray-800 font-semibold px-2 py-1 hover:bg-slate-200 cursor-pointer")
                    newUser.innerHTML = item.text
                    newUser.onclick = () => {
                        this.setTitle(item.text)
                        this.onSelectCallback(item.id)
                        this.toggleList()
                    }
                    this.list.appendChild(newUser)
                }


                index += 1
            }
        }
    }
}