<?php
//function view_html(){
	print "ok";
	$season = "aki";
	$nen = 25;
	while($season=="aki" && $nen==25){
		$season = rand(0,1);
		switch($season){
		case 0 :$season="haru";
			break;
		case 1 :$season="aki";
			break;
		}
		$nen = rand(21,25);
		$que = rand(1,80);
	}
	$url = "data/".$nen."_".$season."/rq".$que.".html";
	echo $url;
	require($url);
//}
?>
