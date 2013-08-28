<?php
mb_internal_encoding('utf-8');
mb_language('Japanese');
$count = 1;
$url = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/q'.$count.'.html';
$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/0'.$count.'.gif';

while($count < 81){
	#main image
	$img = file_get_contents($image);
	if($img != FALSE){
		if($count <10)
			file_put_contents('./data/'.$argv[1].'/img/0'.$count.'.gif',$img);
		else{	
			file_put_contents('./data/'.$argv[1].'/img/'.$count.'.gif',$img);
		}
	}	

	#answer image
	for($i = 0; $i < 4; $i++){
		$moji=NULL;
		switch($i){
			case 0:$moji="a";break;
			case 1:$moji="i";break;
			case 2:$moji="u";break;
			case 3:$moji="e";break;
			
		}
		if($count<10)$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/0'.$count.$moji.'.gif';
		else{
			$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/'.$count.$moji.'.gif';
		}
		$img = file_get_contents($image);
		if($img != FALSE){
			if($count <10)
				file_put_contents('./data/'.$argv[1].'/img/0'.$count.$moji.'.gif',$img);
			else{	
				file_put_contents('./data/'.$argv[1].'/img/'.$count.$moji.'.gif',$img);
			}
	
		}
	}
	#sub image
	$count2=1;
	if($count<10)$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/0'.$count.'_'.$count2.'.gif';
	else{
		$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/'.$count.'_'.$count2.'.gif';
	}
	while($img = file_get_contents($image) != NULL){
		$img = file_get_contents($image);
		
		if($count <10)
			file_put_contents('./data/'.$argv[1].'/img/0'.$count.'_'.$count2.'.gif',$img);
		else{	
			file_put_contents('./data/'.$argv[1].'/img/'.$count.'_'.$count2.'.gif',$img);
		}
		$count2++;
		if($count<10)$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/0'.$count.'_'.$count2.'.gif';
		else{
			$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/'.$count.'_'.$count2.'.gif';
		}
	}
	$count++;
	if($count<10)$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/0'.$count.'.gif';
	else{
		$image = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/img/'.$count.'.gif';
	}
}



if (($str = mb_convert_encoding(file_get_contents($url),"UTF-8", "auto")) != FALSE) {
	
	//print $str;
}
print $img;
?>
