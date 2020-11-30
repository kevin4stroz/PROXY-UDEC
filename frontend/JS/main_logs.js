window.addEventListener('load', () =>{

    function str_obj(str) {
        str = str.split(', ');
        var result = {};
        for (var i = 0; i < str.length; i++) {
            var cur = str[i].split('=');
            result[cur[0]] = cur[1];
        }
        return result;
    }

    var cookietemp = str_obj(document.cookie);
    var oblLog =[];
    var jsonT = JSON.parse($.ajax({
        url: 'http://localhost:9696/tablaLogs/GetData',
        headers: {'x-access-token': cookietemp['token']},
        dataType: "json",
        async: false
    }).responseText).data;

    var CuerpoTabla = document.getElementById('CuerpoTabla');

    for( const unidad in jsonT){

        var tr = document.createElement("tr");
        
        for(var key in jsonT[unidad]){

            if(key == 'idlogs_squid'){
                var th = document.createElement("th");
                th.scope ="row";
                th.innerHTML = jsonT[unidad][key];
                tr.appendChild(th);
            }else{
                var td = document.createElement("td");
                td.innerHTML = jsonT[unidad][key];
                tr.appendChild(td);
            }
            
        }

        CuerpoTabla.appendChild(tr);
    }
})