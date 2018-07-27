sap.ui.define([
	"com/sap/aiirdit_MC/controller/BaseController",
	"sap/ui/model/Filter"
], function(BaseController, Filter) {
	return BaseController.extend("com.sap.aiirdit_MC.controller.MeasurementCreation", {
		onInit: function() {
			//sap.ui.core.UIComponent.getRouterFor(this).getRoute("master").attachPatternMatched(this._onRouteMatched, this);
			var oModel = new sap.ui.model.json.JSONModel("./model/Data.json");
			this.getView().setModel(oModel, "data");
			//var oModel1 = new sap.ui.model.json.JSONModel("./model/MeasPoint.json");
			var x = 6;
			if (x === 6) {
				this.getView().byId("measuringPointInput").setVisible(false);
				this.getView().byId("measuringPointComboBox").setVisible(true);
				
			} else {
				this.getView().byId("measuringPointComboBox").setVisible(false);
				this.getView().byId("measuringPointInput").setVisible(true);
				
			}
			this.getView().setModel(oModel, "data");
			this.byId("datePicker").setDateValue(new Date());
			this.byId("datePicker1").setDateValue(new Date());
			this.byId("timePicker").setDateValue(new Date());
			this.byId("timePicker1").setDateValue(new Date());
			//live clock--------------------------------
			var oLabel = this.getView().byId("oLabel");
			var result = this.GetClock();
			oLabel.setText(result);
			var that = this;
			setInterval(function() {
				var result = that.GetClock();
				oLabel.setText(result);
			}, 1000);
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("measDetail").attachPatternMatched(this._onEventMatch, this);
		},
		_onRouteMatched: function _onRouteMatched(oEvent) {

		},
		_onEventMatch: function(oEvent) {
			this.oArgs = oEvent.getParameter("arguments");
			// this.getView().bindElement({
			// 	path :  this.getView().getModel("data1").setProperty(this.oArgs.measPoint),
			// 	events : {
			// 		dataRequested: function (odata) {
			// 				this.getView().setBusy(true);
			// 		},
			// 		dataReceived: function (odata) {
			// 				this.getView().setBusy(false);
			// 		}
			// 	}
			// });
		},
		handleValueHelpRequest: function(oController) {

			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.sap.aiirdit_MC.view.MeasurementPoint",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			this._valueHelpDialog.open();
		},

		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"name",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId("measuringPointInput");
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
			this._valueHelpDialog.close();
		},
		handleSavePress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//oRouter.navTo("mesaurmentDetail");
		},
		onChangeHandler: function(oEvent){
			this.getView().byId("measPointInput").setValue(oEvent.getParameters().value);
		},
		GetClock: function() {

			var tday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
			var tmonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
				"December");
			var d = new Date();
			var nday = d.getDay(),
				nmonth = d.getMonth(),
				ndate = d.getDate(),
				nyear = d.getYear(),
				nhour = d.getHours(),
				nmin = d.getMinutes(),
				nsec = d.getSeconds(),
				ap;
			if (nhour === 0) {
				ap = " AM";
				nhour = 12;
			} else if (nhour < 12) {
				ap = " AM";
			} else if (nhour == 12) {
				ap = " PM";
			} else if (nhour > 12) {
				ap = " PM";
				nhour -= 12;
			}
			if (nyear < 1000) nyear += 1900;
			if (nmin <= 9) nmin = "0" + nmin;
			if (nsec <= 9) nsec = "0" + nsec;
			var result = "" + tday[nday] + ", " + tmonth[nmonth] + " " + ndate + ", " + nyear + " " + nhour + ":" + nmin + ":" + nsec + ap + "";
			return result;
		}

	});

});