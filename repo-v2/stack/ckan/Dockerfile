###################
### Extensions ####
###################
FROM ghcr.io/keitaroinc/ckan:2.9.5-focal as extbuild

# Locations and tags, please use specific tags or revisions
ENV BD_GIT_URL=https://github.com/guialvesp1/ckanext-basedosdados
ENV BD_GIT_BRANCH=main

# Switch to the root user
USER root

# Install any system packages necessary to build extensions
# Make sure we install python 3.8, cause CKAN is not compatible with 3.9
# RUN apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/v3.13/main \
        # python3-dev=3.8.10-r0 \
        # gcc \
        # g++ \
        # linux-headers \
        # musl-dev

# Fetch and build the custom CKAN extensions
RUN pip wheel --wheel-dir=/wheels git+${BD_GIT_URL}@${BD_GIT_BRANCH}#egg=ckanext-basedosdados
RUN pip wheel --wheel-dir=/wheels -r https://raw.githubusercontent.com/guialvesp1/ckanext-basedosdados/${BD_GIT_BRANCH}/requirements.txt
RUN curl -o /wheels/basedosdados.txt https://raw.githubusercontent.com/guialvesp1/ckanext-basedosdados/${BD_GIT_BRANCH}/requirements.txt

# Switch to the ckan user
USER ckan

############
### MAIN ###
############
FROM ghcr.io/keitaroinc/ckan:2.9.5-focal
LABEL maintainer="Base dos Dados <contato@basedosdados.org>"

# Add the custom extensions to the plugins list
ENV CKAN__PLUGINS envvars basedosdados image_view text_view recline_view datastore datapusher

# Switch to the root user
USER root

COPY --from=extbuild /wheels /srv/app/ext_wheels

# Install and enable the custom extensions
RUN pip install --no-index --find-links=/srv/app/ext_wheels ckanext-basedosdados && \
    pip install --no-index --find-links=/srv/app/ext_wheels -r /srv/app/ext_wheels/basedosdados.txt && \
    # Configure plugins
    ckan config-tool "${APP_DIR}/production.ini" "ckan.plugins = ${CKAN__PLUGINS}" && \
    chown -R ckan:ckan /srv/app

# Remove wheels
RUN rm -rf /srv/app/ext_wheels

# Switch to the ckan user
USER ckan
