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
    $branchNm=$_POST['branchNm'];
    $sql = mysql_query("INSERT INTO `housingapp` (kind,county,branchNm) 
    VALUES ('$kind','$county','$branchNm')");
?>
<script>
    javascript:location.replace('securities.html');
</script>
</body>
</html>