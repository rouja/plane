#!/bin/bash

cd apiserver
docker build -t localhost:5001/plane-backend:latest -f Dockerfile.api .

cd ..
docker build -t localhost:5001/plane-frontend:latest -f web/Dockerfile.web .

docker build -t localhost:5001/plane-space:latest -f space/Dockerfile.space .

docker push localhost:5001/plane-backend:latest
docker push localhost:5001/plane-frontend:latest
docker push localhost:5001/plane-space:latest

cat <<EOF

Pour rollout toutes les images dans le cluster k8s :


$ kubectl -n plane rollout restart deployments

EOF
