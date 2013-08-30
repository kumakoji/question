/* Google Maps APIサンプル */
function copyArray(arr){
	var newarr = [];
	for(var i = 0;i<arr.length;i++){
		if(arr[i] instanceof Array){
			//arr[i]が配列ならcopyArrayで
			newarr[i] = copyArray(arr[i]);
		}else{
			//そうでなければ代入で
			newarr[i] = arr[i];
		}
	}
	return newarr;
}

function createRegion(region,lv,sColor){
	var toplat = 35.81054611;
	var bottomlat = 35.60522769;
	var leftlng = 139.6594691;
	var rightlng = 139.8654628;
	var vartex = [
				  [bottomlat,leftlng],
			      [bottomlat,rightlng],
			      [toplat,leftlng],
			      [toplat,rightlng]
			     ];
	var list = new Array();
	var n = region;
	for(var i=0; i<lv; i++){
		list[lv-i-1] = n%4; 
		n = Math.floor(n/4);
	}
	//list.reverse();
	var temp = [];
	
	for(var i=0; i<lv; i++){
		num = list[i];
		//num = 1;
		temp = [
				[(vartex[0][0]+vartex[num][0])/2,(vartex[0][1]+vartex[num][1])/2],
				[(vartex[1][0]+vartex[num][0])/2,(vartex[1][1]+vartex[num][1])/2],
				[(vartex[2][0]+vartex[num][0])/2,(vartex[2][1]+vartex[num][1])/2],
				[(vartex[3][0]+vartex[num][0])/2,(vartex[3][1]+vartex[num][1])/2]
			   ];
		vartex = copyArray(temp);
	}
	
	var lt = new google.maps.LatLng(vartex[0][0],vartex[0][1]);
	var rb = new google.maps.LatLng(vartex[3][0],vartex[3][1]);
	var pos = new google.maps.LatLngBounds(lt,rb);
	
	var pattern = new google.maps.Rectangle();

	var pOptions = {
  	bounds : pos,
  	strokeWeight : 3,
  	strokeColor : sColor,
  	strokeOpacity : 0.8,
    fillColor : "#000000",
    fillOpacity : 0.0,
  	clickable : false,
  };
  
  pattern.setOptions(pOptions);
  
  return pattern;

}

function createPath(tripdata){
    var path = new Array();
    $.each(tripdata.Path,function(k,v){
        var p = new google.maps.LatLng(v.lat,v.lng);
        path.push(p);
    });
    tripPath = new google.maps.Polyline({
        path: path,
        strokeColor: "#FF6699",
        strokeOpacity: 0.7,
        strokeWeight: 2
    });
    return tripPath;
}

function drowPatternPath(path,map,writeColor){
    var patternPath = new google.maps.Polyline({
        path: path,
        strokeColor: writeColor,
        strokeOpacity: 0.5,
        strokeWeight: 3
    });
    patternPath.setMap(map);
    return patternPath;

}


google.maps.event.addDomListener(window,'load',function()
{
  var latlng = new google.maps.LatLng(35.7078869,139.762546595);
  var opts = {
    zoom: 12,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  var map = new google.maps.Map(document.getElementById("map_canvas"), opts);
 

  var filelist = new Array(8423);
  var colorcode = ["00","33","66","99","cc","ff"];

  var rectlist = new Array();
  var patlinelist = new Array();
  var triplinelist = new Array();
  var tripdatalist = new Array();
  var patIDlist = new Array();

  $.ajaxSetup({async: false});
  $.get("./tripdatalist.txt",function(data){
      var temp = data.split("\n");
      tripdatalist = copyArray(temp);
  },false);
  $.ajaxSetup({async:true});

  var rowID = new Array();
  $.ajaxSetup({async: false});
  $.getJSON("rowID.json",function(data){
      $.each(data,function(key,val){
          rowID[key]=val;
      });
  });
  $.ajaxSetup({async:true});

  
  document.getElementById("setPattern").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
    var num = Math.floor(Math.random()*8423);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat/pat"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }

  },false);
document.getElementById("setPatternL6").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
    var num = Math.floor(Math.random()*3);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat2/length6/"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }

  },false);

  document.getElementById("setPatternL5").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
    var num = Math.floor(Math.random()*51);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat2/length5/"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }

  },false);

 document.getElementById("setPatternP4").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
    var num = Math.floor(Math.random()*26);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat2/pattern4/"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }

  },false);

var num=0;

 
document.getElementById("setPatternP3A").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
    //var num = Math.floor(Math.random()*60);
    patIDlist.push(num); 
	$('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat2/pattern3-15/"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }
	num++;
  },false);
 
