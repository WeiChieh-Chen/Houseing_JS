<!DOCTYPE html>
<html>
<body>

<?php 
    $dbhost = '140.130.35.62:8082';
    $dbuser = '40343236';
    $dbpass = '40343236';
    $dbname = '40343236';
    $conn = mysql_connect($dbhost, $dbuser, $dbpass) ;//連接資料庫
    mysql_query("SET NAMES 'utf8'");//設定語系
    mysql_select_db($dbname);
    $kind=$_POST['kind'];
    $county=$_POST['county'];
    $school=$_POST['school'];
    $restaurant=$_POST['restaurant'];
    $pay=$_POST['pay'];
    $sql = mysql_query("INSERT INTO `housingapp` (kind,county,school,restaurant,pay) 
    VALUES ('$kind','$county','$school','$restaurant','$pay')");
?>
<script>
    javascript:location.replace('campusdelicacies.html');
</script>
</body>
</html>