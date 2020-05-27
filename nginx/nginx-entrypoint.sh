#!/bin/sh

mkdir /etc/zipkin
envsubst < "/etc/zipkin-template/zipkin-config.json" > "/etc/zipkin/zipkin-config.json"

/usr/local/openresty/bin/openresty -g "daemon off;"
