var data_num ={ 
		"基礎理論":43,
                "アルゴリズムとプログラミング":44,
                "コンピュータ構成要素":42,
                "システム構成要素":50,
                "ソフトウェア":43,
                "ハードウェア":25,
                "ヒューマンインターフェイス":13,
                "マルチメディア":15,
                "データベース":51,
                "ネットワーク":46,
                "セキュリティ":60,
                "システム開発技術":20,
                "ソフトウェア開発管理技術":20,
                "プロジェクトマネジメント":45,
                "サービスマネジメント":30,
                "システム監査":31,
                "システム戦略":26,
                "システム企画":25,
                "企業活動":49,
                "経営戦略マネジメント":33,
                "技術戦略マネジメント":7,
                "ビジネスインダストリ":28,
                "法務":33,
		"テクノロジ系":493,
		"マネジメント系":106,
		"ストラテジ系":201
 };
function output_score(question_data,rand,value){
	item = question_data[rand].split(",");
	item[0] = parseInt(item[0],10)+1;
	item[1] = parseInt(item[1],10)+parseInt(value,10);
	line = item[0]+","+item[1]+","+item[2];
	question_data[rand] = line;
	console.log(question_data[rand]);
	$('#true').text(item[1]);	
	$('#false').text(parseInt(item[0])-parseInt(item[1]));
	$('#question_categ').click();
	$('#save_xml').click();
	$('#reload_page').click();
}
function make_radar_data(sum,cor,num,color){
	var name = [];
	var score = [];
	var ratio = [];
	var max = [];
	for(var i in sum){
		name.push(i);
		max.push(1.0);
		if(sum[i] == 0){
			score.push(0.0);
			ratio.push(0.0);
		}
		else{
			score.push( parseFloat(cor[i])/parseFloat(sum[i]) );
		}
		ratio.push( parseFloat(num[i])/parseFloat(data_num[i]) );
	}
//console.log(score);
//console.log(ratio);
	var radarChartData = {
	  labels : name,
	  datasets : [
		{
		fillColor : color[0],
		strokeColor : color[1],
		pointColor : color[1],
		pointStrokeColor : "#fff",
		data : score 
	    	},
		{

		fillColor : "rgba(20,20,20,0.5)",
		strokeColor : "rgba(20,20,20,0)",
		pointColor : "rgba(20,20,20,0)",
		pointStrokeColor : "ffff",
		data : ratio 	
		},
		{

		fillColor : "rgba(20,20,20,0)",
		strokeColor : "rgba(20,20,20,0)",
		pointColor : "rgba(20,20,20,0)",
		pointStrokeColor : "ffff",
		data : max
	 	}           	  
	   ]  
	}
	return radarChartData;
}
function show_chart(sum,cor,num){	
//console.log(sum);	
//console.log(cor);	
//console.log(num);	
var color_data = [["rgba(0,120,255,0.5)","rgba(0,120,255,1)"],
		["rgba(120,0,255,0.5)","rgba(120,0,255,1)"],
		["rgba(255,120,0,0.5)","rgba(255,120,0,1)"],
		["rgba(0,255,120,0.5)","rgba(0,255,120,1)"]];	

	var myRadar = new Chart(document.getElementById("radar1").getContext("2d")).Radar(make_radar_data(sum[0],cor[0],num[0],color_data[0]),{scaleShowLabels : false, pointLabelFontSize : 10});
	var myRadar = new Chart(document.getElementById("radar2").getContext("2d")).Radar(make_radar_data(sum[1],cor[1],num[1],color_data[1]),{scaleShowLabels : false, pointLabelFontSize : 10});
	var myRadar = new Chart(document.getElementById("radar3").getContext("2d")).Radar(make_radar_data(sum[2],cor[2],num[2],color_data[2]),{scaleShowLabels : false, pointLabelFontSize : 10});
	var myRadar = new Chart(document.getElementById("radar4").getContext("2d")).Radar(make_radar_data(sum[3],cor[3],num[3],color_data[3]),{scaleShowLabels : false, pointLabelFontSize : 10});



//	var radarChartData = {
//	  labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
//	  datasets : [
//	    {
//	      fillColor : "rgba(220,220,220,0.5)",
//	      strokeColor : "rgba(220,220,220,1)",
//	      pointColor : "rgba(220,220,220,1)",
//	      pointStrokeColor : "#fff",
//	      data : [65,59,90,81,56,55,40]
//	    }
//	  ]  
//	}
//	var myRadar = new Chart(document.getElementById("radar").getContext("2d")).Radar(radarChartData,{scaleShowLabels : false, pointLabelFontSize : 10});
//
//var pieData = [
//	{
//		name: "tmp",
//		value: 70,
//		color:"#CCCCCC"
//	},
//	{
//		value : 15,
//		color : "#FF0066"
//	},
//	{
//		value : 15,
//		color : "#666666"
//	}
//	];
//	var myPie = new Chart(document.getElementById("pieArea").getContext("2d")).Pie(pieData);
}
