sap.ui.define(['sap/ui/core/mvc/Controller','sap/ui/core/routing/History', 'sap/ui/Device'], function (Controller, History, Device) {
    'use strict';

    return Controller.extend('sap.ui.core.sample.RoutingMasterDetail.restApp.controller.Detail1', {
        onInit : function () {
            this.getOwnerComponent().getRouter().getRoute('userDetails').attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function(oEvent) {
            this._path = oEvent.getParameter('arguments').path;
            this.getView().bindElement('/' + this._path);
        },
        onNavBack : function() {
            var sPreviousHash = History.getInstance().getPreviousHash();

            // The history contains a previous entry
            if (sPreviousHash !== undefined) {
                history.go(-1);
            } else {
                // There is no history!
                // Naviate to master page
                this.getOwnerComponent().getRouter().navTo('master', {}, true);
            }
        },

        getEventBus: function(){
            return sap.ui.getCore().getEventBus();
        }


    });

},true);
