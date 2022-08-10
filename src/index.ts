import style from "../styles/output.css"
import { SelectorControls } from "./components/selector/selector-controls";
import { onContractPage } from "./page-handlers/contract-page";

declare function _define(arg0: string[], arg1: ($: any) => () => any): void
_define(['jquery'], function ($: any) {
    var CustomWidget = function () {
        var self = this, // для доступа к объекту из методов
        system = self.system(), //Данный метод возвращает объект с переменными системы.
        langs = self.langs;  //Объект локализации с данными из файла локализации (папки i18n)
  
        this.callbacks = {
            settings: function () {},

            init: function () {
                console.log("init")
                $("head").append(`<style>${style}</style>`)
                return true;
            },

            bind_actions: function () {
                if (self.system().area == 'lcard') {
                    console.log("bind_action")
                    let selectorControls = new SelectorControls((key: string) => {console.log(key)})
                }
                return true;
            },

            render: function () {
                console.log("render")
                if (self.system().area == 'lcard') {
                    onContractPage()
                }
                return true;
            },

            dpSettings: function () {},

            advancedSettings: function () {},

            destroy: function () {},

            contacts: {
                selected: function () {}
            },

            onSalesbotDesignerSave: function (handler_code: any, params: any) {},

            leads: {
                selected: function () {}
            },

            todo: {
                selected: function () {}
            },

            onSave: function () {
                return true
            },

            onAddAsSource: function (pipeline_id: any) {}
        };
        return this;
    };
    return CustomWidget;
});