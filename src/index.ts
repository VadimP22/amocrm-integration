import style from "../styles/output.css"
import { applyDataToSelector } from "./api-processing/selector-processing";
import { SelectorControls } from "./components/selector/selector-controls";
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
                console.log("init")
                $("head").append(`<style>${style}</style>`)

                return true;
            },

            bind_actions: function () {
                if (self.system().area == 'lcard') {
                    console.log("bind_action")
                    let selectorControls = new SelectorControls((key: string) => { console.log(key) })

                    self.$authorizedAjax({
                        url: `/api/v4/leads/${getContractId()}`
                    }).done(function (getContractResponse: any) {
                        console.log('success getContractById', getContractResponse);

                        self.$authorizedAjax({
                            url: `/api/v4/leads/pipelines/${getContractResponse.pipeline_id}`
                        }).done(function (response: any) {
                            console.log('success getPipelineById', response);
                            applyDataToSelector(response._embedded.statuses, getContractResponse.status_id, selectorControls)
                        }).fail(function (err: any) {
                            console.log('error getPipilineById', err);
                        });

                    }).fail(function (err: any) {
                        console.log('error getContractById', err);
                    });
                    
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