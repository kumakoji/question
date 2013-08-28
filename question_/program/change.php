<?php
mb_internal_encoding('utf-8');
mb_language('Japanese');
$count = 1;
$url = 'http://www.ap-siken.com/kakomon/21_haru/q'.$count.'.html';

if (($str = mb_convert_encoding(file_get_contents($url),"UTF-8", "auto")) != FALSE) {
	print $str;
}
?>
