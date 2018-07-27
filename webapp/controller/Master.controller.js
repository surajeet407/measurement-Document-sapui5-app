sap.ui.define([
	"com/sap/aiirdit_MC/controller/BaseController",
	"sap/ui/model/Filter"
], function(BaseController, Filter) {

	return BaseController.extend("com.sap.aiirdit_MC.controller.App", {
		onInit: function(){
			var oModel1 = new sap.ui.model.json.JSONModel("./model/MeasPoint.json");
			this.getView().setModel(oModel1, "data1");
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("measDetail").attachPatternMatched(this._onRouteMatched, this);
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("master").attachPatternMatched(this._onEventMatch, this);
		},
		_onRouteMatched: function(oEvent) {
			

		},
		_onEventMatch: function(oEvent){
			
		},
		onUpdateFinished: function(oevent){
			var data = oevent.getSource().getItems()[0].oBindingContexts.data1.getModel().getData()[0];
			var detailPage = this.getOwnerComponent().getRouter().getView("com.sap.aiirdit_MC.view.MeasurementCreation");
			var detail = detailPage.byId("detail");
		    detail.setTitle("Measuring Point : " + oevent.getSource().getItems()[0].oBindingContexts.data1.getModel().getData()[0].name.measPoint);
		    var model = new sap.ui.model.json.JSONModel(data, "data1");
        	detailPage.setModel(model, "data1");
		},      
		itempress: function(oevent){
				this.contextpath = oevent.getSource().oBindingContexts.data1.getPath();
				var model = new sap.ui.model.json.JSONModel(oevent.getSource().oBindingContexts.data1.getProperty(this.contextpath));
				var detailview = this.getOwnerComponent().getRouter().getView("com.sap.aiirdit_MC.view.MeasurementCreation");
				detailview.setModel(model, "data1");
				var path = oevent.getSource().oBindingContexts.data1.getProperty(this.contextpath).name.measPoint;
				var detail = detailview.byId("detail");
				detail.setTitle("Measuring Point : " + path);
				this.getOwnerComponent().getRouter().navTo("measDetail", {"measPoint": path});
		}
		
	});
});