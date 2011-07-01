<?php
 $url = 'http://www.betterplace.org/de/activity_feed/donations?auth=changetheworld&since='.urlencode($_GET['since']);
 $ch = curl_init();
 $timeout = 5;
 curl_setopt($ch,CURLOPT_URL,$url);
 curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
 curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
 $data = curl_exec($ch);
 curl_close($ch);
 echo $data;
?>