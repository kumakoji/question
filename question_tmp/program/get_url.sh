#!/bin/sh
while read line; do
	mkdir -p ./data/$line/img
	php get_url2.php $line
	php get_url_random.php $line	
done<"ReadFile_image"
cp data/23_toku/r* data/23_haru
cp data/23_toku/q* data/23_haru
