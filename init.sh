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

sudo apt install -y postgresql postgresql-contrib
sudo apt install -y python3-pip
sudo apt install -y virtualenv

virtualenv -p python3 /home/vagrant/popo/
/home/vagrant/popo/bin/pip install -r /vagrant_data/dummy/requirements.txt

sudo su
sudo echo "127.0.0.1 db" >> /etc/hosts
exit

sudo cp /vagrant_data/confs/pg_hba.conf /etc/postgresql/10/main/pg_hba.conf
sudo cp /vagrant_data/confs/postgresql.conf /etc/postgresql/10/main/postgresql.conf

sudo -i -u postgres
createuser popo
psql -c "ALTER USER popo WITH PASSWORD '123'"
psql -c "CREATE DATABASE popo OWNER popo"
exit

sudo systemctl restart postgresql

/home/vagrant/popo/bin/python /vagrant_data/dummy/Popoeshnick/manage.py db init
/home/vagrant/popo/bin/python /vagrant_data/dummy/Popoeshnick/manage.py db migrate
