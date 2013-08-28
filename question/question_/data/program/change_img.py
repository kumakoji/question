# _*_ coding: utf-8 _*_
import re,commands
for line in open("list"):
	line = line[:-1]
	for i in range(1,81):
		url =  line+"/q"+str(i)+".html"
		paper_list = commands.getoutput('mkdir /home/kumanami/public_html/question/new_data/'+line)
		f = open("/home/kumanami/public_html/question/data/"+ url)
		fw = open("/home/kumanami/public_html/question/new_data/"+ url,"w")
		p = re.compile('src="img')
		for item in f:
			if 'src="img' in item:
				fw.write(p.sub('src="img/'+line,item))
			else:
				fw.write(item)
		f.close()
		fw.close()
