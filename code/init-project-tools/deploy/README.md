docker build -t ubuntu-test-img .  
docker run -v $(pwd)/../app:/app -td --name=ubuntu-test-img  ubuntu-test-img 
docker exec -it ubuntu-test-img bash  

docker volume create app
docker volume create data
docker volume list


sudo usermod -aG docker $USER
sudo chown $USER /var/run/docker.sock
newgrp docker

docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q) -f