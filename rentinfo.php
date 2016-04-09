
            <!-- sidebar -->
            <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar-search" role="navigation">
               <form role="form" id="formSearch">
                  <div class="sidebar-left well sidebar-nav">
                     <div class="form-group">
                        <label for="city">縣市</label>
                        <select class="form-control" id="selectCity" name="selectCity">
                           <option value="0">選擇城市</option>
                           <option value="1">基隆市</option>
                           <option value="2">臺北市</option>
                           <option value="3">新北市</option>
                           <option value="4">桃園市</option>
                           <option value="6">新竹市</option>
                           <option value="5">新竹縣</option>
                           <option value="7">苗栗縣</option>
                           <option value="8">南投縣</option>
                           <option value="10">臺中市</option>
                           <option value="11">彰化縣</option>
                           <option value="12">雲林縣</option>
                           <option value="14">嘉義市</option>
                           <option value="13">嘉義縣</option>
                           <option value="16">臺南市</option>
                           <option value="17">高雄市</option>
                           <option value="19">屏東縣</option>
                           <option value="22">臺東縣</option>
                           <option value="21">花蓮縣</option>
                           <option value="20">宜蘭縣</option>
                           <option value="25">澎湖縣</option>
                           <option value="23">金門縣</option>
                           <option value="24">連江縣</option>
                        </select>
                     </div>
                     <fieldset id="selectToggle" disabled>
                        <div class="form-group">
                           <label for="area">學校</label>
                           <select class="form-control" id="selectArea" name="selectArea">
                              <option value="">請選擇學校</option>
                           </select>
                        </div>
                     </fieldset>

                     <div id = "showSent">
                           <h3><a>25000元</a></h3>
                     </div>
                     <input id="rentBar" type="range" min="1500" max="50000" value="25000" step="500"></input>

                     </br>

                     <br></br>
                     <button type="button" class="btn btn-success" id="serch" onClick="getSchoolInfo();" ><h2>搜尋</h2></button>
                  </div>
                  <!--/.well -->
                  <div class="sidebar-left well sidebar-nav" >
                     <ul class="nav">
                        <div class="form-group" id="houseButton">
                           <label for="exampleInputPassword1">房屋種類</label>
                           <div data-toggle="buttons-checkbox" class = "row">
                              <button type="button"  value="1" class="btn btn-default" onClick="Add_ObjectType('houseType',1);">公寓</button>
                              <button type="button"  value="2" class="btn btn-default" onClick="Add_ObjectType('houseType',2);">學舍</button>
                              <button type="button"  value="3" class="btn btn-default" onClick="Add_ObjectType('houseType',3);">透天</button>
                              <button type="button"  value="4" class="btn btn-default" onClick="Add_ObjectType('houseType',4);">大樓</button>
                           </div>
                        </div>
                        <input class="form-control" type="text" placeholder="請點選搜尋類別" id="houseType" name="houseType" style = "display:none">

                     </ul>
                  </div>
                  <!--/.well -->
               </form>
            </div>
            <!--/sidebar-->
            <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar-sirections" role="navigation" style="display:none;">
            </div>