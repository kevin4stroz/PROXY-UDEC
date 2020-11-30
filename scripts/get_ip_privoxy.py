import pymysql
import base64
import requests
import json
import sys

# contabilizar registros

contadorGeneral = 0

# variables
host = "127.0.0.1"
username = "root"
password = base64.b64decode("")
database = "db_proxy"

# abrir conexion a la base de datos
db = pymysql.connect(host,username,password,database)

## traer todas las ip a procesar
def getIp():
    try:
        cursor = db.cursor()
        cursor.execute('SELECT distinct(ip) FROM db_proxy.logs_privoxy')

        rows = cursor.fetchall()
        print("[INFO] Obteniendo IPS para procesar")        
        return rows

    except Exception as e: 
        print(e)
        return False


## verificar si la ip existe en la table country_ip
def validateIfExist(ipv4):
    try:
        cursor = db.cursor()
        cursor.execute( 'SELECT * FROM db_proxy.country_ip WHERE db_proxy.country_ip.ip = %s \
                        AND db_proxy.country_ip.logs_squid_idlogs_squid is NULL',(ipv4,))

        rows = cursor.fetchall()
        if(len(rows) > 0):
            print("CANTIDAD EXISTENTE : " +  str(len(rows)))
            return True
        else:
            return False

    except Exception as e: 
        print(e)
        return True

# obtener la localizacion de la ip
def getLocation(ipv4):
    url = "https://freegeoip.app/json/" + ipv4

    headers = {
        'accept': "application/json",
        'content-type': "application/json"
    }

    response = requests.request("GET", url, headers=headers)

    if response.status_code == 200:
        try:
            objJson = response.text
            return objJson

        except Exception as e:
            print(e)
            return False
    else:
        return False

# insertar datos en table county_ip
def insertGeoIp(jsonResponse):
    try:

        cursor = db.cursor()
        cursor.execute('SELECT idlogs_privoxy FROM db_proxy.logs_privoxy \
                        WHERE db_proxy.logs_privoxy.ip = %s',jsonResponse['ip'])

        rows = cursor.fetchall()

        contador = 0

        print("CANTIDAD DE REGISTROS A ASOCIAR : " + str(len(rows)))

        for id in rows:
            cursor = db.cursor()
            sql =   "INSERT INTO db_proxy.country_ip (logs_privoxy_idlogs_privoxy, \
                    logs_squid_idlogs_squid, country, ip, lat, lon) \
                    VALUES (%s,NULL, %s,%s,%s,%s);"

            params = (id[0],jsonResponse['country_name'],jsonResponse['ip'],jsonResponse['latitude'],jsonResponse['longitude'])
            cursor.execute(sql, params)       

            db.commit()
            contador += 1
            
            sys.stdout.write(f"\rCONTADOR = {contador}")

        global contadorGeneral 
        contadorGeneral += contador
        return True
    except Exception as e: 
        print(e)
        return False


if __name__=="__main__":
    ipv4_list = getIp()

    for ip in ipv4_list:
        print("\n[NUEVO REGISTRO]")
        if(not validateIfExist(ip[0])):
            strJson = getLocation(ip[0])
            jsonIP = json.loads(strJson)
            print("JSON = " + json.dumps(jsonIP, indent=2))

            # insertar datos en la tabla country_ip
            if insertGeoIp(jsonIP):
                print("\n[info] : datos insertados en la tabla => " + ip[0])
            else:
                print("\n[error] : insercion de datos fallida")
        else:
            print("[Se omite el registro "+ ip[0] +" YA EXISTE")

        print("[info] CANTIDAD DE REGISTROS TOTALES : " + str(contadorGeneral))
    db.close()

