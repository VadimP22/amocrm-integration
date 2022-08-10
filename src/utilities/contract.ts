export function getContractId(): string {
    let idElement = document.querySelector("#add_tags > div > ul > li.multisuggest__list-item.js-multisuggest-fake > span")
    if (idElement != null) {
        return idElement.innerHTML.substring(1)
    }
}