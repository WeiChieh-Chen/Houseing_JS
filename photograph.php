
<div id = "Show">

    </div>
<script>
console.log("asdfdaf");
var str;
if(pages == 1) {
   str  ="<button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>"
    +"<h2 class='modal-title'><a>" + house_arr[houseNo]['address'] + "</a></h2>"
    +"<h3 class='modal-meta'>"+house_arr[houseNo]['type']+"</h4>"
    +"</div>"
    +"<div class='modal-body'>"
    + "<b>備註:</b>"      + house_arr[houseNo]['note']           + "<br>"
    + "<b>聯絡人:</b>"    + house_arr[houseNo]['contact']        + "<br>"
    + "<b>電話:</b>"      + house_arr[houseNo]['telephone']      + "<br>"
    + "<b>手機:</b>"      + house_arr[houseNo]['cellphone']      + "<br>"
    + "<b>更新日期:</b>"   + house_arr[houseNo]['updatedate']    + "<br>"
    + "<b>證明文件:</b>"   + house_arr[houseNo]['certificate']   + "<br>"
    + "<b>安全評核</b>"    + house_arr[houseNo]['assessment']    + "<br>"
    + "<b>安全措施:</b>"   + house_arr[houseNo]['measure']       + "<br>"
    + "<b>熱水器設備:</b>" + house_arr[houseNo]['heater']        + "<br>"
    + "<b>屋內設備:</b>"   + house_arr[houseNo]['equipment']     + "<br>"
    + "<b>公共設施:</b>"   + house_arr[houseNo]['facility']      + "<br>"
    + "<img class='img-responsive' src='"+house_arr[houseNo]['image1']+"' ></img>"
    + "<img class='img-responsive' src='"+house_arr[houseNo]['image2']+"' ></img>"
    + "<img class='img-responsive' src='"+house_arr[houseNo]['image3']+"' ></img>"

    + "</div>"
    +"<div class='modal-footer'>"
}else if(pages == 2){
    str  ="<button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>"
    +"<h2 class='modal-title'><a>" + campus_arr[houseNo]['name']  + "</a></h2>"
    +"<h3 class='modal-meta'>"+campus_arr[houseNo]['type']+"</h4>"
    +"</div>"
    +"<div class='modal-body'>"
    +"<b>地址:</b>"                      + campus_arr[houseNo]['address']     + "<br>"
    +"<b>電話:</b>"                      + campus_arr[houseNo]['phone']       + "<br>"
    +"<b>安全評核:</b>"                  + campus_arr[houseNo]['level']        + "<br>"
    +"<b>付費方式:</b>"                  + campus_arr[houseNo]['pay']          + "<br>"
    +"<b>介紹:</b>"                      + campus_arr[houseNo]['introduce']    + "<br>"
    +"<img class='img-responsive' src='"+ campus_arr[houseNo]['image1']       +"' ></img>"
    +"<img class='img-responsive' src='"+ campus_arr[houseNo]['image2']       +"' ></img>"
    +"<img class='img-responsive' src='"+ campus_arr[houseNo]['image3']       +"' ></img>"
    +"</div>"
    +"<div class='modal-footer'>"
}

//+"<div id='myCarousel' class='carousel slide' data-ride='carousel'>"
//+"<ol class='carousel-indicators'>"
//+"<li data-target='#myCarousel' data-slide-to='' class='active'></li>"
//+"<li data-target='#myCarousel' data-slide-to=''></li>"
//+"</ol>"
//+"<div class='carousel-inner'>"
//+"</div>"
//+"<a class='left carousel-control' href='#myCarousel' data-slide='prev'>"
//+"<span class='icon-prev'></span>"
//+"</a>"
//+"<a class='right carousel-control' href='#myCarousel' data-slide='next'>"
//+"<span class='icon-next'></span>"
//+"</a>"
//+"</div>"
+ "<button type='button' class='btn btn-danger' data-dismiss='modal'>關閉視窗</button>"
+"</div>"   ;
document.getElementById("Show").innerHTML=str;


 </script>

<script>
/*
   <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h2 class="modal-title">"+house_arr[houseNo]+"

    </h2>
    <h4 class="modal-meta"></h4>
</div>
<div class="modal-body">





        //document.write(house_arr[houseNo]["expense"]);
//house_arr[houseNo]["expense"]

</div>
<div class="modal-footer">
<!-- Full Page Image Background Carousel Header -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">

            <li data-target="#myCarousel" data-slide-to="" class="active"></li>

            <li data-target="#myCarousel" data-slide-to=""></li>

        </ol>
        <!-- Wrapper for Slides -->
        <div class="carousel-inner">

        </div>
        <!-- Controls -->
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="icon-prev"></span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="icon-next"></span>
        </a>
    </div>
</div>









        var note = house_arr[houseNo]["note"];
        var contact = house_arr[houseNo]["contact"];
        var telephone = house_arr[houseNo]["telephone"];
        var cellphone = house_arr[houseNo]["cellphone"];
        var updatedate = house_arr[houseNo]["updatedate"];
        var certificate = house_arr[houseNo]["certificate"];
        var assessment = house_arr[houseNo]["assessment"];
        var measure = house_arr[houseNo]["measure"];
        var heater = house_arr[houseNo]["heater"];
        var equipment = house_arr[houseNo]["equipment"];
        var facility = house_arr[houseNo]["facility"];

        var aa = note
        +contact
        +telephone
        +cellphone
        +updatedate
        +certificate
        +assessment
        +measure
        +heater
        +equipment
        +facility;
        document.getElementById("Show").innerHTML=aa;

/*
document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")
        document.getElementById("Show")

.innerHTML=house_arr[houseNo]["note"];
.innerHTML=house_arr[houseNo]["contact"];
.innerHTML=house_arr[houseNo]["telephone"];
.innerHTML=house_arr[houseNo]["cellphone"];
.innerHTML=house_arr[houseNo]["updatedate"];
.innerHTML=house_arr[houseNo]["certificate"];
.innerHTML=house_arr[houseNo]["assessment"];
.innerHTML=house_arr[houseNo]["measure"];
.innerHTML=house_arr[houseNo]["heater"];
.innerHTML=house_arr[houseNo]["equipment"];
.innerHTML=house_arr[houseNo]["facility"];

 */
	//Bootstrap modal clear content
	$('#myModal').on('hidden.bs.modal', function (e) {
	  $(this).removeData('bs.modal');
	})
</script>

