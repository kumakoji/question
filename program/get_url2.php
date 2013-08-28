<?php
mb_internal_encoding('utf-8');
mb_language('Japanese');
echo $argv[1];
for($i=1; $i<81; $i++){
	$url = 'http://www.ap-siken.com/kakomon/'.$argv[1].'/q'.$i.'.html';
	if (($str = mb_convert_encoding(file_get_contents($url),"Shift_JIS", "auto")) != FALSE) {
		#$str = explode('<!-- HEADER START -->',$str);	
		#print "\n".count($str)."\n";
		#$str1 = explode('<!-- HEADER END -->',$str[1]);
		#print count($str1)."\n";
		#$str2 = explode('<div class="ad fl"',$str1[1]);
		#print count($str2)."\n";
		#$str3 = explode('show_ads.js"></script></div>',$str2[1]);
		#print count($str3)."\n";
		#$str4 = explode('<div class="fl ad"',$str3[1]);
		#print count($str4)."\n";
		#print $str4[1];
		#print '++++++++';
		#$str5 = explode('<!-- SCRIPT START -->',$str4[1]);
		
		$fp = fopen('./data/'.$argv[1].'/q'.$i.'.html','w');
		#fwrite($fp , $str[0]);
		#fwrite($fp , $str2[0]);
		#fwrite($fp , $str4[0]);
		#fwrite($fp , $str5[1]);
		fwrite($fp , $str);
		fclose($fp);	
	}
}



?>
