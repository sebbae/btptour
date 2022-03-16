const cds = require('@sap/cds');
const cds_dk = require('@sap/cds-dk');
const openapi = require('./lib/openapi');

// BEGIN: WORKAROUND
// CAP/node.js does not yet support K8s-style credentials mounted at /etc/secrets/sapcp/*.
// Therefore, we use the @sap/xsenv library to fetch them and plug it into the place
// where CAP also places bound credentials from VCAP_SERVICES in CF. In future update of CAP,
// this workaround can be removed.
if (cds.env === 'development') {
	if ((!process.env.VCAP_SERVICES) && (!require('fs').existsSync('/etc/secrets/sapcp'))) {
		console.warn("No VCAP_SERVICES or /etc/secrets/sapcp bindings found. Adding dummy for startup");
		process.env.VCAP_SERVICES = JSON.stringify({ dummy: [] });
	}

	const xsenv = require('@sap/xsenv');
	const { env } = require('@sap/cds');
	const services = xsenv.readServices();
	if (!services || !services.xsuaa) {
		console.warn('No XSUAA service binding found');
	} else {
		Object.assign(cds.requires.uaa, services.xsuaa);
	}
}
// END: WORKAROUND

cds.once('bootstrap', async app => {
	app.use((req, res, next) => {
		console.log("Incoming: " + req.method + " : " + req.url);
		next(); // this will invoke next middleware function
	});

	// register OpenAPI specification and UI for REST handlers
	const apiSpec = await openapi.fromFiles('BTP Demo', './srv/routes/*');
	openapi.serve(app, '/api-docs/rest', apiSpec);
});

cds.on('serving', async (service) => {
	if (cds.compile.to.openapi) {
		// register OpenAPI specification and UI for CDS OData services
		const apiSpec = await openapi.fromService(service);
		openapi.serve(cds.app, `/api-docs${service.path}`, apiSpec);
		openapi.addLinkToIndexHtml(service, `/api-docs${service.path}`);
	}
});

// delegate to CDS default server
module.exports = cds.server;
