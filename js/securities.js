// 更動securities頁面

if (pages == 3) {

    $('#showSent').remove();
    $('#rentBar').remove();
    $('#houseButton').remove();
    $('div').removeClass("sidebar-left well sidebar-nav");

    $('#selectToggle').find('label').html('警察分局');
    $('#selectArea').find('option').html('請選擇警察分局');
    $("#serch").attr("onClick","Getlatlng()").html("<h2>篩選</h2>");
    



var HousingURL = "http://140.130.34.31/";

var School_arr = new Array;
var house_arr = new Array;
var campus_arr = new Array;
var addr_arr = new Array;
var Latlng_arr = new Array;
var police_arr = new Array;
var infoWindow;
var markers = []; // marker cluster
var markerCluster;
var houseNo;
var Find_Schools_lat = 0;
var Find_Schools_lon = 0;

var arr_count;
var CCity;

//var site_path=location.origin+"/bikelife/bikebook/";
/* google map modal remove data */
$(document.body).on('hidden.bs.modal', function() {
    $('#myModal').removeData('bs.modal')
});
/*left silder toggle*/
$(document).ready(function() {
    $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });
});

/* 連動Select */
//house_tpye1
$(document).ready(function() {
    $('#selectCity').change(function() {
        var CNo = $('#selectCity').val();
        CCity = $('#selectCity :selected').text();
        console.log(CCity);
        var URLs = HousingURL + "api.php?action=cityinfo&city=" + CNo;
        // var ename = new Array();
        var schoolData = new Array();
        $.ajax({

            url: URLs,
            type: "POST",
            dataType: 'XML',
            cache: false,

            success: function(response) {

                console.log(URLs);
                arr_count=0;
                if (CNo != "0") 
                {
                    $('#selectToggle').attr('disabled', false);   

                    $.ajax({
                        url:"public/datus.json",
                        type:"POST",
                        dataType:"json",
                        catch:false,

                        success:function(result){
                            $(result).each(function(i){
                                
                                if( result[i].Address.match(CCity) )
                                { 
                                    addr_arr[arr_count]=new Array();
                                    
                                    addr_arr[arr_count]['Address']=result[i].Address;
                                    addr_arr[arr_count]['DeptNm'] = result[i].DeptNm;
                                    addr_arr[arr_count++]['BranchNm']=result[i].BranchNm;
                                
                                }

                            })
                            GetBranch(arr_count);
                        },
                        error:function(){
                            console.log("not found")
                        }
                    })
                }
                else 
                {
                    $('#selectToggle').attr('disabled', true);
                    $('#selectArea').html("<option value=''>請先選擇城市</option>");
                }
            },
            error: function(xml) {
                alert('Ajax request 發生錯誤 ' + URLs + ',' + xml);
            }
        });
    });
});

