<?php

$result = $_POST['result'];
#$result = array(
#	"24_aki/rq77.html"=>"1,1,システム構成要素"
#	);

	$dom = new DomDocument('1.0','shift_jis');
	$dom->formatOutput = true;

	$dataset = $dom->appendChild($dom->createElement('dataset'));

	foreach($result as $k => $v){
		$val = explode(',',$v);	
		$data= $dataset->appendChild($dom->createElement('data'));
		$data->appendChild($dom->createElement('id',$k));
		$data->appendChild($dom->createElement('num',$val[0]));
		$data->appendChild($dom->createElement('true',$val[1]));
		$data->appendChild($dom->createElement('categ',$val[2]));
	}	

	
	$dom->save('user_data/data.xml');
?>
