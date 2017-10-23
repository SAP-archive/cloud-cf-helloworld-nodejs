sap.ui.define(['sap/ui/core/UIComponent', 'sap/ui/model/json/JSONModel', 'sap/ui/Device'], function (UIComponent, JSONModel, Device) {
    'use strict';
    return UIComponent.extend('sap.ui.core.sample.RoutingMasterDetail.restApp', {

        metadata: {
            rootView: 'sap.ui.core.sample.RoutingMasterDetail.restApp.view.App',
            routing: {
                config: {
                    routerClass: 'sap.m.routing.Router',
                    viewPath: 'sap.ui.core.sample.RoutingMasterDetail.restApp.view',
                    controlId: 'rootControl',
                    viewType: 'XML'
                },
                routes: [
                    {
                        name: 'master',
                        // empty hash - normally the start page
                        pattern: '',
                        target: ['master']
                    },
                    {
                        name: 'userDetails',
                        /* 
						* display details for a specific user,
						* For example, route /0 will display the user with index=0
						*/
                        pattern: ':path:',
                        target: ['master', 'userDetails']
                    }
                ],
                targets: {
                    master: {
                        viewName: 'Master',
                        controlAggregation: 'masterPages',
                        viewLevel: 0
                    },
                    userDetails: {
                        viewName: 'Detail1',
                        controlAggregation: 'detailPages',
                        title: {
                            parts: ['name'],
                            formatter: 'jQuery.sap.formatMessage'
                        },
                        viewLevel: 1
                    }
                }
            }
        },

        init : function () {

            var oModel = new JSONModel('/hw/users');
            this.setModel(oModel);
            this.setModel(this.createDeviceModel(), 'device');

            UIComponent.prototype.init.apply(this, arguments);

            // Parse the current url and display the targets of the route that matches the hash
            this.getRouter().initialize();

            this.getRouter().attachTitleChanged(function(oEvent){
                // set the browser page title based on selected user
                document.title = oEvent.getParameter('title');
            });
        },
        createDeviceModel : function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode('OneWay');
            return oModel;
        }

    });
}, /* bExport= */ true);
