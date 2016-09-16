#!/usr/bin/env bash
export DB_USER=kitt

# update before the show begins
apt-get update

# Some basic tools
apt-get install -y vim htop

apt-get install -y postgresql postgresql-contrib

# straight configs
sudo sh -c  "echo 'host all all all password' >> /etc/postgresql/9.3/main/pg_hba.conf"
sudo sh -c  "echo listen_addresses = \'*\' >> /etc/postgresql/9.3/main/postgresql.conf"

# Create DB for Test and develoment usage
sudo -u postgres createuser ${DB_USER} -s       # -s for superuser
sudo -u postgres psql -c "alter user $DB_USER with password 'hack';"

sudo service postgresql restart