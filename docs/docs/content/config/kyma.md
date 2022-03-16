# Initial configuration of Kubernetes/Kyma cluster

Configuration of Kyma cluster and preparation of the Github repository
for CI/CD via Github Actions.

## Prerequisites

* Kyma cluster on [SAP BTP Trial](https://hanatrial.ondemand.com){target=_blank}
* Kubernetes CLI tool `kubectl` with a [connection to your Kyma cluster](./bas.md#setup-access-to-kyma-cluster)
* Account on [github.com](https://github.com){target=_blank}

## Prepare cluster

- Create namespace `btptour`

```sh
kubectl create namespace btptour
```

**Hint**: You can use the [Terminal window](./bas.md#install-command-line-tool-for-kyma) of the Business Application Studio to run all commands and scripts listed on a Windows machine.

!!! hint
    You can use the [Terminal window](./bas.md#install-command-line-tool-for-kyma) of the Business Application Studio to run all commands and scripts listed on a Windows machine.

## Enable Kubernetes/Kyma to pull container images from ghcr.io

- Create new Personal Access Token (PAT) in Github (Profile > Settings > Developer settings > Personal access tokens) with scope `read:packages`.

- Create secret for pulling images from Github container registry

```sh
kubectl -n btptour create secret docker-registry regcred \
	--docker-server=https://ghcr.io \
	--docker-username=<github user>  \
	--docker-password=<github personal access token>
```

## Enable Github actions to access the cluster

- Create service account

```sh
kubectl apply -f serviceaccount.yml -n btptour
```

- Assemble a cluster access configuration for the service account

    The access configuration for the cluster can be created with the [create\_kubeconfig.sh](https://github.com/sebbae/btptour/blob/main/kubernetes/create_kubeconfig.sh) shell script and stored in the file *kubeconfig.yml* as follows:

```sh
bash create_kubeconfig.sh > kubeconfig.yml
```

- Encode the cluster access configuration in Base64

    For use within Github Actions the configuration text file needs to be converted to a text file in Base64 encoding:

```sh
cat kubeconfig.yml | base64 > secret.txt
```

- Add the config securely to the Github repository

    Create a new secret with the name `BTP_TRIAL_KUBECONFIG` in the Github repository (Settings > Secrets > Actions) with the contents of the *secret.txt* file.

## Resources

* [Github Actions](https://docs.github.com/en/actions){target=_blank}
* [SAP Tech Bytes: Using GitHub Actions to Deploy Continuously to Kyma/Kubernetes (Blog)](https://blogs.sap.com/2021/08/02/sap-tech-bytes-using-github-actions-to-deploy-continuously-to-kyma-kubernetes/){target=_blank}
* [Create a Kyma service account (Blog)](https://developers.sap.com/tutorials/kyma-create-service-account.html#f60efd9d-c27b-4ab0-a3de-07ad498e1073){target=_blank}
