[Volver al indice](../README.md)

# Backend NODEJS

## Instalación

```bash
npm install npm install body-parser express jsonwebtoken mysql morgan request --save

npm install nodemon -g
```

## Ejecución

```bash
nodemon index.js
```

## Rutas de acceso

### **Login**

```json
curl --request POST \
  --url http://localhost:9696/login/user \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data username=admin_proxy \
  --data password=wxN0jK9pMHu1

{
  "status": true,
  "msg": "login correct",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E"
}
```

### **Check Login**

```bash
curl --request GET \
  --url http://localhost:9696/user/Check \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'
{
  "status": true,
  "msg": "jwt ok"
}
```

### **Mapa de Calor**

```bash
curl --request GET \
  --url http://localhost:9696/mapaCalor/GetData \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'

{
  "status": true,
  "msg": "paises encontrados",
  "data": [
    {
      "country": "Netherlands",
      "cantidad": 883495
    },
    {
      "country": "Germany",
      "cantidad": 154905
    },
    {
      "country": "United States",
      "cantidad": 104662
    },
    {
      "country": "Romania",
      "cantidad": 83794
    }]
}
```

### **Tabla Logs**

```bash
curl --request GET \
  --url http://localhost:9696/mapaCalor/GetData \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'

{
  "status": true,
  "msg": "logs",
  "data": [
    {
      "idlogs_squid": 204189,
      "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) OPiOS/10.2.0.93022 Mobile/11D257 Safari/9537.53",
      "tcp_log": "TCP_TUNNEL:HIER_DIRECT",
      "ip": "185.225.18.109",
      "fecha": "2020-10-27T06:18:30.000Z",
      "metodo": "CONNECT",
      "url": "v33338.com:443",
      "res_codigo": 200,
      "size": 8412,
      "redireccion": "https://reddit.com",
      "version_http": "HTTP/1.1"
    },
    {
      "idlogs_squid": 554733,
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15",
      "tcp_log": "TCP_TUNNEL:HIER_DIRECT",
      "ip": "135.181.107.50",
      "fecha": "2020-10-27T08:18:09.000Z",
      "metodo": "CONNECT",
      "url": "www.lladosfitness.com:443",
      "res_codigo": 200,
      "size": 4860,
      "redireccion": "",
      "version_http": "HTTP/1.1"
    }]
}
```

### **Grafico 1**

```bash
curl --request GET \
  --url http://localhost:9696/Graficos/Grafico1 \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'

{
  "status": true,
  "msg": "data grafico1 encontrada",
  "data": [
    {
      "ip": "199.247.29.172",
      "cantidad": 324547
    },
    {
      "ip": "78.141.218.21",
      "cantidad": 141986
    },
    {
      "ip": "89.39.107.60",
      "cantidad": 52476
    }]
}
```

### **Grafico 2**

```bash
curl --request GET \
  --url http://localhost:9696/Graficos/Grafico2 \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'

{
  "status": true,
  "msg": "data grafico2 encontrada",
  "data": [
    {
      "family": "Chrome",
      "cantidad": 329734
    },
    {
      "family": "Firefox",
      "cantidad": 260947
    },
    {
      "family": "Other",
      "cantidad": 191324
    }]
}
```

### **Grafico 3**

```bash
curl --request GET \
  --url http://localhost:9696/Graficos/Grafico3 \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'

{
  "status": true,
  "msg": "data grafico4 encontrada",
  "data": [
    {
      "url": "v33338.com:443",
      "cantidad": 460129
    },
    {
      "url": "www.lladosfitness.com:443",
      "cantidad": 245962
    },
    {
      "url": "www.liga.net:443",
      "cantidad": 43464
    }]
}
```

### **Grafico 4**

```bash
curl --request GET \
  --url http://localhost:9696/Graficos/Grafico4 \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX3Byb3h5IiwiaWF0IjoxNjA2NzE3OTY2LCJleHAiOjE2MDY4MDQzNjZ9.WjRsTkgCp04cJmvL3MSE0YKVHTC2CbNfFY6Bsy1fA1E'

{
  "status": true,
  "msg": "data grafico4 encontrada",
  "data": [
    {
      "family": "Windows",
      "cantidad": 465589
    },
    {
      "family": "Other",
      "cantidad": 255046
    },
    {
      "family": "Mac OS X",
      "cantidad": 225197
    }]
}
```
