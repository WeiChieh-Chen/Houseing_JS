var site_path=location.origin+"/housingApp";
var map;
var markers = [];
var placesArray=[];
var markerCluster=null;
var placesCluster=null;
var infoWindow;
var myPos;
var directionspolyline;
//var rendererOptions = {suppressMarkers: false};
//var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(23.5989232,121.0173463)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
}

function bindInfoWindow(marker, map, infoWindow, html) {
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}



function getPOIjson(CityID){

  //http://140.130.34.31/api.php?action=cityinfo&city=
    // var URLs="http://140.130.34.31/api.php?action=cityinfo&city="+CityID;
    // $.ajax({
    //     url: URLs,
    //     data: $('#formSearch').serialize(),
    //     type:"GET",
    //     dataType:'XML',
    //     success: function(data){


            // if(data['state']){
            //     var POIs = [];
            //     var maxLon=-1000,minLon=1000,maxLat=-1000,minLat=1000;
            //     var jsonObj = data;
            //     for (var i = 0; i < jsonObj['content'].length; i++) {
            //         maxLon=Math.max(jsonObj['content'][i].lon,maxLon);
            //         minLon=Math.min(jsonObj['content'][i].lon,minLon);
            //         maxLat=Math.max(jsonObj['content'][i].lat,maxLat);
            //         minLat=Math.min(jsonObj['content'][i].lat,minLat);
            //     }
                //適應初始地圖大小和位置
                //console.log(maxLon+","+maxLat+","+minLat+","+minLon);
                //var bounds = new google.maps.LatLngBounds(
                //    new google.maps.LatLng(maxLat,minLon),
                //    new google.maps.LatLng(minLat,maxLon )
                //    );
                //map.fitBounds(bounds);
                //輸出標記
    //             inputPOItoMap(map,jsonObj['content'],name);
    //         }
    //         else{
    //             alert("未查詢到任何東西@@~");
    //         }
    //     },
    //     error:function(xhr, ajaxOptions, thrownError){ 
    //        // alert("發生未知錯誤拉拉拉!!"); 
    //     }
    // })
}   
function inputPOItoMap(map,POIs,name){
    if(markerCluster){
        deleteMarkers();
    }
    infoWindow = new google.maps.InfoWindow();
    for (var i = 0; i < POIs.length; i++) {//console.log(POIs[i]['id']);
        var point = new google.maps.LatLng(POIs[i]['lat'],POIs[i]['lon']);
        var icon = {icon : site_path+POIs[i]['icon']} || {};
        if(POIs[i]['icon']==""){
            var marker = new google.maps.Marker({
                map: map,
                position: point
            });
        }else{
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                icon: site_path+POIs[i]['icon']
            });
        }
        bindInfoWindow(marker, map, infoWindow, createPopUpHtml(POIs[i],name));
        markers.push(marker);
    }
    markerCluster = new MarkerClusterer(map,markers);
}

