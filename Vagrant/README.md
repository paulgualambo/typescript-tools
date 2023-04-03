# VM Vagrant

## Vagrantfile

En el vagrant file configurar su maquina virtual con las siguientes lineas:
name_so = "amazonlinux2"
so = "gbailey/amzn2"
vm_name = ""
vm_hostname = ""
bridged_network = "COLOCAR SU ADAPTADOR DE RED" #en power shell "ipconfig /all"
ip_address_assigned = "COLOCAR EL IP POR EL CUAL DESEA CONECTARSE"

1.- Ingresar a la carpeta de vagrant y editar el archivo Vagrantfile con el nombre de su red y el ip por el cual desea conectarse.
$ vagrant up
$ vagrant ssh

2.- Instalación base

--Software Base

```sh
sudo apt update
sudo apt upgrade -y
sudo apt install curl -y
sudo apt install git -y
```

--Software NVM

--Instalación de typescript
