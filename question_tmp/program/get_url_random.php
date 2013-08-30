<?php
mb_internal_encoding('utf-8');
mb_language('Japanese');
echo $argv[1];
for($i=1; $i<81; $i++){
	$url = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/q'.$i.'.html';
	if (($str = mb_convert_encoding(file_get_contents($url),"Shift_JIS", "auto")) != FALSE) {
		$str = str_replace('img src="img','img src="data/'.$argv[1].'/img',$str);
		#$str = explode('<div class="ad fl"',$str);	
		#$str1 = explode('<!-- HEADER START -->',$str[0]);
		#$str2 = explode('<!-- HEADER END -->',$str1[1]);
		##$str = explode('show_ads.js"></script></div>',$str[1]);
		#$str = explode('/* APcom 300x250 Image */',$str[1]);
		##print $str1[0];
		##print $str[1];	
		$fp = fopen('./data/'.$argv[1].'/rq'.$i.'.html','w');
		#fwrite($fp , $str1[0]);
		#fwrite($fp , $str2[1]);
		#fwrite($fp , $str[1]);
		fwrite($fp , $str);
		fclose($fp);	
	}
}



?>
