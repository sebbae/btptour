# Initial configuration of Kubernetes/Kyma cluster

Configuration of Kyma cluster and preparation of the Github repository
for CI/CD via Github Actions.

## Prerequisites

* Kyma cluster on SAP BTP Trial
* Kubernetes CLI tool `kubectl`
* Github account (with fork of this repo)


## Prepare cluster

1. Create namespace `btptour`

	```sh
	kubectl create namespace btptour
	```

## Enable Kubernetes/Kyma to pull container images from ghcr.io

1. Create new Personal Access Token (PAT) in Github (Profile > Settings > Developer settings > Personal access tokens) with scope `read:packages`.

1. Create secret for pulling images from Github container registry

	```sh
	kubectl -n btptour create secret docker-registry regcred \
		--docker-server=https://ghcr.io \
		--docker-username=<github user>  \
		--docker-password=<github personal access token>
	```

## Enable Github actions to access the cluster

1. Create service account

	```sh
	kubectl apply -f serviceaccount.yml -n btptour
	```

1. Assemble kubeconfig for service account

	```sh
	bash create_kubeconfig.sh > kubeconfig.yml
	```

1. Encode config file in Base64

	```sh
	cat kubeconfig.yml | base64 > secret.txt
	```

1. Create secret `regcred` in Github repository

	Create secret `BTP_TRIAL_KUBECONFIG` in Github repo (Settings > Secrets > Actions) with content of `secret.txt`.

## Resources

* [Github Actions](https://docs.github.com/en/actions)
* [SAP Tech Bytes: Using GitHub Actions to Deploy Continuously to Kyma/Kubernetes (Blog)](https://blogs.sap.com/2021/08/02/sap-tech-bytes-using-github-actions-to-deploy-continuously-to-kyma-kubernetes/)
* [Create a Kyma service account (Blog)](https://developers.sap.com/tutorials/kyma-create-service-account.html#f60efd9d-c27b-4ab0-a3de-07ad498e1073)
