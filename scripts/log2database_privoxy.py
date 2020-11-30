import json
import pymysql
import base64
from datetime import datetime

# variables
host = "127.0.0.1"
username = "root"
password = base64.b64decode("")
database = "db_proxy"


def ProcesarLogs(namefile):
    # abrir el archivo
    try:
        obj_file = open(namefile, "r")
    except Exception as e:
        print(e)
        return False

    # obtener la linea del archivo en una lista
    ReturnLines = obj_file.readlines()
    contador = 1

    # abrir conexion a la base de datos
    db = pymysql.connect(host,username,password,database)

    # for imprime cada elemento de esa lista
    for linea in ReturnLines:
        print("Mostrando linea numero:"+str(contador))
        print(linea)

        # separo los elementos de la lista con un espacio
        separacion1 = linea.split(" ")
        
        if(len(separacion1) == 10):
            # creo un diccionario
            diccionario1 = {}

            # creo las llaves y la posisicion que ocupa en la lista
            # modifico los caracteres basura
            diccionario1['ip'] = separacion1[0]

            diccionario1['fecha'] = separacion1[3].replace("[", "")
            diccionario1['fecha'] = datetime.strptime(diccionario1['fecha'], '%d/%b/%Y:%H:%M:%S')

            diccionario1['metodo'] = separacion1[5].replace("\"", "")
            diccionario1['url'] = separacion1[6]
            diccionario1['version_http'] = separacion1[7].replace("\"", "")
            diccionario1['res_codigo'] = separacion1[8]
            diccionario1['size'] = separacion1[9].replace("\n", "")
            # formato de la diccionario
            print(diccionario1)

            # enviar informacion a la base datos

            try:
                cursor = db.cursor()
                sql =   "INSERT INTO db_proxy.logs_privoxy \
                        (ip,fecha,metodo,url,res_codigo,size,version_http) \
                        VALUES \
                        (%s,%s,%s,%s,%s,%s,%s);"

                cursor.execute(sql, (diccionario1['ip'],diccionario1['fecha'],diccionario1['metodo'],diccionario1['url'],diccionario1['res_codigo'],diccionario1['size'],diccionario1['version_http']))       

                db.commit()

                print("[info] : datos insertados en la tabla")

            except Exception as e: 
                print(e)
        else:
            print("error al procesar el log : " + str(contador) )
            print("Se omite este log")

        # cuanta los elementos de la lista
        contador = contador+1
        # al pulsal una tecla pasa al siguiente ciclo

if __name__ == "__main__":
    ProcesarLogs("logfile.txt")
