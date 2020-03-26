#!/bin/bash

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs postgresql postgresql-contrib python3-pip virtualenv nginx bash-completion -y
sudo npm install -g react-scripts

mkdir -p ~/vagrant_node_modules
mkdir -p /vagrant_data/front/node_modules/
sudo mount --bind ~/vagrant_node_modules/ /vagrant_data/front/node_modules/

cd /vagrant_data/front/
npm i
npm run build

virtualenv -p python3 /home/vagrant/popo/
/home/vagrant/popo/bin/pip install -r /vagrant_data/dummy/requirements.txt

sudo cp /vagrant_data/confs/site.conf /etc/nginx/sites-enabled/
sudo cp /vagrant_data/confs/hosts /etc/hosts
sudo cp /vagrant_data/confs/pg_hba.conf /etc/postgresql/10/main/pg_hba.conf
sudo cp /vagrant_data/confs/postgresql.conf /etc/postgresql/10/main/postgresql.conf
sudo cp /vagrant_data/confs/confs/popo-back.service /etc/systemd/system/
sudo systemctl daemon-reload

sudo -u postgres createuser popo
sudo -u postgres psql -c "ALTER USER popo WITH PASSWORD '123'"
sudo -u postgres psql -c "CREATE DATABASE popo OWNER popo"

sudo systemctl restart nginx
sudo systemctl restart postgresql

rm -rf /vagrant_data/dummy/Popoeshnick/migrations/

/home/vagrant/popo/bin/python /vagrant_data/dummy/Popoeshnick/manage.py db init -d /vagrant_data/dummy/Popoeshnick/migrations/
/home/vagrant/popo/bin/python /vagrant_data/dummy/Popoeshnick/manage.py db migrate -d /vagrant_data/dummy/Popoeshnick/migrations/
/home/vagrant/popo/bin/python /vagrant_data/dummy/Popoeshnick/manage.py db upgrade -d /vagrant_data/dummy/Popoeshnick/migrations/

mkdir -p /var/log/uwsgi/
sudo chown vagrant /var/log/uwsgi/
#/home/vagrant/popo/bin/uwsgi --ini /vagrant_data/dummy/Popoeshnick/wsgi.ini
sudo systemctl popo-back.service start