/*Marker操作
*************************************************/
function setAllMap(map) {
  /*for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
}*/
    markerCluster.addMarkers(markers);
}
function clearMarkers() {
  markerCluster.clearMarkers();
}
function showMarkers() {
  setAllMap(map);
}
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
/*createPopUpHtml
*************************************************/
function createPopUpHtml(POI,name){
    if(name!='bikelane')
        return "<div class='MarkerPopUp'><div class='MarkerTitle'>"+POI['name']+"</div>"
        +"<div class='MarkerContext'>"+POI['address']+"</div>"
        +"<div class='rating-static rating-"+POI['evaluate']+"'></div>"
        +"<div class='MarkerType'>類別："+POI['type']+"</div>"
        +"<button class='btn btn-primary' href='"+site_path+name+"/modal_info/"+POI['id']+"' data-toggle='modal' data-target='#myModal'>詳細資訊</button>"
        +"<button class='btn btn-primary' onclick='createdirections("+POI['lat']+","+POI['lon']+");'>導航</button>"
        +"</div>";
    else 
        return "<div class='MarkerPopUp'><div class='MarkerTitle'>"+POI['name']+"</div>"
        +"<div class='MarkerContext'>"+POI['address']+"</div>"
        +"<div class='rating-static rating-"+POI['evaluate']+"'></div>"
        +"<div class='MarkerType'>類別："+POI['type']+"</div>"
        +"<a class='btn btn-primary' href='"+site_path+name+"/modal_info/"+POI['id']+"'>詳細資訊</a>"
        +"</div>"

}
/*Get google map places
***********************************************/
function getplace(query){
    setAllMap(null);
    var request = {
          location: myPos,
          radius: 5000,
          query: query
          //types: ['bicycle_store']
        };
    var service = new google.maps.places.PlacesService(map);
        //service.nearbySearch(request, callback);
        service.textSearch(request, callback);
        console.log(placesArray.length);
    if (placesCluster){
      placesArray=[];
      placesCluster.clearMarkers();
    }
  }
  function callback(results, status, pagination) {
    console.log(status);
    if(status==google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT){
      //sleep(5000);超過搜尋的限制
    }
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      return;
    } else {
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, place; place = results[i]; i++) {
        createMarkers(place,bounds);
      }
      //map.fitBounds(bounds);
      if (pagination.hasNextPage) {
         pagination.nextPage();
      }
      else{placesCluster = new MarkerClusterer(map,placesArray);}
        //console.log(placesArray.length);
    }
}
function createMarkers(place,bounds) {

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon : site_path+'image/icon/6-2.png'
  });
  //標記資訊視窗點擊事件
  var strplace=place.name+"<br>"+place.formatted_address;
  infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(strplace);
    infowindow.open(map, this);
  });
  placesArray.push(marker);
  //placesList.innerHTML += '<li>' + place.name+"<br>"+place.formatted_address + '</li>';
  //自適應地圖位置和大小
  //console.log(markers);
  bounds.extend(place.geometry.location);

}
/*directions
***********************************************/
function createdirections(endlat,endlon){
  if(directionspolyline){
    directionspolyline.setMap(null);
  }
  var request = {
      origin:myPos,
      destination:new google.maps.LatLng(endlat,endlon),
      travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //directionsDisplay.setDirections(response);
      var path = response.routes[0].overview_path;
      console.log(response);
      directionspolyline = new google.maps.Polyline({
          path: path,
          strokeColor: '#00FF00',
          strokeWeight: 7,
          strokeOpacity: 0.5
        });
       directionspolyline.setMap(map);
       //顯示路徑規劃步驟
       $("#sidebar-sirections").html("<div onclick='canceldirections();' style='width: 13px; height: 13px; overflow: hidden; position: absolute; opacity: 0.7; right: 12px; top: 10px; z-index: 10000; cursor: pointer;'><img src='https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png' style='position: absolute; left: -2px; top: -336px; width: 59px; height: 492px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;'></div>");
       $("#sidebar-sirections").show();
       $("#sidebar-search").hide();
        for(var i=0;i<response.routes[0].legs[0].steps.length;i++){
          $("#sidebar-sirections").append(response.routes[0].legs[0].steps[i]['instructions']+"<br>");
          //console.log(response.routes[0].legs[0].steps[i]['instructions']);
        }
    }
  });

}
function canceldirections(){
  $("#sidebar-sirections").hide();
  $("#sidebar-search").show();
  if(directionspolyline){
    directionspolyline.setMap(null);
  }
} 
/*GeoLocation
***********************************************/
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var marker = new google.maps.Marker({
        map: map,
        position: pos,
        icon : site_path+'image/icon/9.png'
      });
       //標記資訊視窗點擊事件
        infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
          //infowindow.setContent('我的位置');
          //infowindow.open(map, this);
          map.setCenter(pos);
          map.setZoom(18);
        });
      //map.setCenter(pos);
      //map.setZoom(17);



      myPos=pos;
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


google.maps.event.addDomListener(window, 'load', initialize);

/*function getPOIxml(){
    downloadUrl(site_path+"map/get_poi_xml", function(data) {
        var POIs = [];
        var maxLon=-1000,minLon=1000,maxLat=-1000,minLat=1000;
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        for (var i = 0; i < markers.length; i++) {
            var POI = {
                lat: parseFloat(markers[i].getAttribute("lat")),
                lon: parseFloat(markers[i].getAttribute("lon"))
            };
            POIs[i]=POI;
            maxLon=Math.max(POI.lon,maxLon);
            minLon=Math.min(POI.lon,minLon);
            maxLat=Math.max(POI.lat,maxLat);
            minLat=Math.min(POI.lat,minLat);

        }
        
        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(maxLat,minLon),
            new google.maps.LatLng(minLat,maxLon )
        );
        map.fitBounds(bounds);
        inputPOItoMap(map,POIs);
    });
}*/