sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

   var useremail = 'divya.sharma@peolsolutions.com';

// var useremail ;

	return ControllerExtension.extend('dep.ext.controller.ListEmail', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf dep.ext.controller.ListEmail
             */
			onInit: function () {
			    // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
                // var oModel = this.base.getExtensionAPI().getModel();
                // var oUser = new sap.ushell.services.UserInfo().getEmail();
                // useremail = oUser;
            //     console.log(oUser);
            //   console.log(useremail);

                //    this.base.getView().findAggregatedObjects(true, function (control) {
                //     return control.isA("sap.m.Button");
                // }).forEach(function (oButton) {
                //     if (oUser === 'mailto:sakshi.jha@peolsolutions.com') {
                //         if (oButton.getId().includes("Create") || oButton.getId().includes("Delete")) {
                //             oButton.setVisible(false);
                //         }
                //     }
                // });
                 
            },
             /**
             * Called before the view is rendered.
             * This is a suitable place to execute code before binding occurs.
             */
             routing:{
             onBeforeBinding: async function () {
                // Access the Fiori elements extensionAPI via this.base.getExtensionAPI
                debugger; // Use for debugging purposes
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

                // Perform any asynchronous operations here using jQuery AJAX
                try {
                    const response = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            url: sServiceUrl + "/authorisation", // Adjust 'YourEntitySet' as needed
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

                    console.log('Fetched data:', response);

                        if (response && response.value && Array.isArray(response.value)) {
                            // Extract specific column values
                            const adminname = response.value
                                .filter(authorisation => authorisation.Email === useremail)
                                .map(authorisation => authorisation.role)[0];
                            debugger;
                            console.log(adminname);

                            if (adminname !== 'Admin') {
                                // Hide "Create" and "Delete" buttons if the user is not an admin
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Button") && (control.getId().includes("Create") || control.getId().includes("Delete"));
                                }).forEach(function (oButton) {
                                    oButton.setVisible(false);
                                });

                                // Hide draft-related buttons
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Button") && (control.getId().includes("Draft") || control.getId().includes("Save"));
                                }).forEach(function (oButton) {
                                    oButton.setVisible(false);
                                });

                                // Set draft-related fields to read-only
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Input") && control.getId().includes("Draft");
                                }).forEach(function (oInput) {
                                    oInput.setEditable(false);
                                });

                                // Set "Editing Status" to "All" (Hiding Draft)
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Select") && control.getId().includes("EditingStatus");
                                }).forEach(function (oSelect) {
                                    oSelect.setSelectedKey("All");
                                    oSelect.setEnabled(false);
                                });

                                // Set filter conditions
                                const filterId = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;
                                var oFilterBar = sap.ui.getCore().byId(filterId);
                                var oFilterConditions = {
                                    "$editState": [
                                        {
                                            "operator": "DRAFT_EDIT_STATE",
                                            "values": [
                                                "ALL_HIDING_DRAFTS",
                                                "All (Hiding Drafts)"
                                            ],
                                            "validated": "Validated"
                                        }
                                    ]
                                };
                                oFilterBar.setFilterConditions(oFilterConditions);
                            }

                            if (adminname === undefined) {
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    // Check if the control is of type sap.m.Button
                                    if (control.isA("sap.fe.macros.controls.FilterBar")) {
                                        // Set the visibility of the FilterBar control to false
                                        control.setVisible(false);
                                    }
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