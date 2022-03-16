sap.ui.define(
  ["sap/ui/base/Object", "sap/ui/thirdparty/jquery"],
  function (Object, jQuery) {
    "use strict";
    return {
      readData: function (sUrl, sExpands) {
        return new Promise((resolve, reject) => {
          jQuery.ajax({
            url: sUrl,
            type: "GET",
            contentType: "application/json; odata.metadata=minimal",
            success: function (response) {
              resolve(response);
            },
            error: function (error) {
              reject(error);
            },
          });
        });
      },

      updateEntity: function (basicUrl, sUrl, oPayload) {
        return new Promise((resolve, reject) => {
          this.readToken(basicUrl).then((sResponseHeader) => {
            const sPayload = JSON.stringify(oPayload);
            jQuery.ajax({
              url: sUrl,
              type: "PATCH",
              data: sPayload,
              headers: { "X-CSRF-Token": sResponseHeader },
              contentType: "application/json; odata.metadata=minimal",
              success: function (response) {
                resolve(response);
              },
              error: function (error) {
                reject(error);
              },
            });
          });
        });
      },

      createEntity: function (basicUrl, sUrl, oPayload) {
        return new Promise((resolve, reject) => {
          this.readToken(basicUrl).then((sResponseHeader) => {
            const sPayload = JSON.stringify(oPayload);
            jQuery.ajax({
              url: sUrl,
              type: "POST",
              data: sPayload,
              headers: { "X-CSRF-Token": sResponseHeader },
              contentType: "application/json; odata.metadata=minimal",
              success: function (response) {
                resolve(response);
              },
              error: function (error) {
                reject(error);
              },
            });
          });
        });
      },

      deleteEntity: function (basicUrl, sUrl) {
        return new Promise((resolve, reject) => {
          this.readToken(basicUrl).then((sResponseHeader) => {
            jQuery.ajax({
              url: sUrl,
              type: "DELETE",
              headers: { "X-CSRF-Token": sResponseHeader },
              success: function (response) {
                resolve(response);
              },
              error: function (error) {
                reject(error);
              },
            });
          });
        });
      },

      callAction: function (basicUrl, sUrl, oPayload) {
        return new Promise((resolve, reject) => {
          this.readToken(basicUrl).then((sResponseHeader) => {
            const sPayload = JSON.stringify(oPayload);
            jQuery.ajax({
              url: sUrl,
              type: "POST",
              data: sPayload,
              headers: { "X-CSRF-Token": sResponseHeader },
              contentType: "application/json; odata.metadata=minimal",
              success: function (response) {
                resolve(response);
              },
              error: function (error) {
                reject(error);
              },
            });
          });
        });
      },

      readToken: function (basicUrl) {
        return new Promise((resolve, reject) => {
          jQuery.ajax({
            url: `${basicUrl}$metadata`,
            type: "GET",
            headers: {
              "OData-MaxVersion": "4.0",
              "OData-Version": "4.0",
              "X-CSRF-Token": "Fetch",
            },
            success: function (response, status, jqxHr) {
              const oResponseHeader = jqxHr.getResponseHeader("x-csrf-token");
              resolve(oResponseHeader);
            },
            error: function (error) {
              reject(error);
            },
          });
        });
      },
    };
  }
);
