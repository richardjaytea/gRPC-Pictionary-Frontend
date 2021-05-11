# infipic-frontend-ts

## Project setup
```
npm install
```

### Complies and generates protobuf files
```
protoc -I=. services.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=typescript,mode=grpcwebtext:.
```
### Deploy envoy proxy container
```
docker run --name envoy-proxy -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8081:8081 -p 8082:8082 -p 8083:8083 -p 8084:8084 -p 9901:9901 envoyproxy/envoy:v1.17.0
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
