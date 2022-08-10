import { initContractStateSelector } from "./contract-state-selector/render";

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
                console.log(self)
                return true;
            },

            bind_actions: function () {
                return true;
            },

            render: function () {
                console.log("render")
                console.log(self)
                initContractStateSelector(self.render)
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