#!/bin/bash
API_SERVER_URL=$(kubectl config current-context)
SECRET_NAME=$(kubectl get sa -n btptour btptour-service-account -ojsonpath='{.secrets[0].name}')
CA=$(kubectl get secret/$SECRET_NAME -n btptour -o jsonpath='{.data.ca\.crt}')
TOKEN=$(kubectl get secret/$SECRET_NAME -n btptour -o jsonpath='{.data.token}')
DEC_TOKEN=$(base64 -d <<< $TOKEN)

cat <<EOT
apiVersion: v1
kind: Config
clusters:
- name: default-cluster
  cluster:
    certificate-authority-data: $CA
    server: https://api.$API_SERVER_URL
users:
- name: default-user
  user:
    token: $DEC_TOKEN
contexts:
- name: default-context
  context:
    cluster: default-cluster
    namespace: btptour
    user: default-user
current-context: default-context
EOT
