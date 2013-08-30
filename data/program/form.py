#coding : utf-8
#整形プログラム
#$1内のデータを整形しnew_dataに出力
import sys,commands
argvs = sys.argv

files = commands.getoutput("ls "+argvs[1]+"r*")
files = files.split("\n")


flag = True
for file in files:
	output = file.replace("/data/","/new_data/")
	f = open(output,"w")
	for line in open(file):
		if '<div class="AllDoc">' in line:
			flag = False
		elif '<!-- MAINCONTENT START -->' in line:
			flag = True
		elif '<div class="fl ad"><script type="text/javascript">' in line:
			flag = False
		elif '<!-- SCRIPT END -->' in line:
			flag = True
		if flag:
			f.write(line)
	f.close()
