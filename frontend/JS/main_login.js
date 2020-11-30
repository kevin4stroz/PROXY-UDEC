window.addEventListener("load", ()=>{

    var form_log = document.getElementById("form_log");
    var inp_user = document.getElementById("user_inp")
    var inp_pwd = document.getElementById("pwd_inp");

    var invalid_banner = document.getElementById("invalid_banner");
    var valid_banner = document.getElementById("valid_banner");

    form_log.addEventListener("submit", ()=>{
        var user = inp_user.value;
        var pwd = inp_pwd.value;

        if(user === "" || pwd === ""){
            
            invalid_banner.style.display = "block";
            let tiempo = setTimeout(() => {
                invalid_banner.style.display = "none";
            }, 3000);
        }else{
            // enviar peticion de login
            $.post('http://localhost:9696/login/user', {username:user, password:pwd}, function(response){ 
                console.log(response)
                // validar si el mensaje de respuesta estuvo ok
                if(response.status){
                    // añadir cookie
                    document.cookie = "token="+response.token;
                    valid_banner.style.display = "block";
                    let tiempo = setTimeout(() => {
                        valid_banner.style.display = "none";
                        window.location.replace("http://localhost/Proxy/MapadeCalor.php");
                    }, 1500);
                }else{
                    invalid_banner.style.display = "block";
                    inp_user.value = "";
                    inp_pwd.value = "";
                    let tiempo = setTimeout(() => {
                        invalid_banner.style.display = "none";
                    }, 3000);
                }
            });
        }
    })


});