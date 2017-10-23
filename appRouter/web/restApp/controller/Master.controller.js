sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/Device'], function (Controller, Device) {
    'use strict';

    return Controller.extend('sap.ui.core.sample.RoutingMasterDetail.restApp.controller.Master', {
        onInit : function () {
            this.getOwnerComponent().getRouter().getRoute('master').attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            if (!Device.system.phone) {
                this.getOwnerComponent().getRouter()
                    .navTo('userDetails', {path: 0}, true);
            }
        },
        onSelectionChange: function(oEvent) {
            // var sOrderId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("id")
            var sPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath().substring(1);
            this.getOwnerComponent().getRouter()
                .navTo('userDetails',
                    {path:sPath},
                    !Device.system.phone);
        },

        addUser: function(){
            this.showErrorAlert('Yet to be implemented');
        },

        showErrorAlert : function(sMessage){
            jQuery.sap.require('sap.m.MessageBox');
            sap.m.MessageBox.error(sMessage, { title: 'Error'});
        },


        getEventBus: function(){
            return sap.ui.getCore().getEventBus();
        }


    });

}, true);