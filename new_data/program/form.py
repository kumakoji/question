#coding : utf-8
flag = True
for line in open("/home/kumanami/public_html/question/base_data/data/21_aki/q1.html"):
	if '<div class="AllDoc">' in line:
		flag = False
	elif '<!-- MAINCONTENT START -->' in line:
		flag = True
	elif '<div class="fl ad"><script type="text/javascript">' in line:
		flag = False
	elif '<!-- SCRIPT END -->' in line:
		flag = True
	if flag:
		print line[:-1]
