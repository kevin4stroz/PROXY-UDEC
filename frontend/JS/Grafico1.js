function str_obj(str) {
    str = str.split(', ');
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
  }
  

window.addEventListener("load", ()=>{
    //Grafico de barras
    var ctx = document.getElementById('myChart').getContext('2d');
    
    var cookietemp = str_obj(document.cookie);

    var jsonT = JSON.parse($.ajax({
        url: 'http://localhost:9696/Graficos/Grafico1',
        headers: {'x-access-token': cookietemp['token']},
        dataType: "json",
        async: false
    }).responseText).data;

    

    var LabelTemp = [];
    var DataTemp = [];
    for( const unidad in jsonT){
        LabelTemp.push(jsonT[unidad]['ip']);
        DataTemp.push(jsonT[unidad]['cantidad']);
    }

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: LabelTemp,
            datasets: [{
                label: 'Cantidad de conexiones',
                data: DataTemp,
                backgroundColor: [
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)',
                    'rgba(192, 57, 43, 0.5)'
                ],
                borderColor: [
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(192, 57, 43, 1)'
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    //Grafico Polar
    var ctx2=document.getElementById('GraficoPolar').getContext('2d');
    
    cookietemp = str_obj(document.cookie);

    jsonT = JSON.parse($.ajax({
        url: 'http://localhost:9696/Graficos/Grafico2',
        headers: {'x-access-token': cookietemp['token']},
        dataType: "json",
        async: false
    }).responseText).data;

    

    var LabelTemp2 = [];
    var DataTemp2 = [];
    for( const unidad in jsonT){
        LabelTemp2.push(jsonT[unidad]['family']);
        DataTemp2.push(jsonT[unidad]['cantidad']);
    }

    var graficoPolar=new Chart(ctx2,{
        type: 'radar',
        data: {
            labels: LabelTemp2,
            datasets: [{
                label: "Navegadores en la plataforma",
                backgroundColor: 'rgba(192, 57, 43, 0.5)',
                data: DataTemp2,
                borderColor: 'rgba(192, 57, 43, 1)'
            }]
        },
        
    });
    var ctx3=document.getElementById('GraficoRosca').getContext('2d');

    cookietemp = str_obj(document.cookie);

    jsonT = JSON.parse($.ajax({
        url: 'http://localhost:9696/Graficos/Grafico3',
        headers: {'x-access-token': cookietemp['token']},
        dataType: "json",
        async: false
    }).responseText).data;

    

    
    var LabelTemp3 = [];
    var DataTemp3 = [];
    for( const unidad in jsonT){
        LabelTemp3.push(jsonT[unidad]['url']);
        DataTemp3.push(jsonT[unidad]['cantidad']);
    }

    var graficoRosca=new Chart(ctx3,{
        type: 'pie',
        data : {
            labels: LabelTemp3,
            datasets: [
                {
                    data: DataTemp3,
                    backgroundColor: [
                        'rgba(192, 57, 43, 1)',
                        'rgba(192, 57, 43, 0.6)',
                        'rgba(192, 57, 43, 0.4)',
                        'rgba(192, 57, 43, 0.3)',
                        'rgba(192, 57, 43, 0.3)',
                        'rgba(192, 57, 43, 0.2)',
                        'rgba(192, 57, 43, 0.2)',
                        'rgba(192, 57, 43, 0.1)',
                        'rgba(192, 57, 43, 0.1)',
                        'rgba(192, 57, 43, 0)'
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }]
        },
        options: {
            rotation: -Math.PI,
            cutoutPercentage: 30,
            circumference: Math.PI,
            legend: {
              position: 'left'
            },
            animation: {
              animateRotate: false,
              animateScale: true
            }
        }
    });

    var ctx4=document.getElementById('GraficoLineal').getContext('2d');

    cookietemp = str_obj(document.cookie);

    jsonT = JSON.parse($.ajax({
        url: 'http://localhost:9696/Graficos/Grafico4',
        headers: {'x-access-token': cookietemp['token']},
        dataType: "json",
        async: false
    }).responseText).data;

    

    var LabelTemp4 = [];
    var DataTemp4 = [];
    for( const unidad in jsonT){
        LabelTemp4.push(jsonT[unidad]['family']);
        DataTemp4.push(jsonT[unidad]['cantidad']);
    }

    var graficoLineal=new Chart(ctx4,{
        type: 'line',
        data: {
            labels: LabelTemp4,
            datasets: [{
              label: "Sistemas operativos",
              data: DataTemp4,
              lineTension: 0,
              fill: false,
              borderColor: 'rgba(192, 57, 43, 1)',
              backgroundColor: 'rgba(192, 57, 43, 1)',
              borderDash: [5, 5],
              pointBorderColor: 'rgba(192, 57, 43, 1)',
              pointBackgroundColor: 'rgba(192, 57, 43, 1)',
              pointRadius: 5,
              pointHoverRadius: 10,
              pointHitRadius: 30,
              pointBorderWidth: 2,
              pointStyle: 'rectRounded'
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                  boxWidth: 80,
                  fontColor: 'black'
                }
              }
        }
    });

})

