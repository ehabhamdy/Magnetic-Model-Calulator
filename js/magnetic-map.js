var map;
var markers = [];

function initialize() {
  var haightAshbury = new google.maps.LatLng(29.7028328,31.6615958);
  var mapOptions = {
    zoom: 4,
    center: haightAshbury,
    draggableCursor:'crosshair',
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

}



function placeMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  deleteMarkers();
  markers.push(marker);

  var d = new Date();

  var month = d.getUTCMonth() + 1; //months from 1-12
  var day = d.getUTCDate();
  var year = d.getUTCFullYear();

  //var Url = "http://app.geomag.bgs.ac.uk/wmm/compute?latitude="+location.lat()+"&longitude="+location.lng() +"&altitude="+ 0 +" &date=2015-02-02";

  var Url = "http://app.geomag.bgs.ac.uk/wmm/compute?latitude="+
            location.lat()+"&longitude="+location.lng() +"&altitude="+ 0 +
            " &date="+year+"-"+month+"-"+day;

  function httpGet(theUrl)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send();
    return xmlHttp.responseXML;
  }

  var xmlDoc = httpGet(Url);
  var txt = "";

  long=xmlDoc.getElementsByTagName("longitude")[0].childNodes[0].nodeValue;
  lat=xmlDoc.getElementsByTagName("latitude")[0].childNodes[0].nodeValue;
  alt=xmlDoc.getElementsByTagName("altitude")[0].childNodes[0].nodeValue;
  date=xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue;

  D = xmlDoc.getElementsByTagName("declination")[0].childNodes[0].nodeValue;
  I = xmlDoc.getElementsByTagName("inclination")[0].childNodes[0].nodeValue;
  X = xmlDoc.getElementsByTagName("north-intensity")[0].childNodes[0].nodeValue;
  Y = xmlDoc.getElementsByTagName("east-intensity")[0].childNodes[0].nodeValue;
  H = xmlDoc.getElementsByTagName("horizontal-intensity")[0].childNodes[0].nodeValue;
  Z = xmlDoc.getElementsByTagName("vertical-intensity")[0].childNodes[0].nodeValue;
  F = xmlDoc.getElementsByTagName("total-intensity")[0].childNodes[0].nodeValue;

  D1 = xmlDoc.getElementsByTagName("declination")[1].childNodes[0].nodeValue;
  I1 = xmlDoc.getElementsByTagName("inclination")[1].childNodes[0].nodeValue;
  X1 = xmlDoc.getElementsByTagName("north-intensity")[1].childNodes[0].nodeValue;
  Y1 = xmlDoc.getElementsByTagName("east-intensity")[1].childNodes[0].nodeValue;
  H1 = xmlDoc.getElementsByTagName("horizontal-intensity")[1].childNodes[0].nodeValue;
  Z1 = xmlDoc.getElementsByTagName("vertical-intensity")[1].childNodes[0].nodeValue;
  F1 = xmlDoc.getElementsByTagName("total-intensity")[1].childNodes[0].nodeValue;

    var cont = '<table>' +
                '<tr>'+
                  '<th>Longtude</th>'+
                  '<th>Latitude</th>'+
                  '<th>Altitude</th>'+
                  '<th>Date</th>'+
                '</tr>'+
                '<tr>'+
                  '<td>'+ long +'</td>'+
                  '<td>'+ lat +'</td>'+
                  '<td>'+ alt +'</td>'+
                  '<td>'+ date   +'</td>'+
                '</tr>'+
                '</table>' + '<br>'+
                '<table>' +
                  '<tr>'+
                    '<th>Comp</th>'+
                    '<th>D</th>'+
                    '<th>I</th>'+
                    '<th>X</th>'+
                    '<th>Y</th>'+
                    '<th>H</th>'+
                    '<th>Z</th>'+
                    '<th>F</th>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>MF</th>'+
                    '<td>'+ D +'</td>'+
                    '<td>'+ I +'</td>'+
                    '<td>'+ X +'</td>'+
                    '<td>'+ Y +'</td>'+
                    '<td>'+ H +'</td>'+
                    '<td>'+ Z +'</td>'+
                    '<td>'+ F +'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>SV</th>'+
                    '<td>'+ D1 +'</td>'+
                    '<td>'+ I1 +'</td>'+
                    '<td>'+ X1 +'</td>'+
                    '<td>'+ Y1 +'</td>'+
                    '<td>'+ H1 +'</td>'+
                    '<td>'+ Z1 +'</td>'+
                    '<td>'+ F1 +'</td>'+
                  '</tr>'+
                '</table>';


  var infowindow = new google.maps.InfoWindow({
    //content: 'Latitude: ' + y + '<br>Longitude: ' + x
    //content: document.getElementById("myDiv").innerHTML=httpGet(Url);
    content:cont
  });
  infowindow.open(map,marker);
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);
