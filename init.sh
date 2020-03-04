#!/bin/bash

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g react-scripts

mkdir ~/vagrant_node_modules
mkdir -p /vagrant_data/front/node_modules/
sudo mount --bind ~/vagrant_node_modules/ /vagrant_data/front/node_modules/

cd /vagrant_data/front/
npm i
npm run build

sudo apt install nginx -y
sudo ln -s /vagrant_data/confs/site.conf /etc/nginx/sites-enabled/
sudo nginx -s reload
