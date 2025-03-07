#!/bin/bash -ex

cd $(git rev-parse --show-toplevel)

HOST=${HOST:-basedosdados.org}

SSH="ssh -o StrictHostKeyChecking=no -i ~/.ssh/BD.pem $HOST"
VTAG=":`date +%m%d.%H%M.%S`" # Simple mechanism to force image update

BUILD_DIR="/tmp/bdd_build"

deploy() {
    clean
    build_config
    build_images
    send
    load_images
    restart_services
    rebuild_index
    install_crontab
    install_bashrc
    # install_apprise
}

deploy_configs() {
    clean
    build_config
    send
    restart_services
}

clean() {
    rm -rf $BUILD_DIR ./build
    mkdir -p $BUILD_DIR/images
    ln -s $BUILD_DIR ./build
}

build_config() {
    cp docker-compose.yaml build/docker-compose.yaml
    cp configs/docker-compose.override.prod.yaml build/docker-compose.override.yaml
    cp utils/backup-database.sh build/
    cp configs/nginx.conf build/
    cp .env.prod build/.env && echo -e "VTAG=$VTAG\nHOSTNAME=$HOST" >> build/.env

    cp -r experimental/monitoring build/

    cp configs/basedosdados_crontab build/basedosdados_crontab
    cp configs/bashrc build/

    if [[ $HOST == "ec2-user@staging.basedosdados.org" ]]; then
        cp utils/restore_database_backup_from_s3.sh build/restore_database_backup_from_s3.sh && \
        chmod +x build/restore_database_backup_from_s3.sh
        cat configs/basedosdados_crontab_staging >> build/basedosdados_crontab
    fi
}

send() {
    $SSH 'mkdir -p ~/basedosdados/'
    # TODO: debug this, the size-only seems to be failing...
    rsync -e 'ssh -i ~/.ssh/BD.pem' -azvv --progress --partial --inplace ./build/images/ $HOST:~/basedosdados/images/ &
    rsync -e 'ssh -i ~/.ssh/BD.pem' -azvv --exclude=images --checksum --inplace ./build/ $HOST:~/basedosdados/ &
    for i in `jobs -p`; do wait $i ; done
}

load_images() {
    $SSH "
        docker load < ~/basedosdados/images/ckan
        docker load < ~/basedosdados/images/solr
        docker load < ~/basedosdados/images/db
        docker load < ~/basedosdados/images/next
    "
}

restart_services() {
    $SSH  '
        set -ex ; cd ~/basedosdados/
        if [[ ! -f wait-for-200.sh ]]; then curl https://raw.githubusercontent.com/cec/wait-for-endpoint/master/wait-for-endpoint.sh > wait-for-200.sh && chmod +x wait-for-200.sh; fi
        if [[ ! -f wait-for-it.sh ]]; then curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh > wait-for-it.sh && chmod +x wait-for-it.sh; fi
        export HOSTNAME=$HOSTNAME
        docker-compose rm -sf ckan next autoheal
        docker-compose up --no-build -d
        docker-compose ps
        docker-compose restart nginx
    '
}

rebuild_index() {
    $SSH  '
        cd ~/basedosdados/
        docker-compose exec -T ckan ckan search-index rebuild --refresh --verbose
    '

}

build_images() {
    export COMPOSE_DOCKER_CLI_BUILD=1
    export DOCKER_BUILDKIT=1
    if [[ ! -d vendor/ckan/.git ]]; then ./utils/clone-ckan.sh; fi
    VTAG=$VTAG docker-compose build --parallel ckan next
    VTAG=$VTAG docker save bdd/ckan$VTAG > build/images/ckan
    VTAG=$VTAG docker save bdd/next$VTAG > build/images/next

    docker-compose build --parallel db solr
    docker save bdd/solr > build/images/solr
    docker save bdd/db > build/images/db
}

restart_monitoring() {
    $SSH  '
        cd ~/basedosdados/monitoring
        docker-compose down && docker-compose up -d
    '
}

install_crontab() {
    $SSH  '
        (
        echo "####### AUTO GENERATED CRONTAB - DONT EDIT MANUALLY ##########"
        cat ~/basedosdados/basedosdados_crontab
        ) | crontab
    '
}

install_bashrc() {
    $SSH  '
        (
        echo "####### AUTO GENERATED BASHRC - DONT EDIT MANUALLY ##########"
        cat ~/basedosdados/bashrc
        ) > ~/.bashrc
    '
}

# install_apprise() {
#     $SSH  '
#         cd ~/basedosdados/
#         source .env
#         echo $APPRISE_CONFIG > ~/.apprise
#         grep DISCORD .env | sed s/DISCORD_//g > ~/.discord_ids
#     '
# }

for i in "$@"; do $i; done
