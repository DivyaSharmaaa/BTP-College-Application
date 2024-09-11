sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var useremail = 'divya.sharma@peolsolutions.com';

    // var useremail ;
	return ControllerExtension.extend('dep.ext.controller.UserObj', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf dep.ext.controller.UserObj
             */
			onInit: function () {
				debugger
				// // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// var oModel = this.base.getExtensionAPI().getModel();
				// var oUser = new sap.ushell.services.UserInfo().getEmail();
                // useremail = oUser;
            //     console.log(oUser);
            //   console.log(useremail);
			},
			/**
				 * Called before the view is rendered.
				 * This is a suitable place to execute code before binding occurs.
				 */
			routing: {
                onBeforeBinding: async function () {
                    debugger;
                    var oModel = this.base.getExtensionAPI().getModel();

                    if (!oModel) {
                        console.error('Model is not available.');
                        return;
                    }

                    var sServiceUrl;
                    if (typeof oModel.getServiceUrl === "function") {
                        sServiceUrl = oModel.getServiceUrl(); // For V4 OData models
                        console.log('Service URL:', sServiceUrl);
                    } else {
                        console.error('Unable to determine the service URL.');
                        return;
                    }

                    try {
                        

                        const authResponse = await new Promise((resolve, reject) => {
                            jQuery.ajax({
                                url: sServiceUrl + "/authorisation",
                                method: "GET",
                                dataType: "json",
                                success: function (data) {
                                    resolve(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    reject(new Error(textStatus + ': ' + errorThrown));
                                }
                            });
                        });

                        const deptResponse = await new Promise((resolve, reject) => {
                            jQuery.ajax({
                                url: sServiceUrl + "/Department",
                                method: "GET",
                                dataType: "json",
                                success: function (data) {
                                    resolve(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    reject(new Error(textStatus + ': ' + errorThrown));
                                }
                            });
                        });

                        debugger;
                        console.log('Fetched auth data:', authResponse);
                        console.log('Fetched dept data:', deptResponse);

                        if (authResponse && authResponse.value && Array.isArray(authResponse.value) &&
                            deptResponse && deptResponse.value && Array.isArray(deptResponse.value)) {

                            var userAuth = authResponse.value.find(auth => auth.Email === useremail);
                            if (!userAuth) {
                                debugger;
                                console.error('User not found in authorisation data.');
                                return;
                            }

                            var userRole = userAuth.role; // User's role
                            console.log(`User Role: ${userRole}`);

                            var oEvent = this.getView().getBindingContext(); // Example: getting the binding context
                            var objPath = oEvent.getPath(); // Gets the full path from the context
                            var departmentID = null;

                            var match = objPath.match(/DepartmentID='([^']+)'/);
                            if (match && match[1]) {
                                departmentID = match[1];
                            }

							if (userRole !== departmentID && userRole !== 'Admin') {
                                // Hide "Create" and "Delete" buttons if the user's role does not match department ID or is not an admin
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Button");
                                }).forEach(function (oButton) {
                                    if (oButton.getId().includes("Edit") || oButton.getId().includes("Delete") || oButton.getId().includes("Create")) {
                                        oButton.setVisible(false);
                                    }
                                });
                            }
                            if (userRole !== 'Admin') {
                                debugger
                                // Find all input controls bound to the 'DepartmentName' property
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Input") && control.getBindingPath("value") === "DepartmentName";
                                }).forEach(function (oInput) {
                                    // Make each of these input fields non-editable
                                    oInput.setEditable(false);
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching data', error);
                    }
                }
            }
        }
    });
});