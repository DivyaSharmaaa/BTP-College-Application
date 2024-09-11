sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t="divya.sharma@peolsolutions.com";var t;return e.extend("lec.ext.controller.Objectteacher",{override:{onInit:function(){debugger;var e=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:async function(e){debugger;var t=this.getView().getModel("ui");var a=t.oData.editMode;var n=this.base.getView().byId("lec::TeacherObjectPage--fe::CustomSubSection::Att--uploadSet");var i=n.getBindingInfo("items");var r=i.template;if(a=="Editable"){n.setUploadButtonInvisible(false);r.setVisibleRemove(true);r.setVisibleEdit(true);n.setUploadEnabled(true)}else{n.setUploadButtonInvisible(true);r.setVisibleRemove(false);r.setVisibleEdit(false);n.setUploadEnabled(false)}debugger;var o=this.base.getExtensionAPI().getModel();if(!o){console.error("Model is not available.");return}const s=this.base.getView();const l=s.mAggregations.content[0];debugger;const u=l.findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")&&(e.getId().includes("Save")||e.getId().includes("Edit")||e.getId().includes("Delete"))});const c=u[0];const d=u[1];const g=u[2];setTimeout(function(){debugger;if(g.getText().includes("Create")){g.setText("Send for Approval")}}.bind(this),1e3);var f;if(typeof o.getServiceUrl==="function"){f=o.getServiceUrl();console.log("Service URL:",f)}else{console.error("Unable to determine the service URL.");return}debugger;this.adjustUIControls();await this.fetchAndProcessData(f)}}},adjustUIControls:function(){var e=this;setTimeout(function(){e.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")||e.isA("sap.m.DatePicker")||e.isA("sap.m.Input")||e.isA("sap.m.TextArea")||e.isA("sap.m.ComboBox")}).forEach(function(t){var a=t.getId();if(t.isA("sap.m.Input")&&a.includes("Age")){t.setEditable(false)}if(t.isA("sap.m.DatePicker")&&a.includes("Dob")){t.attachChange(function(){var a=t.getDateValue();if(a){var n=e.calculateAge(a);e.setAgeField(n)}});var n=t.getDateValue();if(n){var i=e.calculateAge(n);e.setAgeField(i)}}if(t.isA("sap.m.Button")&&a.includes("Save")&&t.getVisible()===true){debugger;var r=this.base.getView();var o=r.findAggregatedObjects(true);var s=o.filter(function(e){return e.getId().includes("uploadSet-uploader")});s.forEach(function(e){e.setVisible(true)});var l=o.filter(function(e){return e.getId().includes("uploadSet")});l.forEach(function(e){console.log("Control ID:",e.getId());console.log("Control Type:",e.getMetadata().getName());if(e.isA("sap.m.Button")&&e.getId().includes("deleteButton")){e.setVisible(true);e.setEnabled(true)}})}if(t.isA("sap.m.Button")&&a.includes("Save")&&t.getVisible()===false){debugger;var r=this.base.getView();var o=r.findAggregatedObjects(true);var s=o.filter(function(e){return e.getId().includes("uploadSet-uploader")});s.forEach(function(e){e.setVisible(false)});var l=o.filter(function(e){return e.getId().includes("uploadSet")});l.forEach(function(e){console.log("Control ID:",e.getId());console.log("Control Type:",e.getMetadata().getName());if(e.isA("sap.m.Button")&&e.getId().includes("deleteButton")){e.setVisible(false);e.setEnabled(false)}})}if(t.isA("sap.m.Input")&&a.includes("Age")){var u=e.base.getView().byId("nwteacher::TeacherObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::DOB::Field-edit");if(u){var n=u.getDateValue();if(n){var i=e.calculateAge(n);t.setValue(i)}}}}.bind(e))}.bind(e),500)},calculateAge:function(e){var t=new Date;var a=new Date(e);if(a>t){alert("Birthdate is in the future. Age cannot be calculated.");console.log("Birthdate is in the future. Age cannot be calculated.");return null}var n=t.getFullYear()-a.getFullYear();var i=t.getMonth()-a.getMonth();if(i<0||i===0&&t.getDate()<a.getDate()){n--}if(n>=18){return n}else{alert("You must be at least 18 years old.");return null}},setAgeField:function(e){var t=this;setTimeout(function(){t.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Input")&&e.getId().includes("Age")}).forEach(function(t){t.setValue(e);console.log("Age field set to:",e)})}.bind(t),500)},fetchAndProcessData:async function(e){var a=this;try{const a=await new Promise((t,a)=>{jQuery.ajax({url:e+"/authorisation",method:"GET",dataType:"json",success:function(e){t(e)},error:function(e,t,n){a(new Error(t+": "+n))}})});const u=await new Promise((t,a)=>{jQuery.ajax({url:e+"/Department",method:"GET",dataType:"json",success:function(e){t(e)},error:function(e,t,n){a(new Error(t+": "+n))}})});debugger;console.log("Fetched auth data:",a);console.log("Fetched dept data:",u);if(a&&a.value&&Array.isArray(a.value)&&u&&u.value&&Array.isArray(u.value)){var n=a.value.find(e=>e.Email===t);if(!n){debugger;console.error("User not found in authorisation data.");return}var i=n.role;console.log(`User Role: ${i}`);var r=this.getView().getBindingContext();var o=r.getPath();var s=null;var l=o.match(/DepartmentID='([^']+)'/);if(l&&l[1]){s=l[1]}if(i!==s&&i!=="Admin"){this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")}).forEach(function(e){if(e.getId().includes("Edit")||e.getId().includes("Delete")||e.getId().includes("Create")){e.setVisible(false)}})}if(i!=="Admin"){debugger;this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Input")&&e.getBindingPath("value")==="DepartmentName"}).forEach(function(e){e.setEditable(false)})}}}catch(e){console.error("Error fetching data",e)}try{var u=window.location.href;var c=u.split("#")[1];console.log(c);var d=c.match(/ttuuid=([^,]+)/)[1];console.log(d);const t=await new Promise((t,a)=>{jQuery.ajax({url:`${e}/Teacher(ttuuid=${d},IsActiveEntity=true)`,method:"GET",dataType:"json",success:function(e){t(e)},error:function(e,t,n){console.error("Error fetching role data",e,t,n);a(new Error(t+": "+n))}})});console.log(t);var i;if(t&&t.Status){console.log(t.Status);if(t.Status==="Approved"){i=t.Status;console.log("userRole: ",i)}}else{console.log("No data found or invalid response format")}this.base.getView().findAggregatedObjects(true,function(e){return e.isA("sap.m.Button")}).forEach(function(e){if(e.getId().includes("Edit")||e.getId().includes("Delete")){if(i==="Approved"){e.setVisible(true);e.setEnabled(true)}else{e.setVisible(false);e.setEnabled(false)}}})}catch(e){console.error("Error fetching role data",e)}}})});
//# sourceMappingURL=Objectteacher.controller.js.map