/*
    Function Name : getSchoolInfo()
    Function Work : 取得房屋資料 

    API 呼叫網址：http://140.130.34.31/api.php?action=houselist&school=學校名稱
*/
var glo_count;var police_count;
var comp=new Array;
function GetBranch(count)//做分局的部分。並去除重複部分
{
    glo_count = count;
    var compare;
    
    var val=0;
    var flag = true;
    comp[0]="";
    
    var strHtml = "<option value='0'>" + "不分類" + "</option>";
    for(var i = 0 ; i < count ; i++)
    {

        for(var j = 0 ; j < comp.length && flag; j++ )
        {

            if( comp[j] == addr_arr[i]['BranchNm'] )
            {
                flag = false;
                break;
            }
        }
        if(flag)
        {
            comp[val] = addr_arr[i]['BranchNm'];
            strHtml += "<option value='" + val++ + "'>" + addr_arr[i]['BranchNm'] + "</option>";
        }
        else
        {
            flag = true;
        }       
    }
    police_count = val;
    $('#selectArea').html(strHtml);

}
var dept;
function Getlatlng()
{
    if (markerCluster) {
        deleteMarkers();
    }
    var branch = $('#selectArea option:selected ').text();
    console.log(branch);
    var val=0;
    
    for(var j = 0 ; j < glo_count ; j++){
        if(addr_arr[j]['BranchNm'].match(branch)){
            Latlng_arr[val] = new Array();
            console.log(addr_arr[j]['Address']);
            Latlng_arr[val]['DeptNm'] = addr_arr[j]['DeptNm'];
            Latlng_arr[val++]['Address'] = addr_arr[j]['Address']; 
        }else if(branch == "不分類")
        {
            Latlng_arr[val] = new Array();
            console.log(addr_arr[j]['Address']);
            Latlng_arr[val]['DeptNm'] = addr_arr[j]['DeptNm'];
            Latlng_arr[val++]['Address'] = addr_arr[j]['Address'];
        }

    }
    $.ajax({
        url:"public/Latlng.json",
        type:"POST",
        dataType:"json",
        catch:false,

        success:function(result) {
            $(result).each(function(i){
                for(var x = 0 ;x < val ; x++ )
                {
                    if( result[i].Address.match(Latlng_arr[x]['Address']) ){
                        SetMap(result[i].Address,result[i].Lat,result[i].Lng,false);
                    }
                }
            })
                
        },
        error:function() {
            console.log("Not found!!!");
        }
    })
   /*if(branch == "不分類"){
        $.ajax({
        url:"public/police_department.json",
        type:"POST",
        dataType:"json",
        catch:false,

        success:function(result) {
            $(result).each(function(i){
                for(var x=0;x<police_count;x++)
                {
                    if( result[i].BranchNm.match(comp[x]) ){
                        console.log(result[i].BranchNm);
                        dept = Latlng_arr[0]['DeptNm'];
                       SetMap(result[i].BranchNm,result[i].Lat,result[i].Lng,true);
                        break;
                    }
                }
                
            })
                
        },
        error:function() {
            console.log("Not found!!!");
        }
    })                 
    }else{*/
        $.ajax({
            url:"public/police_department.json",
            type:"POST",
            dataType:"json",
            catch:false,

            success:function(result) {
                $(result).each(function(i){
                    
                    if( result[i].BranchNm==branch ){
                        console.log(result[i].BranchNm);
                        dept = Latlng_arr[0]['DeptNm'];
                       SetMap(result[i].BranchNm,result[i].Lat,result[i].Lng,true);
                    }
                    
                })
                    
            },
            error:function() {
                console.log("Not found!!!");
            }
        })
    // }
}

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(23.5989232, 121.0173463)
    };
    map1 = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function SetMap(addr,s_lat, s_lon,po) {
    Find_Schools_lat = s_lat;
    Find_Schools_lon = s_lon;
    //setAllMap(null);
    
    console.log("lat = " + s_lat + ", lon = " + s_lon + " flag =" + po);
    if(po)
    {
        var mapOptions = {
            zoom: 18,
            center: new google.maps.LatLng(s_lat, s_lon)
        };
    }else{
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(23.5989232, 121.0173463)
        };
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    createMarkers(addr,s_lat,s_lon,po);
    stepDisplay = new google.maps.InfoWindow();
    
    markerCluster = new MarkerClusterer(map, markers);

}


function createMarkers( address,lat, lon,po) {
    var point = new google.maps.LatLng(lat, lon);
    //  infoWindow = new google.maps.InfoWindow();
    if(po){
        var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon : {url:"public/police.png",scaledSize:new google.maps.Size(50,50)}
    });
    }else{
        var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon : {url:"public/crime.png",scaledSize:new google.maps.Size(35,35)}
    });

    }
    
    //標記資訊視窗點擊事件
    if(po)
    {
        var strplace = address + "(" + dept + ")<br>";
    }else{
         var strplace = address +"<br>";
    }

    infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {

        infowindow.setContent(strplace);

        infowindow.open(map, marker);
    });

    markers.push(marker);

}

google.maps.event.addDomListener(window, 'load', initialize);
/*Marker操作
 *************************************************/
function setAllMap(map) {
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

function bindInfoWindow(marker, map, infoWindow, html) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(html);
        infoWindow.open(map, marker);
    });
}
function showHouseInfo(id) {

    $('#myModal').modal('show');

}

// /*類別複選功能*/
function Add_ObjectType(tagId, typename) {
    //objecjType 目的在抓一個藏起來的<TEXT>，而其記錄歷經所選項目。
    var objecjType = document.getElementById(tagId);

    //match  尋找匹配數字
    if (objecjType.value.match(typename) != null) {
        objecjType.value = objecjType.value.replace("," + typename, "");
        console.log(objecjType.value);
    } else {
        objecjType.value += "," + typename;
        console.log(objecjType.value);
    }
/*
    if(pages == 1) {
        FilterMap(objecjType.value);
    }else if(pages == 2) {
        FilterMapCampus(objecjType.value);
    }*/

}
}