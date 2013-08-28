# _*_ coding: utf-8 _*_
import re
check = {};
fw = open("data.xml","w");
fw.write("<?xml version='1.0' encoding='shift_jis'?>"+"\n")
fw.write("<dataset>"+"\n")
for line in open("list"):
	line = line[:-1]
	for i in range(1,81):
		fw.write(" <data>")
		url =  line+"/rq"+str(i)+".html"
		fw.write("  <id>" + url + "</id>"+"\n")
		fw.write("  <num>0</num>"+"\n")
		fw.write("  <true>0</true>"+"\n")
		f = open("/home/kumanami/public_html/question/data/"+ url)
		for item in f:
			if "answerChar" in item:
				val = item.split(" &gt;&gt; ")
				fw.write("  <categ>" + val[1] + "</categ>"+"\n")
				tmp = val[0].split("<p>")
				print tmp[1] + "\t" + val[1]
		f.close()
		fw.write(" </data>"+"\n")
fw.write("</dataset>")
fw.close();
#f = open("cateh_res","w")
#for k in check.keys():
#	f.write(k+"\n")
#f.close()
