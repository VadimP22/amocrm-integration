import { E } from "../../utilities/dom";
import { ListItem } from "./selector-interfaces";


export class SelectorControls {

    public listItem: Array<ListItem>;
    public button: HTMLElement | null;
    public title: HTMLElement | null;
    public list: HTMLElement | null;
    public bar: HTMLElement | null;
    public onSelectCallback: (key: string) => void;

    constructor(newOnSelectCallback: (key: string) => void) {
        this.button = document.getElementById("header")
        this.title = document.getElementById("title")
        this.list = document.getElementById("list")
        this.bar = document.getElementById("bar")
        this.onSelectCallback = newOnSelectCallback
        this.listItem = []

        if (this.button != null) {
            this.button.onclick = () => {
                this.toggleList()
            }
        }
        if (this.title != null) {
            this.title.innerHTML = "Загрузка..."
        }     
        if (this.list != null) {
            this.list.innerHTML = ""
        }
        if (this.bar != null) {
            this.bar.innerHTML = ""
        }
    }

    toggleList() {
        if (this.list != null) {
            this.list.classList.toggle("hidden")
        }
    }

    setTitle(newTitle: string) {
        if (this.title != null) {
            this.title.innerHTML = newTitle 
        }
    }

    addProgressBarLine(width: number, color: string) {
        if (this.bar != null) {
            let newBarLine = E("div", "h-1")
            newBarLine.style.backgroundColor = color
            newBarLine.style.width = `${width}%`
            this.bar.appendChild(newBarLine)
        }
    }

    setList(newList: Array<ListItem>, selectedIndex: number) {
        this.listItem = newList

        if (this.bar != null) {
            this.bar.innerHTML = ""
        }

        if (this.list != null) {
            this.list.innerHTML = ""


            let isProgressBarBuilt = false

            let stageWidth = 100 / newList.length
            let index = 0

            for (let i of this.listItem) {
                if (!isProgressBarBuilt) {
                    console.log("x")
                    this.addProgressBarLine(stageWidth, i.color)
                }

                if (index == selectedIndex) {
                    this.setTitle(i.text)
                    isProgressBarBuilt = true
                }
                let newItem = E("div", "cursor-pointer text-gray-600 border-2 border-transparent hover:border-slate-300 font-sans font-semibold pl-4 py-2 bg-cyan-200 z-50 hover:bg-slate-200")
                let localIndex = index
                newItem.style.backgroundColor = i.color
                newItem.innerHTML = i.text
                newItem.onclick = () => {
                    this.setTitle(i.text)
                    this.onSelectCallback(i.key)
                    this.toggleList()
                    this.setList(newList, localIndex)
                }
                this.list.appendChild(newItem)
                index += 1
            }
        }
    }
}

let selectorControls = new SelectorControls((key: string) => { console.log(key) })

let list: Array<ListItem> = [
    {key: "k1", text: "selectme1", color: "#d47161"},
    {key: "k2", text: "selectme2", color: "#79b589"},
    {key: "k3", text: "selectme3", color: "#619ed4"},
]

selectorControls.setList(list, 1)