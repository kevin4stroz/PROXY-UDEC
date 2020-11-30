import json
import pymysql
import base64
from datetime import datetime
from ua_parser import user_agent_parser

# variables
host = "127.0.0.1"
username = "root"
password = base64.b64decode("")
database = "db_proxy"

def log2database(nameFile):
    
    # leer el archivo
    try:
        file_object  = open(nameFile, "r") 
    except Exception as e: 
        print(e)
        return False

    lines = file_object.readlines()
    contador = 1

    # abrir conexion a la base de datos
    db = pymysql.connect(host,username,password,database)

    for linea in lines:

        objectLog = {}

        print("\n[procesando linea del log] = " + str(contador) + "\n")

        linea_1 = linea.replace("\n","")
        
        try:
            first_split = linea_1.split('\x22')
            
            # agregando user_agent
            objectLog['user_agent'] = first_split[5]

            # extraer informacion de user agent
            parsed_ua = user_agent_parser.ParseUserAgent(objectLog['user_agent'])
            print("USER AGENT")

            if parsed_ua['family'] is None:
                parsed_ua['family'] = "None"

            if parsed_ua['major'] is None:
                parsed_ua['major'] = "None"

            if parsed_ua['minor'] is None:
                parsed_ua['minor'] = "None"

            if parsed_ua['patch'] is None:
                parsed_ua['patch'] = "None"

            print(parsed_ua)

            # extraer informacion del SO
            parsed_os = user_agent_parser.ParseOS(objectLog['user_agent'])
            print("Sistema operativo")
            print(parsed_os)
            if parsed_os['family'] is None:
                parsed_os['family'] = "None"
            
            if parsed_os['major'] is None:
                parsed_os['major'] = "None"

            if parsed_os['minor'] is None:
                parsed_os['minor'] = "None"

            if parsed_os['patch'] is None:
                parsed_os['patch'] = "None"
            
            if parsed_os['patch_minor'] is None:
                parsed_os['patch_minor'] = "None"

            # extraer informacion del dispositivo
            parsed_device = user_agent_parser.ParseDevice(objectLog['user_agent'])
            print("Dispositivo")
            if parsed_device['family'] is None:
                parsed_device['family'] = "None"

            if parsed_device['brand'] is None:
                parsed_device['brand'] = "None"

            if parsed_device['model'] is None:
                parsed_device['model'] = "None"

            print(parsed_device)

            # agregando tcp_log
            objectLog['tcp_log'] = first_split[6].replace(" ", "")

            # filtrando ip y timestamp
            first_split[0] = first_split[0].replace("[","")
            first_split[0] = first_split[0].replace("]","")
            first_split[0] = first_split[0].replace(" +0000 ","")
            ip_date = first_split[0].split(" - - ")
            objectLog['ip'] = ip_date[0]
            objectLog['fecha'] = ip_date[1]

            objectLog['fecha'] = objectLog['fecha'].replace("/", "-")
            objectLog['fecha'] = objectLog['fecha'].replace(':', ' ', 1)

            objectLog['fecha'] = datetime.strptime(objectLog['fecha'], '%d-%b-%Y %H:%M:%S')


            # agregando metodo, url, version de http
            met_uri_http =  first_split[1].split(" ")
            objectLog['metodo'] = met_uri_http[0]
            objectLog['url'] = met_uri_http[1]
            objectLog['version_http'] = met_uri_http[2]

            # agregar codigo de respuesta 
            cod_res = first_split[2].split(" ")
            objectLog['res_codigo'] =  cod_res[1]
            objectLog['res_codigo_2'] = cod_res[2]

            # agregar url de redirccion
            objectLog['redireccion'] = "" if ( first_split[3] == "-" ) else first_split[3]

            print()
            print(objectLog)

            # ENVIAR REGISTRO A BASE DE DATOS
            
            try:
                ###################################################################################
                ###################################################################################

                cursor = db.cursor()
                sql =   "INSERT INTO db_proxy.logs_squid \
                        (user_agent,tcp_log,ip,fecha,metodo,url,res_codigo,size, \
                        redireccion,version_http) \
                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"

                cursor.execute(sql, (objectLog['user_agent'], objectLog['tcp_log'], objectLog['ip'], objectLog['fecha'], objectLog['metodo'],objectLog['url'], objectLog['res_codigo'], objectLog['res_codigo_2'], objectLog['redireccion'],objectLog['version_http']))    

                db.commit()

                last_indice = cursor.lastrowid
                print("INDEX ID INSERT :" + str(last_indice)) 

                print("[info] : datos insertados en la tabla log_squid")

                ###################################################################################
                ###################################################################################

                cursor = db.cursor()
                sql =   "INSERT INTO db_proxy.dispositivo \
                        (logs_squid_idlogs_squid,family,brand,model) \
                        VALUES (%s,%s,%s,%s);"

                cursor.execute(sql, (last_indice , parsed_device['family'], parsed_device['brand'], parsed_device['model'] )) 
                db.commit()

                print("[info] : datos insertados en la tabla dispositivo") 

                ###################################################################################
                ###################################################################################

                cursor = db.cursor()
                sql =   "INSERT INTO db_proxy.navegador \
                        (logs_squid_idlogs_squid,family,major,minor,patch) \
                        VALUES \
                        (%s,%s,%s,%s,%s);"

                cursor.execute(sql, (last_indice, parsed_ua['family'], parsed_ua['major'], parsed_ua['minor'], parsed_ua['patch'] )) 
                db.commit()
                print("[info] : datos insertados en la tabla navegador") 

                ###################################################################################
                ###################################################################################

                cursor = db.cursor()
                sql =   "INSERT INTO db_proxy.sistema_operativo \
                        (logs_squid_idlogs_squid,family,major,minor,patch,patch_minor) \
                        VALUES \
                        (%s,%s,%s,%s,%s,%s);"

                cursor.execute(sql, (last_indice, parsed_os['family'], parsed_os['major'], parsed_os['minor'], parsed_os['patch'], parsed_os['patch_minor'] )) 
                db.commit()

                print("[info] : datos insertados en la tabla sistema operativo") 

            except Exception as e: 
                print(e)
        
        except Exception as e: 
                print(e)

        contador += 1
    
    db.close()
        
if __name__ == "__main__":
    log2database("log_squid.txt")