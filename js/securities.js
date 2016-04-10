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

var security_arr = new Array;
var comp=new Array;
var addr_arr = new Array;
var Latlng_arr = new Array;
var police_arr = new Array;
var arr_count;
var CCity;
var glo_count;
var police_count;
var dept;


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
                            console.log("not found");
                            $('#selectToggle').attr('disabled', true);
                            $('#selectArea').html("<option value=''>無資料</option>");
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
}


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
                        SetPopMap(result[i].Address,result[i].Lat,result[i].Lng,false);
                        console.log(Latlng_arr[x]['Address']);
                    }
                }
            })
                
        },
        error:function() {
            console.log("Not found!!!");
        }
    })

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
                        security_arr[i]=new Array;
                        security_arr[i]['lat']=result[i].Lat;
                        security_arr[i]['lng']=result[i].Lng;
                       SetPopMap(result[i].BranchNm,result[i].Lat,result[i].Lng,true);
                    }
                    
                })
                    
            },
            error:function() {
                console.log("Not found!!!");
            }
        })
    // }
}

function SetPopMap(addr,s_lat, s_lon,po) {
   
    
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
    createPopMarkers(addr,s_lat,s_lon,po);
    stepDisplay = new google.maps.InfoWindow();
    
    markerCluster = new MarkerClusterer(map, markers);

}


function createPopMarkers( address,lat, lon,po) {
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

