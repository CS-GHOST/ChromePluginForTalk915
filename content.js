chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var result;

    var params = message.split('|');
    var funcName = params[0];
    var argument = "";
    if(params.length > 1){
        argument = params[1];
    }

    switch(funcName){
        case "GetList":
            {
                result = getList();
                break;
            }
        case "DoComment":
            {
                result = doComment(argument);
                break;
            }
        default:
            {
                result = `不支持该方法名[${funcName}]`;
                break;
            }
    }
    sendResponse(result);
    return true;
});

//获取列表
function getList(){
    var url = "https://www.talk915.com/datebook/teacherClass/bookedClass";
    var data = `{
                    "currPage": 1,
                    "pageSize": 30,
                    "beginDate": "${getDay(0)}",
                    "endDate": "${getDay(1)}",
                    "userName": "",
                    "classType": -1,
                    "classStatus": 5,
                    "num": 1,
                    "code": null
                }`;
    return post(url, data);
}

//一次提交所有评语
function doComment(data){
    var errorId = "";
    if(!data){
        return "无评语提交成功。";
    }
    var obj = JSON.parse(data);
    var ids = obj.id;
    var comment = obj.data;
    
    var listId = ids.split(',');
    listId.forEach(element => {
        if(element){
            var ret = doWork(element, comment);
            if(!ret){
                errorId += element + ",";
            }
        }
    });
    if(errorId){
        return "下列课程提交评语失败:" + errorId;
    }
    else{
        return "提交评语成功。";
    }
}

//提交评语
function doWork(id, comment){
    var obj = JSON.parse(comment);
    var url = "https://www.talk915.com/datebook/teacherClass/commentsForStu"; 
    var data = `{
                    "id": "${id}",
                    "stuClassStatus": 0,
                    "giveFlower": "0",
                    "pronunciation": "${obj.pronunciation}",
                    "vocabulary": "${obj.vocabulary}",
                    "grammar": "${obj.grammar}",
                    "highLights": "${obj.suggestion}",
                    "remark": ""
                }`;

    var resp = post(url, data);
    var result = false;
    if(resp){
        var jObj = JSON.parse(resp);
        if(jObj.resultCode == 0){
            result = true;
        }else{
            console.log(`提交评语失败:(${id})-`, jObj.resultMessage);
        }
    }

    return result
}

//POST同步请求
function post(url, data){
    var token = getCookie("token");

    var resp = null;
    var xml = new XMLHttpRequest();
    xml.open("POST", url, false);
    xml.setRequestHeader("Content-type", "application/json"); 
    xml.setRequestHeader("token", token); 
    xml.send(data);
    
    if(xml.status == 200){
        resp = xml.response;
    }else{
        resp = "";
        console.log(`post失败: ${xml.status}  ${xml.statusText}`);
    }

    return resp;
}

//获取日期 yyyy-mm-dd
function getDay(addDays){
    var today = new Date();

    if(addDays != 0){
        var nowTime = today.getTime();
        var ms = 24 * 3600 * 1000 * addDays;
        today.setTime(parseInt(nowTime + ms));
    }
    
    var oYear = today.getFullYear();
    var oMonth = (today.getMonth() + 1).toString();
    if(oMonth.length <= 1){
        oMonth = "0" + oMonth;
    }
    var oDay = today.getDate().toString();
    if(oDay.length <= 1){
        oDay = "0" + oDay;
    }

    return oYear + "-" + oMonth + "-" + oDay;
}

//获取cookies
function getCookie(name) {
    var cookies = document.cookie;
    var list = cookies.split("; ");     // 解析出名/值对列表
         
    for(var i = 0; i < list.length; i++) {
        var arr = list[i].split("=");   // 解析出名和值
        if(arr[0] == name){
            return decodeURIComponent(arr[1]);   // 对cookie值解码
        }
    }
    
    return "";
}


