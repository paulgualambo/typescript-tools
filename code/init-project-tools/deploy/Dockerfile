FROM ubuntu:latest

VOLUME /data
# Set the working directory
WORKDIR /app

RUN apt update
RUN apt install curl -y
RUN curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
RUN bash install_nvm.sh
RUN source ~/.bashrc
RUN nvm install v18.15.0 
RUN npm install -g npm@9.6.4

# Copy the application code to the container
#COPY . /app
EXPOSE 80