#! /bin/bash

# circleci value must match with gcp service account 'sa_<service_account_id>'
circleci=sa_111943818492963297857
appdir=/home/app
appgroup=app
icrontargetfile=docker-compose.staging.yml

sudo apt-get update

### install docker
sudo apt-get install -y\
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

### install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

### docker-compose update script after circileci deployment
mkdir /opt/script
cat <<EOF >> /opt/script/update-docker-compose.sh
#!/bin/bash 
# write any stdout and stderr to syslog
exec 1> >(logger -s -t \$(basename \$0)) 2>&1
echo "successfully run update-docker-compose script"
EOF

### create group (app) and let circleci user join the group for deployment
sudo groupadd $appgroup 
sudo usermod -a -G $appgroup $circleci 

### prepare app directory
sudo mkdir $appdir
sudo chown root:$appgroup $appdir
sudo chmod 775 $appdir

### incron
sudo apt-get update
sudo apt-get install incron
echo 'root' | sudo tee -a /etc/incron.allow
(sudo incrontab -l ; echo "$appdir/$icrontargetfile IN_CLOSE_WRITE /bin/bash /opt/script/update-docker-compose.sh") | sort - | uniq - | sudo incrontab -
