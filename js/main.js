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

var HousingURL = "http://140.130.34.31/";

var School_arr = new Array;
var house_arr = new Array;
var campus_arr = new Array;
var numbers;
var rentValue;
var infoWindow;
var markers = []; // marker cluster
var markerCluster;
var houseNo;
var Find_Schools_lat = 0;
var Find_Schools_lon = 0;

/* 連動Select */
//house_tpye1
$(document).ready(function() {
    $('#rentBar').change(function() {
        var value = $('#rentBar').val();
        var htmlstr = "<h3><a>1000元-" + value + "元</a></h3>";
        $('#showSent').html(htmlstr);

        // console.log($("#house_tpye1").val());
    });


    $('#selectCity').change(function() {
        var CNo = $('#selectCity').val();
        var CCi = $('#selectCity').text();
        console.log(CNo)
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
                $(response).find("school").each(function(i) { //取得xml父節點
                    schoolData[i] = new Array();
                    var total = $(response).find("school").length; //xml的總筆數
                    schoolData[i]["cname"] = $(this).children("cname").text(); //取得子節點中的src
                    schoolData[i]["ename"] = $(this).children("ename").text();
                    schoolData[i]["lon"] = $(this).children("lon").text();
                    schoolData[i]["lat"] = $(this).children("lat").text();
                    School_arr = schoolData;
                });
                if (CNo != "0") {
                    $('#selectToggle').attr('disabled', false);

                    var strHtml = "<option value='0'>" + "不分類" + "</option>";
                    for (var i = 0; i < schoolData.length; i++) {
                        strHtml += "<option value='" + schoolData[i]["ename"] + "'>" + schoolData[i]["cname"] + "</option>"
                    }
                    $('#selectArea').html(strHtml);
                } else {
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
function getSchoolInfo() {

    var School = $('#selectArea').val();
    var URLs = HousingURL + "api.php?action=houselist&school=";
    if (School != "0"){
       URLs = URLs+School;
       loadingHousingData(URLs,School,$('#selectArea option:selected').text());
    }else {
        for (var i = 0 ; i < School_arr.length ; i++){
            loadingHousingData(URLs+School_arr[i]["ename"],School_arr[i]["ename"],School_arr[i]["cname"]);
        }
    }
}
var tmp = 0;
function loadingHousingData(URLs,School,cschool){

        console.log(URLs);
        var housedata = new Array();
        $.ajax({
            url: URLs,
            dataType: 'XML',
            success: function(response) {

                $(response).find("house").each(function(i) { //取得xml父節點
                    housedata[i] = new Array();
                    var total = $(response).find("house").length; //xml的總筆數
                    housedata[i]["address"] = $(this).children("address").text(); // 地址
                    housedata[i]["type"] = $(this).children("type").text(); // 房屋種類
                    housedata[i]["floor"] = $(this).children("floor").text(); // 樓層、坪數
                    housedata[i]["ammeter"] = $(this).children("ammeter").text(); // 有無獨立電表
                    housedata[i]["limit"] = $(this).children("limit").text(); //    限男或限女或無限制
                    housedata[i]["room"] = $(this).children("room").text(); //  套房總數
                    housedata[i]["Yroom"] = $(this).children("Yroom").text(); // 雅房總數
                    housedata[i]["material"] = $(this).children("material").text(); //  建材
                    housedata[i]["lease"] = $(this).children("lease").text(); //    付房租方式，月繳、學期、年繳
                    housedata[i]["rent"] = $(this).children("rent").text(); // 租金
                    housedata[i]["deposit"] = $(this).children("deposit").text(); // 押金
                    housedata[i]["expense"] = $(this).children("expense").text(); // 其他費用
                    housedata[i]["lon"] = $(this).children("lon").text(); // 座標 經度
                    housedata[i]["lat"] = $(this).children("lat").text(); // 座標 緯度

                    housedata[i]["note"] = $(this).children("note").text();
                    housedata[i]["contact"] = $(this).children("contact").text();
                    housedata[i]["telephone"] = $(this).children("telephone").text();
                    housedata[i]["cellphone"] = $(this).children("cellphone").text();
                    housedata[i]["updatedate"] = $(this).children("updatedate").text();
                    housedata[i]["certificate"] = $(this).children("certificate").text();
                    housedata[i]["assessment"] = $(this).children("assessment").text();
                    housedata[i]["measure"] = $(this).children("measure").text();
                    housedata[i]["heater"] = $(this).children("heater").text();
                    housedata[i]["equipment"] = $(this).children("equipment").text();
                    housedata[i]["facility"] = $(this).children("facility").text();
                    housedata[i]["image1"] = $(this).children("image1").text();
                    housedata[i]["image2"] = $(this).children("image2").text();
                    housedata[i]["image3"] = $(this).children("image3").text();


                    house_arr = housedata;

                });


                for (var i = 0; i < School_arr.length; i++) {
                    //console.log(School_arr[i]["ename"]);
                    if (School_arr[i]["ename"] == School) {
                        tmp = i;
                        break;
                    }
                }
                for(var i=0;i<house_arr.length;i++){
                    housestatistics(house_arr[i]["rent"],house_arr[i]["type"],cschool);
                }
                SetMap(School_arr[tmp]["lat"], School_arr[tmp]["lon"]);
                if (housedata.length == 0) {
                    //alert("資料庫沒有內容");
                    console.log(School_arr[tmp]['cname']+ " -> 資料庫沒有內容");
                }
                makeRightSB(pages);

            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("getSchoolInfo , error ! ");
            }
        });

}
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(23.5989232, 121.0173463)
    };
    map1 = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function SetMap(s_lat, s_lon) {
    Find_Schools_lat = s_lat;
    Find_Schools_lon = s_lon;

    //setAllMap(null);
    if (markerCluster) {
        deleteMarkers();
    }
    console.log("lat = " + s_lat + ", lon = " + s_lon);

    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(s_lat, s_lon)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    stepDisplay = new google.maps.InfoWindow();

    var rentValue = parseInt($('#rentBar').val());

    for (var i = 0; i < house_arr.length; i++) {
        if (house_arr[i]["rent"] <= rentValue) //篩選租金
            createMarkers(i, house_arr[i]["address"], house_arr[i]["lat"], house_arr[i]["lon"]);
    }

    for (var i = 0; i < campus_arr.length; i++) {
            createMarkers(i, campus_arr[i]["address"], campus_arr[i]["lat"], campus_arr[i]["lon"]);
    }

    markerCluster = new MarkerClusterer(map, markers);

}

function Mapping(type) {
    var HousingType = {
        1: "公寓",
        2: "學舍",
        3: "透天",
        4: "大樓",
    };
    return HousingType[type];
}

function FilterMap(objecjType) {
    // if(tagId == "houseType"){

    // }
    // else if (tagId == "roomType"){
    //     console.log("roomType");
    // }

    numbers = objecjType.split(",");


    if (markerCluster) deleteMarkers();
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(Find_Schools_lat, Find_Schools_lon)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    stepDisplay = new google.maps.InfoWindow();
    rentValue = parseInt($('#rentBar').val());
    if($('#selectArea option:selected').text() != "不分類"){
        for (var i = 0; i < house_arr.length; i++) {
            if (house_arr[i]["rent"] <= rentValue) {
                for (var j = 1; j < numbers.length; j++) {
                    if (house_arr[i]["type"] == Mapping(numbers[j]))
                        housestatistics(house_arr[i]["rent"],Mapping(numbers[j]),$('#selectArea option:selected').text());
                }
            }
        }
    }
    else{
        for(var k = 0; k < School_arr.length; k++){
            for (var i = 0; i < house_arr.length; i++) {
                if (house_arr[i]["rent"] <= rentValue) {
                    for (var j = 1; j < numbers.length; j++) {
                        if (house_arr[i]["type"] == Mapping(numbers[j]))
                            housestatistics(house_arr[i]["rent"],Mapping(numbers[j]),School_arr[k]['cname']);
                    }
                }
            }
        }
    }

    for (var i = 0; i < house_arr.length; i++) {
        if (house_arr[i]["rent"] <= rentValue) {
            for (var j = 1; j < numbers.length; j++) {
                if (house_arr[i]["type"] == Mapping(numbers[j]))
                    createMarkers(i, house_arr[i]["address"], house_arr[i]["lat"], house_arr[i]["lon"]);
            }
        }
    }
    if(numbers.length == 1) getSchoolInfo();
    else markerCluster = new MarkerClusterer(map, markers);
}

function createMarkers(houseiD, address, lat, lon) {
    var point = new google.maps.LatLng(lat, lon);
    //  infoWindow = new google.maps.InfoWindow();

    var marker = new google.maps.Marker({
        map: map,
        position: point
            //icon : site_path+'image/icon/6-2.png'
    });
    //標記資訊視窗點擊事件
    var strplace = address + "<br>";
    infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {

        infoWindow.setContent(createPopUpHtml(houseiD));
        infoWindow.open(map, marker);
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
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}

function createPopUpHtml(houseiD) {

    var URLsC = "photograph.html";
    houseNo = houseiD;
    if(pages == 1) {
        return "<div class='MarkerPopUp'><div class='MarkerTitle'>"
        + "</div>"
        + "<div class='MarkerContext'>" + "</div>"
        + "<div class='rating-static rating-" + "'></div>"
        + "<div class='MarkerType'>地址: " + house_arr[houseiD]["address"] + "</div>"
        + "<div class='MarkerType'>房屋規格: " + house_arr[houseiD]["type"] + "</div>"
        + "<div class='MarkerType'>樓層: " + house_arr[houseiD]["floor"] + "</div>"
        + "<div class='MarkerType'>獨立電錶: " + house_arr[houseiD]["ammeter"] + "</div>"
        + "<div class='MarkerType'>限制: " + house_arr[houseiD]["limit"] + "</div>"
        + "<div class='MarkerType'>套房: " + house_arr[houseiD]["room"] + "</div>"
        + "<div class='MarkerType'>雅房: " + house_arr[houseiD]["Yroom"] + "</div>"
        + "<div class='MarkerType'>建材: " + house_arr[houseiD]["material"] + "</div>"
        + "<div class='MarkerType'>租約: " + house_arr[houseiD]["lease"] + "</div>"
        + "<div class='MarkerType'>房租: " + house_arr[houseiD]["rent"] + "</div>"
        + "<div class='MarkerType'>押金: " + house_arr[houseiD]["deposit"] + "</div>"
        + "<div class='MarkerType'>額外費用: " + house_arr[houseiD]["expense"] + "</div>"
        + "<button class='btn btn-primary' href='" + URLsC + "' data-toggle='modal' data-target='#myModal'>詳細資訊</button>" + "</div>";
    } else if(pages == 2) {
        return "<div class='MarkerPopUp'><div class='MarkerTitle'>"
        + "</div>"
        + "<div class='MarkerContext'>" + "</div>"
        + "<div class='rating-static rating-" + "'></div>"
        + "<div class='MarkerType'>店名: " + campus_arr[houseiD]["name"] + "</div>"
        + "<div class='MarkerType'>地址: " + campus_arr[houseiD]["address"] + "</div>"
        + "<div class='MarkerType'>營業時間: " + campus_arr[houseiD]["open"] + "</div>"
        + "<div class='MarkerType'>電話: " + campus_arr[houseiD]["phone"] + "</div>"
        + "<button class='btn btn-primary' href='" + URLsC + "' data-toggle='modal' data-target='#myModal'>詳細資訊</button>" + "</div>";
    }else if(pages == 3) {
        return "<div class='MarkerPopUp'><div class='MarkerTitle'>"
        + "</div>"
        + "<div class='MarkerContext'>" + "</div>"
        + "<div class='rating-static rating-" + "'></div>"
        + "<div class='MarkerType'>犯罪地點: " + Crime_arr[houseiD]["Address"] + "</div>"
        + "<div class='MarkerType'>管轄分局: " + Branch_arr[houseiD]["BranchNm"] + "</div>"
        + "<button class='btn btn-primary' href='" + URLsC + "' data-toggle='modal' data-target='#myModal'>詳細資訊</button>" + "</div>";
    }
}
function showHouseInfo(id) {

    $('#myModal').modal('show');
}

// /*類別複選功能*/
function Add_ObjectType(tagId, typename) {
    // alert("Arrival!");
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

    if(pages == 1) {
        FilterMap(objecjType.value);
    }else if(pages == 2) {
        FilterMapCampus(objecjType.value);
    }

}
/*搜尋資料統計
 *************************************************/
function housestatistics(cost,type,school) {
    console.log("work");
        var URL = "welcome/statistics";

        var dataText =
        {
            "kind" : "1",
            "county" : $('#selectCity option:selected').text(),
            "school" : school,
            "cost" : cost,
            "housetype" : type

        };
        console.log(dataText);

        $.ajax(
        {
            url:URL,
            cache: false,
            data:dataText,
            dataType:'text',
            type:"POST",

            success: function(response)
            {
                // alert("work");
            },

            error:  function(xhr, ajaxOptions, thrownError)
            {
            // alert("error");
            // alert(xhr.status);
            // alert(thrownError);
            }

        });

    }
    function campusstatistics(pay,type,school) {
            var URL = "campus/statistics"
            if(pay == "刷卡"){
                var dataText =
                {
                    "kind" : "2",
                    "county" : $('#selectCity option:selected').text(),
                    "school" : school,
                    "restaurant" : type,
                    "pay" : 1

                };
            }
            else
            {
                var dataText =
                {
                    "kind" : "2",
                    "county" : $('#selectCity option:selected').text(),
                    "school" : school,
                    "restaurant" : type,
                    "pay" : 0

                };
            }
            console.log(dataText);

            $.ajax(
            {
                url:URL,
                cache: false,
                data:dataText,
                dataType:'text',
                type:"POST",
                success: function(response)
                {
                    // alert("work");
                },

                error:  function(xhr, ajaxOptions, thrownError)
                {
                // alert("error");
                // alert(xhr.status);
                // alert(thrownError);
                }

            });
        }
    function securitystatistics(branchNm) {
        var URL = "security/statistics";
        if($('#selectArea option:selected ').text() == "不分類"){
            var dataText =
            {
                "kind" : "3",
                "county" : $('#selectCity option:selected').text(),
                "branchNm" : branchNm

            };
        }
        else
        {
            var dataText =
            {
                "kind" : "3",
                "county" : $('#selectCity option:selected').text(),
                "branchNm" : $('#selectArea option:selected ').text()

            };
        }
        console.log(dataText);
        $.ajax(
        {
            url:URL,
            cache: false,
            data:dataText,
            dataType:'text',
            type:"POST",
            success: function(response)
            {
                // alert("work");
            },
            error:  function(xhr, ajaxOptions, thrownError)
            {
            // alert("error");
            // alert(xhr.status);
            // alert(thrownError);
            }
        });
    }

function makeRightSB(page) {
    var size = 0;
    var str = "";
    switch (page)
    {
        case 1:
            size = house_arr.length;
            for(var i = 0 ; i < size ; i++) {
                str +=  "<button id=hlist_"+i+" value="+i+" class=list-group-item>"
                    +   "<p>"+house_arr[i]['address']+"</p>"
                    +   "<p>"+house_arr[i]['type']+"</p>"
                    +   "<p>"+house_arr[i]['room']+"</p>"
                    +   "<p>"+house_arr[i]['Yroom']+"</p>"
                    +   "<p>租金:"+house_arr[i]['rent']+"</p>"
                    +   "<p>電話:"+ house_arr[i]['telephone']+"</p>"
                    +   "<p>手機:"+ house_arr[i]['cellphone']+"</p>"
                    +   "</button>";
            }
            str += "</ul>";
            document.getElementById("house_RSB").innerHTML = str;
            focus(size);
        break;
        case 2:
            size = campus_arr.length;
            str = "<ul class=list-group>"
                + "<button id=list class=list-group-item>"+School_arr[tmp]['cname']+"</button>";
            for(var i = 0 ; i < size ; i++) {
                str +=  "<button id=clist_"+i+" value="+i+" class=list-group-item>"
                    +  campus_arr[i]['name']
                    + "</button>";
            }
            str += "</ul>";
            document.getElementById("campus_RSB").innerHTML = str;
            focus(size);
        break;
        case 3:

            size = Crime_count;
            console.log("SIZE:"+size);
            for(var i = 0 ; i < size ; i++) {
                str +=  "<button id=slist_"+i+" value="+i+" class=list-group-item>"
                    + "<p>地點:" +Crime_arr[i]['Address']+"</p>"                    
                    + "</button>";
            }
            str += "</ul>";
            document.getElementById("security_RSB").innerHTML = str;
            focus(size);
        break;
    }
}

function focus(size) {
    switch (pages)
    {
        case 1:
        for(var i = 0 ; i < size ; i++) {
            document.getElementById("hlist_"+i).addEventListener("click",function(){
                var k = this.value;
                map.setCenter(new google.maps.LatLng(house_arr[k]['lat'],house_arr[k]['lon']));
                infoWindow.setContent(createPopUpHtml(k));
                infoWindow.open(map, markers[k]);
            });
        }
        break;
        case 2:
        for(var i = 0 ; i < size ; i++) {
            document.getElementById("clist_"+i).addEventListener("click",function(){
                var k = this.value;
                map.setCenter(new google.maps.LatLng(campus_arr[k]['lat'],campus_arr[k]['lon']));
                infoWindow.setContent(createPopUpHtml(k));
                infoWindow.open(map, markers[k]);
            });
        }
        break;
        case 3:
        for(var i = 0 ; i < size ; i++) {
            document.getElementById("slist_"+i).addEventListener("click",function(){
                var k = this.value;
                map.setCenter(new google.maps.LatLng(Crime_arr[k]['lat'],Crime_arr[k]['lng']));
                infoWindow.setContent(createPopUpHtml(k));
                infoWindow.open(map, markers[k]);
            });
        }
        break;
    }
}
