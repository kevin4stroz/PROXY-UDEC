function str_obj(str) {
  str = str.split(', ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
      var cur = str[i].split('=');
      result[cur[0]] = cur[1];
  }
  return result;
}

window.addEventListener("load",()=>{

  google.charts.load('current', {
    'packages':['geochart'],
    'mapsApiKey': ''
  });

  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    
    // enviar peticion
    var paises = [['Country', 'Popularity']];
      var cookietemp = str_obj(document.cookie);
      

      var jsonT = JSON.parse($.ajax({
        url: 'http://localhost:9696/mapaCalor/GetData',
        headers: {'x-access-token': cookietemp['token']},
        dataType: "json",
        async: false
      }).responseText).data;

      for( const unidad in jsonT){
        paises.push([jsonT[unidad]['country'],jsonT[unidad]['cantidad']]);
      }

        console.log(paises);

    var data = google.visualization.arrayToDataTable(paises);

    var options = {
      backgroundColor: '#f5b461',
      colorAxis: {colors: ['#d88832', '#6a3d0e']},
      datalessRegionColor:'#DFD7CF'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }
  

  
});