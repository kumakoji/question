function setDate(obj)
{
    var data = "";
    data += "filename=" + obj.value + ".xml";
    sendRequest("POST", "./ajax_sample.php", data, false, callback);
}

// コールバック関数
function callback(xmlhttp)
{
    var result = document.getElementById("result");
    result.innerHTML = xmlhttp.responseText;
} 
