import style from "../styles/output.css"
import { SelectorApiProcessor } from "./api-processing/selector-api-processor";
import { SelectorControls } from "./components/selector/selector-controls";
import { UserSelectorControls } from "./components/user-selector/user-selector-controls"
import { onContractPage } from "./page-handlers/contract-page";
import { getContractId } from "./utilities/contract";

declare function _define(arg0: string[], arg1: ($: any) => () => any): void
_define(['jquery'], function ($: any) {
    var CustomWidget = function () {
        var self = this, // для доступа к объекту из методов
        system = self.system(), //Данный метод возвращает объект с переменными системы.
        langs = self.langs;  //Объект локализации с данными из файла локализации (папки i18n)
  
        this.callbacks = {
            settings: function () {},

            

            init: function () {
                $("head").append(`<style>${style}</style>`)

                return true;
            },

            bind_actions: function () {
                if (self.system().area == 'lcard') {
                    let contractId = getContractId()

                    let selectorControls = new SelectorControls()
                    let selectorApiProcessor = new SelectorApiProcessor(contractId, selectorControls)

                    let userSelectorControls = new UserSelectorControls()

                    selectorApiProcessor.process()

                }

                return true;
            },

            render: function () {
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