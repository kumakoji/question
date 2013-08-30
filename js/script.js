
var question_data = {};
var question_cand = [];
var category ="ALL";
var question_val ="ALL";
var rand;
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
                "システム開発技術":41,
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

$(function(){
	$.ajax({
		url: "user_data/data.xml",
		type: "GET",
		dataType: "xml",
		cache: false,
		error: function(){
			alert("false");
		},
		success: function(xml){
			console.log(xml);
			console.log("read file");
			$('#radar').hide();
			$(xml).find('data').each(function(){
				var id = $(this).find('id').text();
				var num = $(this).find('num').text();
				var true_num = $(this).find('true').text();
				var categ = $(this).find('categ').text();
				var line = num+","+true_num+","+categ;
				question_data[id] = line;
			});
			change_score();
		}

	});

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
			max.push(1);
			if(sum[i] == 0){
				score.push(0.0);
			}
			else{
				score.push( parseFloat(cor[i])/parseFloat(sum[i]) );
			}
			ratio.push( parseFloat(num[i])/parseFloat(data_num[i]) );
		}
	console.log(score);
	console.log(ratio);
		var radarChartData = {
		  labels : name,
		  datasets : [
			{	
			fillColor : "rgba(20,20,20,0.2)",
			strokeColor : "rgba(20,20,20,0)",
			pointColor : "rgba(20,20,20,0)",
			pointStrokeColor : "ffff",
			data : ratio 	
			},
			{
			fillColor : color[0],
			strokeColor : color[1],
			pointColor : color[1],
			pointStrokeColor : "#fff",
			data : score 
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
	console.log(sum);	
	console.log(cor);	
	console.log(num);	
	var color_data = [["rgba(0,120,255,0.5)","rgba(0,120,255,1)"],
			["rgba(120,0,255,0.5)","rgba(120,0,255,1)"],
			["rgba(255,120,0,0.5)","rgba(255,120,0,1)"],
			["rgba(0,255,120,0.5)","rgba(0,255,120,1)"]];	
	
		var myRadar = new Chart(document.getElementById("radar1").getContext("2d")).Radar(make_radar_data(sum[0],cor[0],num[0],color_data[0]),{scaleShowLabels : false, pointLabelFontSize : 10});
		var myRadar = new Chart(document.getElementById("radar2").getContext("2d")).Radar(make_radar_data(sum[1],cor[1],num[1],color_data[1]),{scaleShowLabels : false, pointLabelFontSize : 10});
		var myRadar = new Chart(document.getElementById("radar3").getContext("2d")).Radar(make_radar_data(sum[2],cor[2],num[2],color_data[2]),{scaleShowLabels : false, pointLabelFontSize : 10});
		var myRadar = new Chart(document.getElementById("radar4").getContext("2d")).Radar(make_radar_data(sum[3],cor[3],num[3],color_data[3]),{scaleShowLabels : false, pointLabelFontSize : 10});
	}
	function setAll(){
		question_cand.length=0;
		for(var i in question_data){
			question_cand.push(i);
		}
	}

	function change_score(){

		category = $('#question_categ').val();
		question_val = $('#question_val').val();
		console.log(category,question_val);
		
		if(category == "ALL"){
			setAll();
		}
		else{
			question_cand.length=0;
			if(category == "+++テクノロジ系+++" 
			|| category == "+++マネジメント系+++" 
			|| category == "+++ストラテジ系+++"){
				tmp = category.split("+++");	
				category = tmp[1];
				check_category = [];
				if(category == "テクノロジ系"){
					check_category = tec;
				}else if(category == "マネジメント系"){	
					check_category = man;
				}else if(category == "ストラテジ系"){
					check_category = str;
				}
				for(var i in question_data){
					item = question_data[i].split(",");
					if($.inArray(item[2],check_category) != -1){
						question_cand.push(i);
					}	
				}

			}		
			else{	
				for(var i in question_data){
					item = question_data[i].split(",");
					if(item[2] == category){
						question_cand.push(i);
					}	
				}
			}
		}	
		console.log("category:"+question_cand.length);
		
		if(question_val == "ALL"){
		}
		else if(question_val == "NO ANSWER"){
			var tmp_question = [];
			for(var i=0; i<question_cand.length; i++){
				item = question_data[question_cand[i]].split(",");
				if(item[0] == 0){
					tmp_question.push(question_cand[i]);
				}
			}
			question_cand = tmp_question;
		}
		else if(question_val == "HARD"){
			var tmp_question = [];
			for(var i=0; i<question_cand.length; i++){
				item = question_data[question_cand[i]].split(",");
				if(item[0] != 0){
					score = (parseFloat(item[1])/parseFloat(item[0]))
					if(score <= 0.5){
						tmp_question.push(question_cand[i]);
					}	
				}
			}
			question_cand = tmp_question;
		}	
		if(question_cand.length == 0)$('#reload_page').attr('disabled',true);
		else{
			$('#reload_page').attr('disabled',false);
			$('#reload_page').click();	
		}
		$('#cand_num').text(question_cand.length);	
		console.log("val:"+question_cand.length);

	}
	function get_sum(trip,sum){
		if(trip[2] in sum){
			sum[trip[2]] = sum[trip[2]] + parseInt(trip[0]);
		}
		else{	
			sum[trip[2]] = parseInt(trip[0]);
		}
		return sum
	}
	function get_correct(trip,correct){
		if(trip[2] in correct){
			correct[trip[2]] = correct[trip[2]] + parseInt(trip[1]);
		}
		else{	
			correct[trip[2]] = parseInt(trip[1]);
		}
		return correct
	}
	function get_num(trip,num){		
		if(trip[2] in num){
			if(trip[0] != 0){
				num[trip[2]] = num[trip[2]] + 1;
			}
		}
		else{
			num[trip[2]] = 0;
		}
		return num
	}	
	

	$('#true_click').click(function(){
		output_score(question_data,rand,1)		
	});
	$('#false_click').click(function(){
		output_score(question_data,rand,0)	
	});

	
	$('#save_xml').click(function(){
		console.log("save"+question_data);
		$.post('save_xml.php',{
			result:question_data
			},function(data){
			console.log(data);
			$('#save_checker').text(data);
		});
	});

	$('#reload_page').click(function(){
		rand = question_cand[Math.floor(Math.random()*question_cand.length,1)];
		console.log(rand);
		$("#radar").hide();
		$.post('view_page.php',{
			url_data:rand
				},function(data){
				$('#result').html(data);
			});
			item = question_data[rand].split(",");
			console.log(item[1],parseInt(item[0])-parseInt(item[1]));	
			$('#true').text(item[1]);
			$('#false').text(parseInt(item[0])-parseInt(item[1]));
	});

	$('#question_categ').change(function(){
		change_score();
	});

	$('#question_categ').click(function(){
		change_score();
	});


	$('#question_val').change(function(){
		change_score();
	});
	
	$('#refresh_all').click(function(){
		if(confirm("OK?")){
			$.post('data/user/kumanami/tmp.py',{data:"kumanami"},function(data){
			console.log(data);
			});
		}
		else{
		}
	});			
	$('#show_result').click(function(){
		$('#result').empty();
		$.post('read_category.php',{
			},function(data){
			item = data.split("-");
			category_relation = {};
			for(var i=0; i<item.length; i++){	
				pair = item[i].split(",");
				tmp = pair[1].split("\n");
				category_relation[tmp[0]] = pair[0];
			}
			sum_category = {};
			sum_tec = {};
			sum_man = {};
			sum_str = {};
			correct_category = {};
			correct_tec ={};
			correct_man ={};
			correct_str ={};
			num_category = {};
			num_tec = {};
			num_man = {};
			num_str = {};

			for(var i in question_data){
				trip = question_data[i].split(",");
				if(category_relation[trip[2]] in sum_category){
					sum_category[category_relation[trip[2]]] = 
					sum_category[category_relation[trip[2]]] + parseInt(trip[0]);
				}
				else{
					sum_category[category_relation[trip[2]]] = parseInt(trip[0]);
				}
				
				if(category_relation[trip[2]] in correct_category){
					correct_category[category_relation[trip[2]]] =
					correct_category[category_relation[trip[2]]] + parseInt(trip[1]);
				}
				else{
					correct_category[category_relation[trip[2]]] = parseInt(trip[1]);
				}
				if(category_relation[trip[2]] in num_category){
					if(trip[0] != 0){	
						num_category[category_relation[trip[2]]] =
						num_category[category_relation[trip[2]]] + 1;
					}
				}
				else{
					num_category[category_relation[trip[2]]] = 0;
				}
					
					
				
				if(category_relation[trip[2]] == "テクノロジ系"){
					sum_tec = get_sum(trip,sum_tec)
					correct_tec = get_correct(trip,correct_tec)
					num_tec = get_num(trip,num_tec)
				}

				if(category_relation[trip[2]] == "マネジメント系"){
					sum_man = get_sum(trip,sum_man)
					correct_man = get_correct(trip,correct_man)
					num_man = get_num(trip,num_man)
				}


				if(category_relation[trip[2]] == "ストラテジ系"){
					sum_str = get_sum(trip,sum_str)
					correct_str = get_correct(trip,correct_str)
					num_str = get_num(trip,num_str)
				}

		}
//			console.log(sum_category);
//			console.log(sum_tec);
//			console.log(sum_man);
//			console.log(sum_str);
//			console.log(correct_category);
//			console.log(correct_tec);
//			console.log(correct_man);
//			console.log(correct_str);
			var sum = [sum_category,sum_tec,sum_man,sum_str];
			var correct = [correct_category,correct_tec,correct_man,correct_str];
			var num = [num_category,num_tec,num_man,num_str];
			show_chart(sum,correct,num);
			$('#radar').show();
		});
	});
		
});

	
