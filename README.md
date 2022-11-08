# Corso Docker & K8s
## Dockerize .NET REST API + Angular UI

## 1. Requirements/Prerequisites
- macOS, Linux or Windows
- [Docker Desktop](https://docs.docker.com/desktop/)
- [K3d](https://k3d.io/v5.4.6/#installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- IDE or editor compatibile
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Rider](https://www.jetbrains.com/rider/)
  - _Anche Vim se vuoi..._ 🤩

[wsl2]
guiApplications=false
memory=3GB # Limits VM memory in WSL 2 to 4 GB
processors=4 # Makes the WSL 2 VM use two virtual processors

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
k3d cluster create corso-cluster --api-port 6550 -p "8081:80@loadbalancer" --servers 1 --agents 1 
```

### Delete Cluster with K3d

You can delete a cluster with the following command:

``` bash
k3d cluster delete corso-cluster
```

### Deploy registry
``` bash
docker run -d -p 5000:5000 --restart=always --name registry -v /mnt/registry:/var/lib/registry registry:2
``` 

### Push image

``` bash
docker build corso-ui
docker build corso-api
docker tag corso-ui localhost:5000/corso-ui 
docker tag corso-api localhost:5000/corso-api
docker push localhost:5000/corso-ui
docker push localhost:5000/corso-api 
``` 


### Create namesapce

``` bash
kubectl create namespace corso

``` 

### Deploy Manifest on k8s

``` bash
kubectl apply -f api.yaml -n corso
kubectl apply -f db.yaml -n corso
kubectl apply -f ui.yaml -n corso
``` 

### Navigate to app on localhost:8081