document.getElementById("setPatternP3Aselect").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
	var num = document.getElementById("P3Aid").value;
    //var num = Math.floor(Math.random()*60);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat2/pattern3-15/"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }
  },false);

 
document.getElementById("trajectory_data_result").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
	var num = document.getElementById("trajectory_data").value;
    //var num = Math.floor(Math.random()*60);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat/pat"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }


  },false);

 document.getElementById("setPatternP3B").addEventListener("click",function(){
  // JSONファイル読み込み開始
  for (i=0; i<1; i++){
    var num = Math.floor(Math.random()*1232);
    patIDlist.push(num);
    $('select#selectPattern').append($(document.createElement("option")).addClass("plist").text("ID:"+num));
    $.getJSON("./pat2/pattern3-5/"+num+".json",function(data){

    var rgb = [Math.floor(Math.random()*6),Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
    var writeColor = "#"+colorcode[rgb[0]]+colorcode[rgb[1]]+colorcode[rgb[2]];
    var path = [];

    $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,writeColor);
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
     });
    
    var patternPath =  drowPatternPath(path,map,writeColor);
    patlinelist.push(patternPath);
  });
  }

  },false);



  document.getElementById("setTripdata").addEventListener("click",function(){
    for (i=0; i<5; i++){
        var num = Math.floor(Math.random()*4427);
        $('select#selectTrip').append($(document.createElement("option")).addClass("tlist").text("tripID:"+tripdatalist[num]));
        $.getJSON("./trip/"+tripdatalist[num],function(data){
            var getPath = createPath(data);
            getPath.setMap(map);
            triplinelist.push(getPath);
        });
    }
  } ,false);

  document.getElementById("clearPatterns").addEventListener("click",function(){
      var n = rectlist.length;
      for(i=0; i<n; i++){
          rectlist.pop().setMap(null);
      }
      n = patlinelist.length; 
      for(i=0; i<n; i++){
          patlinelist.pop().setMap(null);
      }
      patIDlist.length = 0;
      $('option.plist').remove();
  },false);

  document.getElementById("clearTripdata").addEventListener("click",function(){
      var n = triplinelist.length;
      for(i=0; i<n; i++){
          triplinelist.pop().setMap(null);
      }
     $('option.tlist').remove();
  },false);

  document.getElementById("tripToPattern").addEventListener("click",function(){
      for(i=0; i<patIDlist.length; i++){
          rid = copyArray(rowID[patIDlist[i]]);
          for (j=0; j<rid.length; j++){
              $.get("./sup/sup"+rid[j]+".txt",function(data){
                  var tlist = data.split("\n");
                  for (n=0; n<tlist.length; n++){
                      ptr = tripdatalist.indexOf(tlist[n]+".json");
                      if (ptr>=0){
                          $.getJSON("./trip/"+tripdatalist[ptr],function(data){
                          var getPath = createPath(data);
                          getPath.setMap(map);
                          triplinelist.push(getPath);
                          });
                          $('select#selectTrip').append($(document.createElement("option")).addClass("tlist").text("tripID:"+tripdatalist[ptr]));

                      }
                  }
              });
          }
      }
  },false);

  document.getElementById("show1").addEventListener("click",function(){
      patIDlist.push(9000);
      $.getJSON("pat/pat6685.json",function(data){
      var path = [];
      $.each(data.pattern,function(key,val){
        var block = createRegion(val.region,val.lv,"#FF0000");
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
      });
      var patternPath = drowPatternPath(path,map,"FF0000");
      patlinelist.push(patternPath);
      });
  },false);


  document.getElementById("show2").addEventListener("click",function(){
        var filename = "649843_8.json";
        $('select#selectTrip').append($(document.createElement("option")).addClass("tlist").text("tripID:"+filename));
        $.getJSON("./trip/"+filename,function(data){
            var getPath = createPath(data);
            getPath.setMap(map);
            triplinelist.push(getPath);
        });
  } ,false);


  document.getElementById("show3").addEventListener("click",function(){
      patIDlist.push(9000);
      $.get("gridtrip.txt",function(data){
          tmp = data.split(",");
          grid = tmp.slice(2);
          console.log(grid);
      var path = [];
      for(i=0; i<grid.length; i++){
        var block = createRegion(grid[i],10,"#FF0000");
        path.push(block.getBounds().getCenter());
        block.setMap(map);
        rectlist.push(block);
      }
      var patternPath = drowPatternPath(path,map,"FF0000");
      patlinelist.push(patternPath);
      });
  },false);
},false);

