/*
    Function Name : getCampusInfo()
    Function Work : 取得e點靈資料

    API 呼叫網址：http://140.130.34.31/api.php?action=restaurantlist&school=學校名稱
*/
function getCampusInfo() {
    //alert('(σ" 。 。)σ');
    var School = document.getElementById("selectArea").value;
    var URLs = HousingURL + "api.php?action=restaurantlist&school=";
    if (School != "0"){
        URLs = URLs + School;
        loadingCampusData(URLs,School,$('#selectArea option:selected').text());
    }else {
        for (var i = 0 ; i < School_arr.length ; i++){
            loadingCampusData(URLs+School_arr[i]["ename"],School_arr[i]["ename"],School_arr[i]["cname"]);
        }
    }
}
function loadingCampusData(URLs,School,cschool){

    console.log(URLs);
    var campusdata = new Array();
    $.ajax({
        url: URLs,
        dataType: 'XML',
        success: function(response) {

                $(response).find("restaurant").each(function(i) { //取得xml父節點
                    campusdata[i] = new Array();
                    var total = $(response).find("restaurant").length; //xml的總筆數
                    campusdata[i]["id"] = $(this).children("id").text(); // 編號-
                    campusdata[i]["name"] = $(this).children("name").text(); // 名稱
                    campusdata[i]["type"] = $(this).children("type").text(); // 類型
                    campusdata[i]["address"] = $(this).children("address").text(); // 地址
                    campusdata[i]["lon"] = $(this).children("lon").text(); //    座標 經度
                    campusdata[i]["lat"] = $(this).children("lat").text(); //  座標 緯度
                    campusdata[i]["delivery"] = $(this).children("delivery").text(); // 交付
                    campusdata[i]["url"] = $(this).children("url").text(); //  url
                    campusdata[i]["open"] = $(this).children("open").text(); // 營業時間
                    campusdata[i]["break"] = $(this).children("break").text(); //
                    campusdata[i]["level"] = $(this).children("level").text(); // 品質
                    campusdata[i]["pay"] = $(this).children("pay").text(); // 付費方式
                    campusdata[i]["phone"] = $(this).children("phone").text(); // 電話
                    campusdata[i]["introduce"] = $(this).children("introduce").text(); // 介紹

                    campusdata[i]["image1"] = $(this).children("image1").text();
                    campusdata[i]["image2"] = $(this).children("image2").text();
                    campusdata[i]["image3"] = $(this).children("image3").text();

                    campus_arr = campusdata;

                });

                var tmp = 0;
                for (var i = 0; i < School_arr.length; i++) {
                    //console.log(School_arr[i]["ename"]);
                    if (School_arr[i]["ename"] == School) {
                        tmp = i;
                        break;
                    }
                }

                //可在沒學校的情況下就搜尋
                if(tmp != 0) {
                    if (campusdata.length == 0) {
                        //alert("資料庫沒有內容");
                        console.log(School_arr[tmp]['cname']+ " -> 資料庫沒有內容");
                    } else {
                        SetMap(campus_arr[tmp]["lat"], campus_arr[tmp]["lon"]);
                    }
                } else {
                    for(var i = 0 ;i < campus_arr.length ; i++) {
                        if (campus_arr.length == 0) {
                            //alert("資料庫沒有內容");
                            console.log(School_arr[tmp]['cname']+ " -> 資料庫沒有內容");
                        }else {
                            SetMap(campus_arr[i]["lat"], campus_arr[i]["lon"]);
                        }
                    }
                }

                makeRightSB(pages);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("getCampusInfo , error ! ");
            }

        });
}

function RestaurantType(type) {
    var Restaurant = {
        1: "餐盒業",
        2: "觀光飯店附設宴席餐廳",
        3: "一般餐飲業",
    };
    return Restaurant[type];
}

function FilterMapCampus(objecjType) {

    numbers = objecjType.split(",");
    console.log(numbers);
//分離object裡 現金與刷卡的值，使得numbers長度不變。
var pays = false;
for(var i = 0 ; i < numbers.length ; i++) {
    if(numbers[i] == 5) {
        pays = true;
        delete numbers[i];
    }
}

if (markerCluster) deleteMarkers();
var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(Find_Schools_lat, Find_Schools_lon)
};
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
stepDisplay = new google.maps.InfoWindow();

for (var i = 0; i < campus_arr.length; i++) {
    var checkPay = false;
    var checkType = false;
            //篩選payType
            if(campus_arr[i]["pay"] == "刷卡"){
                checkPay = true;
            }
            //篩選restaurantType
            for (var j = 1; j < numbers.length; j++) {
                if(campus_arr[i]["type"] == RestaurantType(numbers[j])){
                    checkType = true;
                    break;
                }
            }

            if(pays) {
                if(checkPay && checkType) {
                    createMarkers(i, campus_arr[i]["address"], campus_arr[i]["lat"], campus_arr[i]["lon"]);
                }
            }
            else {
                if(checkType) {
                    createMarkers(i, campus_arr[i]["address"], campus_arr[i]["lat"], campus_arr[i]["lon"]);
                }
            }
        }

    if(numbers.length == 1) getCampusInfo();
    else markerCluster = new MarkerClusterer(map, markers);

    if($('#selectArea option:selected').text() != "不分類"){
        campusstatistics(campus_arr[i]["pay"],RestaurantType(numbers[j]),$('#selectArea option:selected').text());
    }
    else{
        for(var k = 0; k < School_arr.length; k++){
            campusstatistics(campus_arr[i]["pay"],RestaurantType(numbers[j]),School_arr[k]['cname']);
        }
    }


}
