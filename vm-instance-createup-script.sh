#! /bin/bash

# circleci value must match with gcp service account 'sa_<service_account_id>'
circleci=sa_111943818492963297857
appdir=/home/app
appgroup=app
triggerfile=trigger.txt
backupdir=/home/backup
appdbname=app_db_1
backupperimage=stsiwo/backupper
gcsbucketname=stsiwo-backup-bucket
backupfiles=$backupdir/*

sudo apt-get update

### install docker
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

### install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

### docker-compose update script after circileci deployment by incron
mkdir /opt/script
cat <<EOF >> /opt/script/update-docker-compose.sh
#!/bin/bash 
# write any stdout and stderr to syslog
exec 1> >(logger -s -t \$(basename \$0)) 2>&1
echo "successfully run update-docker-compose script"
EOF

### clean up docker resources (unused imges, containers ...) by cron
cat <<EOF >> /opt/script/docker-system-prune.sh
#!/bin/bash
# write any stdout and stderr to syslog
exec 1> >(logger -s -t \$(basename \$0)) 2>&1
echo "running cleanup (docker system prune) for docker resources (daily work)"
docker system prune -f
EOF

### prepare backupper container directory
sudo mkdir $backupdir 

### backupper container run & remove temp backup files 
cat <<EOF >> /opt/script/backup.sh
#!/bin/bash
# write any stdout and stderr to syslog
exec 1> >(logger -s -t \$(basename \$0)) 2>&1
### run backupper container to grab backup data and log from running service container
sudo docker run -v $backupdir:/backup --volumes-from $appdbname $backupperimage 
### start send backup file to gcs
for f in $backupfiles
do
  echo "start handling \$f in backup directory"
  gsutil cp \$f gs://$gcsbucketname
done
### remove used backup files
rm $backupfiles 
EOF


### create group (app) and let circleci user join the group for deployment
sudo groupadd $appgroup 
sudo usermod -a -G $appgroup $circleci 

### prepare app directory
sudo mkdir $appdir
sudo chown root:$appgroup $appdir
sudo chmod 775 $appdir


### prepare trigger file
sudo touch $appdir/$triggerfile
sudo chown root:$appgroup $appdir/$triggerfile
sudo chmod 775 $appdir/$triggerfile 

### incron
sudo apt-get update
sudo apt-get install incron
echo 'root' | sudo tee -a /etc/incron.allow
(sudo incrontab -l ; echo "$appdir/$triggerfile IN_CLOSE_WRITE /bin/bash /opt/script/update-docker-compose.sh") | sort - | uniq - | sudo incrontab -

### cron
# docker resrouce clean up at 00:00 on everyday
(sudo crontab -l ; echo "00 00 * * * /bin/bash /opt/script/docker-system-prune.sh") | sort - | uniq - | sudo crontab -
# backup to gcs at 00:01 on everyday
(sudo crontab -l ; echo "01 00 * * * /bin/bash /opt/script/backup.sh") | sort - | uniq - | sudo crontab -
