<?php
    if(isset($_COOKIE['token'])){
        $cURLConnection = curl_init();

        curl_setopt($cURLConnection, CURLOPT_URL, 'http://localhost:9696/user/Check');
        curl_setopt($cURLConnection, CURLOPT_HTTPHEADER, array('x-access-token: '. $_COOKIE['token']));
        curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

        $responseJson = curl_exec($cURLConnection);
        curl_close($cURLConnection);

        $jsonArrayResponse = json_decode($responseJson);

        if($jsonArrayResponse->{'status'}){
            header("Location: MapadeCalor.php");
        }else{
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time()-1000);
                setcookie($name, '', time()-1000, '/');
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Login</title>

    <!--JQUERY-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    
    <!-- FRAMEWORK BOOTSTRAP para el estilo de la pagina-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    
    <!-- Los iconos tipo Solid de Fontawesome-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/solid.css">
    <script src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>

    <script src="JS/main_login.js"></script>

    <!-- Nuestro css-->
    <link rel="stylesheet" type="text/css" href="CSS/Estilo.css" th:href="@{/css/index.css}">
    <meta charset="utf-8">
    <link rel="icon" type="image/png"  href="img/Icono.png" sizes="32*32">
</head>
<body>
    <div class="modal-dialog text-center">
        <div class="col-sm-8 main-section">
            <div class="modal-content">
                <div class="col-12 user-img" >
                    <svg width="8em" height="8em" viewBox="0 0 16 16" class="bi bi-binoculars-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="color: #e04849;">
                        <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                      </svg>
                   <!-- <img src="img/user.png" th:src="@{/img/user.png}"/>-->
                </div>
                <form id="form_log" class="col-12" th:action="#" method="POST" onsubmit="return false;">
                    <div class="form-group" id="user-group">
                        <input id="user_inp" type="text" class="form-control" placeholder="Nombre de usuario" name="username"/>
                    </div>
                    <div class="form-group" id="contrasena-group">
                        <input id="pwd_inp" type="password" class="form-control" placeholder="Contraseña" name="password"/>
                    </div>
                    <button id="login_btn" type="submit" class="btn btn-danger"><i class="fas fa-sign-in-alt"></i>  Ingresar </button>
                </form>
                <div id="invalid_banner" style="display:none" >
                    <div id="invalid_banner" th:if="${param.error}"  class="alert alert-danger" role="alert">
                        Nombre de usuario y contraseña inválidos.
                    </div>
                </div>
                <div id="valid_banner" style="display:none" >
                    <div  th:if="${param.logout}" class="alert alert-success" role="alert">   
                    usted ha sido conectado.
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>