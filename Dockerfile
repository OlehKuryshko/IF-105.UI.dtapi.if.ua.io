FROM node:14.9.0-alpine3.10
ARG WORK_DIR=/tmp/src/
WORKDIR ${WORK_DIR}
RUN apk update && apk --no-cache add curl wget git
RUN git clone https://github.com/OlehKuryshko/IF-105.UI.dtapi.if.ua.io.git 
RUN npm i npm@latest -g && npm i -g @angular/cli && npm i --prefix ./IF-105.UI.dtapi.if.ua.io
RUN sed -i "s|http://localhost/api/|http://dtester-demo.devops.rebrain.srwx.net/api/|" ./IF-105.UI.dtapi.if.ua.io/src/environments/environment.ts && \
    sed -i "s|http://localhost/api/|http://dtester-demo.devops.rebrain.srwx.net/api/|" ./IF-105.UI.dtapi.if.ua.io/src/environments/environment.prod.ts
RUN cd ./IF-105.UI.dtapi.if.ua.io/ && ng build --prod
RUN mv /tmp/src/IF-105.UI.dtapi.if.ua.io/conf/.htaccess /tmp/src/IF-105.UI.dtapi.if.ua.io/dist/IF105/.htaccess

FROM alpine:3.12.0
RUN apk update && apk --no-cache upgrade
RUN apk add --no-cache apache2 && \
    rm -rf /var/www/localhost/htdocs/index.html && \
    mkdir -p /etc/apache2/sites-available/
COPY --from=0  /tmp/src/IF-105.UI.dtapi.if.ua.io/conf/httpd.conf /etc/apache2/httpd.conf
COPY --from=0  /tmp/src/IF-105.UI.dtapi.if.ua.io/dist/IF105/ /var/www/localhost/htdocs
COPY --from=0  /tmp/src/IF-105.UI.dtapi.if.ua.io/conf/dtapi.conf /etc/apache2/sites-available/dtapi.conf
RUN chown apache. -R /var/www/localhost/htdocs/

CMD ["-D","FOREGROUND"]
ENTRYPOINT ["/usr/sbin/httpd"]