window.google_analytics_uacct = 'UA-9701184-12';

(function(w,d){
w._gaq=[["_setAccount", 'UA-9701184-12'],["_trackPageview"]];
w.___gcfg={lang:"ja"};
var s,e = d.getElementsByTagName("script")[0],
a=function(u,f){if(!d.getElementById(f)){
s=d.createElement("script");s.async = true;
s.src=u;if(f){s.id=f;} e.parentNode.insertBefore(s,e);}};
a(("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js","ga");
a("https://apis.google.com/js/plusone.js");
a("//b.st-hatena.com/js/bookmark_button_wo_al.js");
a("//platform.twitter.com/widgets.js","twitter-wjs");
a("//connect.facebook.net/ja_JP/all.js#xfbml=1","facebook-jssdk");
//a("//minmin.m36.coreserver.jp/ap/track.php");
})(this, document);

$(function(){
var d=document;
i=d.createElement("img");i.width=1;i.height=1;i.id="ra";i.style.position="absolute";i.style.left="0";i.style.top="0";
i.src="http://minmin.m36.coreserver.jp/ap/track.php";
d.body.appendChild(i);
})
