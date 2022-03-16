sap.ui.define([
    "me/baechle/btptour/people/util/ODataHelper"
],
    function (ODataHelper) {
        "use strict";

        return {
            call: function (oEvent) {
                sap.m.MessageBox.alert("Not implemented yet.");
                return;
                const oModel = oEvent.getModel();
                const basicUrl = oModel.sServiceUrl;
                const sUrl = `${basicUrl}CHANGEME`;

                var oPayload = {
                    PERSON_Id: oEvent.getObject().Id,
                };

                ODataHelper.callAction(basicUrl, sUrl, oPayload).then(
                    function (response) {
                        console.log("response", response);
                        location.reload();
                    }.bind(this)
                );
            },
        };
    }
);
