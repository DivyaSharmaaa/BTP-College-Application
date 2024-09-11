sap.ui.define([
    "sap/m/MessageToast",
], function(MessageToast) {
    'use strict';

    return {
        // onPress: function(oEvent) {
        //     MessageToast.show("Custom handler invoked.");
        // },
        onAfterItemAdded: async function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
			var pattern = /Teacher\([^)]*\)/;
			var match = window.location.href.match(pattern);
			if (match) {
    			var entityUrl = match[0];
			}
            //var hashPart = window.location.href.split('#')[1];
            var item = oEvent.getParameter("item")
            // this._createEntity(item)
            var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size
            };

            var settings = {
                url: baseUrl + entityUrl + '/TeatoFile',
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            }

        try {
                const id = await new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            resolve(results.ID);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
                // this._uploadContent(item, id);
                debugger;
                var url = baseUrl + `Files(ID=${id},IsActiveEntity=false)/content`;
                item.setUploadUrl(url);
                item.setUrl(url);
                var oUploadSet = this.byId("uploadSet");
                oUploadSet.setHttpRequestMethod("PUT");
                oUploadSet.uploadItem(item);
            } catch (err_1) {
                console.log(err_1);
            }
        },

        onUploadCompleted: function (oEvent) {
            debugger
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
         
        },

        onOpenPressed: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            
            let fileurl = oEvent.oSource.mProperties.url;
			var pattern = /Files.*$/;
			var match = fileurl.match(pattern);
			if (match) {
    			var entityUrl = baseUrl + match[0];
			}
			oEvent.oSource.mProperties.url = entityUrl;
        },

		onAfterItemRemoved: function (oEvent) {
          debugger
        //     var baseUrl = oEvent.oSource.getModel().getServiceUrl();
        //     var item = oEvent.getParameter("item");
        //     var id = item.getBindingContext().getProperty("ID");
		// 	var urll = baseUrl + `Files(ID=${id},IsActiveEntity=false)`
  
		// 	$.ajax({ 
    	// 		url: urll,
    	// 		method: "DELETE"
        var baseUrl = oEvent.oSource.getModel().getServiceUrl()
        const regex = /^(.*?),IsActiveEntity=/;

        let match = oEvent.mParameters.item.mProperties.url.match(regex);
        let urll = match[1] + ",IsActiveEntity=false)";
        urll = urll.replace(/^.*\/Files/, "/Files");
        $.ajax({
            url: baseUrl + urll,
            method: "DELETE"
			})
        },
        
    }			
});

