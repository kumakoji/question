#!/bin/sh
while read line; do
	mkdir -p ./data/$line/img
	php get_image.php $line
done<"ReadFile_image"
