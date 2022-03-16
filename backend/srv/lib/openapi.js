async function serveApiDocs(app, path, spec) {
	const swaggerUi = require('swagger-ui-express');

	// serve spec document
	app.get(path + '/api-docs.json', function (req, res) {
		res.setHeader('Content-Type', 'application/json');
		res.send(spec);
	});
	let options = {
		explorer: true,
		swaggerOptions: {
		//	docExpansion: "none"
		}
	};
	// serve UI
	app.use(path, (req, res, next) => {
		spec.host = req.get('host');
		spec.components.securitySchemes = {
			"Bearer Token": {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		};
		spec.security = [
			{
				"Bearer Token": []
			}
		]
		req.swaggerDoc = spec;
		next();
	}, swaggerUi.serve, swaggerUi.setup(spec, options));
}

async function fromFiles(name, files) {
	const swaggerJSDoc = require('swagger-jsdoc');

	let options = {
		swaggerDefinition: {
			openapi: '3.0.0',
			info: {
				title: name,
			},
		},
		apis: Array.isArray(files) ? files : [files]
	}
	let swaggerSpec = swaggerJSDoc(options);
	swaggerSpec.components.requestBodies = [];
	return swaggerSpec;
}

async function fromService(service) {
	// requires @sap/cds-dk >= 3.3.0
	return cds.compile.to.openapi(service.model, {
		service: service.name,
		'openapi:url': service.path,
		'openapi:diagram': true
	});
}

function addLinkToIndexHtml(service, apiPath) {
	const provider = (_entity) => ({
		href: apiPath,
		name: 'Swagger UI',
		title: 'Show in Swagger UI',
	});
	// Needs @sap/cds >= 4.4.0
	service.$linkProviders ? service.$linkProviders.push(provider) : service.$linkProviders = [provider];
}

module.exports = {
	serve: serveApiDocs,
	fromFiles: fromFiles,
	fromService: fromService,
	addLinkToIndexHtml: addLinkToIndexHtml
};
