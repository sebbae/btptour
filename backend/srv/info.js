const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    srv.on('READ', 'UserInfo', whoami);

    async function whoami(req) {
        const username = (req.user && req.user.id) ? req.user.id : "anonymous";
        const details = (req.user) ? JSON.stringify(req.user) : "<missing>";
        return {
            Username: username,
            Details: details
        };
    }
});
