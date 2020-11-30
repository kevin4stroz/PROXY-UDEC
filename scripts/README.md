[Volver al indice](../README.md)

# Script de Carga de Datos

la instalación se debe ejecutar con python3 y pip3. Este script tiene la finalidad de tomar los datos del archivo de logs generados con formato especifico de squid y se pre procesa para poder almacenar la información dentro de la base de datos.

se debe ejecutar primero este script, y luego el script de geolocalización.

## Instalacion de librerias

```bash
pip install json pymysql base64 datetime ua_parser
```

## Configuración del script

se debe configurar los parametros de conexion de la base de datos que se encuentran en el inicio del script.

```python
host = "127.0.0.1"
username = "root"
password = base64.b64decode("PASSWORD_ENCODEADA_B64")
database = "db_proxy"
```

## Ejecución

```bash
python log2database.py
```

# Script de Geolocalización de IP

Este script realiza la obtención de la localidad la ip solicitada dentro de la base de datos y retornando la información requerida para realizar diferentes tipos de procesamientos de información.

## Instación de librerias

```bash
pip install pymysql base64 requests json
```

## Configuración del script

se debe configurar los parametros de conexion de la base de datos que se encuentran en el inicio del script.

```python
host = "127.0.0.1"
username = "root"
password = base64.b64decode("PASSWORD_ENCODEADA_B64")
database = "db_proxy"
```

## Ejecución

```bash
python get_ip_squid.py
```
