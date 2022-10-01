# Corso Docker & K8s
## Dockerize .NET REST API + Angular UI

## 1. Prerequisiti
- macOS, Linux or Windows
- [Docker Desktop](https://docs.docker.com/desktop/)
- [K3d](https://k3d.io/v5.4.6/#installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- IDE or editor compatibile
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Rider](https://www.jetbrains.com/rider/)
  - _Anche Vim se vuoi..._ 🤩

## 2. Run con Docker

```bash
docker-compose up
```

## 3. Deploy in K8s  


## Create Local Kubernetes Cluster with K3d

k3d is a lightweight wrapper to run k3s (Rancher Lab’s minimal Kubernetes distribution) in docker.

![K3d Logo](k3d-logo.png)

### Provision Cluster with K3d

The first step is to ensure that the docker engine is running on your machine. Once you've verified that, you can proceed to create a cluster with the following command:

``` bash
k3d cluster create example-cluster --servers 3 --agents 2
```

### Delete Cluster with K3d

You can delete a cluster with the following command:

``` bash
k3d cluster delete example-cluster
```
