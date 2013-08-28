<?php
$fp = fopen("data/category/categ","r");
$flag = false;
if ($fp){
    if (flock($fp, LOCK_SH)){
        while (!feof($fp)) {
        	$buffer = fgets($fp);
		if($flag){
			if($buffer != NULL)print("-");
		}
		else{
			$flag = true;
		}
		print($buffer);
	}	

        flock($fp, LOCK_UN);
    }else{
        print('ファイルロックに失敗しました');
    }
}

fclose($fp);

?>
