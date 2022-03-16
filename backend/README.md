# Getting Started

## Local Development

- Open a new terminal and run `npm run watch`

## Cloud Foundry

## Build and deploy

```
npm run build
cf push
```

### Create UAA service

```
cf create-service xsuaa application btbtour.uaa -c xs-security.json
```

### Add UAA

Add service reference in manifest.yaml:
```
applications:
-  name: btptour.backend
   path: ./gen/srv
   memory: 4G
   disk_quota: 1024M
   buildpacks:
     - https://github.com/cloudfoundry/nodejs-buildpack
   services:
     - btptour.uaa
   env:
```
