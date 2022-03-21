//课程列表，英文逗号分开
var _classIdList = "";

//发送信息
function sendMessageToRenderer(message, callback){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) { callback(response) });
    });
}

//页面加载完成时，获取课程列表
window.onload = function(){
    sendMessageToRenderer("GetList", showClasses);
    // var mockData = `{
    //     "resultCode": 0,
    //     "resultMessage": "操作成功",
    //     "resultData": {
    //         "bookedList": [{
    //             "datebookId": 22769094,
    //             "experienceClass": 0,
    //             "timeScheduleId": null,
    //             "isOrgClass": 0,
    //             "status": 0,
    //             "classStatus": "Normal",
    //             "dbClassStatus": 0,
    //             "commentTime": null,
    //             "endTime": null,
    //             "feedback": -1,
    //             "lessonId": 17656,
    //             "lesson": "45 : Sound of eaey",
    //             "assessClassStatus": 0,
    //             "dateTime": "2022-03-19 15:30-15:55",
    //             "assessClass": 0,
    //             "stuId": 1073439,
    //             "tool": "说客英语",
    //             "toolNum": null,
    //             "liveToolType": 6,
    //             "beginTime": "2022-03-19 15:29:28",
    //             "isFirstCourse": 0,
    //             "flower": 0,
    //             "stuResourceUrl": null,
    //             "stuResourceName": null,
    //             "showStuComment": null,
    //             "assessType": 0,
    //             "qq": "563568552",
    //             "skype": null,
    //             "phone": "18906342909",
    //             "userName": "student",
    //             "leval": null,
    //             "age": 10,
    //             "sex": 0,
    //             "lessonPlan": "Super phonics  Sound of eaey",
    //             "localTime": "2022-03-19 15:30-15:55",
    //             "classFileList": [{
    //                 "lrId": 20516,
    //                 "fileName": "SuperPhonics-U01-L45.pdf",
    //                 "fileType": "pdf",
    //                 "fileUrl": null
    //             }],
    //             "uploadFile": null,
    //             "isOpenBegin": 0,
    //             "enterTime": "2022-03-19 15:20-16:10",
    //             "isEnterClass": 1,
    //             "publicClassId": null,
    //             "cancelAvailable": 0,
    //             "editAble": null,
    //             "showForStudent": 0,
    //             "updateTime": "2022-03-19 15:29:28",
    //             "showBindFile": 1
    //         }, {
    //             "datebookId": 22879161,
    //             "experienceClass": 0,
    //             "timeScheduleId": null,
    //             "isOrgClass": 0,
    //             "status": 0,
    //             "classStatus": "Normal",
    //             "dbClassStatus": 0,
    //             "commentTime": null,
    //             "endTime": null,
    //             "feedback": -1,
    //             "lessonId": 18322,
    //             "lesson": "38 : UNIT10 Lesson2 Preserving Our Earth Reading",
    //             "assessClassStatus": 0,
    //             "dateTime": "2022-03-19 16:00-16:25",
    //             "assessClass": 0,
    //             "stuId": 1151991,
    //             "tool": "说客英语",
    //             "toolNum": null,
    //             "liveToolType": 6,
    //             "beginTime": "2022-03-19 15:59:44",
    //             "isFirstCourse": 0,
    //             "flower": 0,
    //             "stuResourceUrl": null,
    //             "stuResourceName": null,
    //             "showStuComment": null,
    //             "assessType": 0,
    //             "qq": "276582056",
    //             "skype": null,
    //             "phone": "13862111945",
    //             "userName": "Jesse",
    //             "leval": null,
    //             "age": 9,
    //             "sex": 1,
    //             "lessonPlan": "G2 Pre-advanced（新版）  UNIT10 Lesson2 Preserving Our Earth Reading",
    //             "localTime": "2022-03-19 16:00-16:25",
    //             "classFileList": [{
    //                 "lrId": 21360,
    //                 "fileName": "Pre-advance-2020-U10-L02-V2.pdf",
    //                 "fileType": "pdf",
    //                 "fileUrl": null
    //             }],
    //             "uploadFile": null,
    //             "isOpenBegin": 0,
    //             "enterTime": "2022-03-19 15:50-16:40",
    //             "isEnterClass": 1,
    //             "publicClassId": null,
    //             "cancelAvailable": 0,
    //             "editAble": null,
    //             "showForStudent": 0,
    //             "updateTime": "2022-03-19 15:59:44",
    //             "showBindFile": 1
    //         }, {
    //             "datebookId": 22812646,
    //             "experienceClass": 0,
    //             "timeScheduleId": null,
    //             "isOrgClass": 0,
    //             "status": 0,
    //             "classStatus": "Normal",
    //             "dbClassStatus": 0,
    //             "commentTime": null,
    //             "endTime": null,
    //             "feedback": -1,
    //             "lessonId": 9139,
    //             "lesson": "26 : lesson 26 Where is it? 它在哪里？",
    //             "assessClassStatus": 0,
    //             "dateTime": "2022-03-19 16:30-16:55",
    //             "assessClass": 0,
    //             "stuId": 367238,
    //             "tool": "说客英语",
    //             "toolNum": null,
    //             "liveToolType": 6,
    //             "beginTime": "2022-03-19 16:30:05",
    //             "isFirstCourse": 0,
    //             "flower": 0,
    //             "stuResourceUrl": null,
    //             "stuResourceName": null,
    //             "showStuComment": null,
    //             "assessType": 0,
    //             "qq": "125237597",
    //             "skype": "",
    //             "phone": "18717883786",
    //             "userName": "Edward",
    //             "leval": "2",
    //             "age": 7,
    //             "sex": 1,
    //             "lessonPlan": "新概念英语1  lesson 26 Where is it? 它在哪里？",
    //             "localTime": "2022-03-19 16:30-16:55",
    //             "classFileList": [{
    //                 "lrId": 6971,
    //                 "fileName": "TEA_NEC1-Lesson26.pdf",
    //                 "fileType": "pdf",
    //                 "fileUrl": null
    //             }],
    //             "uploadFile": null,
    //             "isOpenBegin": 0,
    //             "enterTime": "2022-03-19 16:20-17:10",
    //             "isEnterClass": 1,
    //             "publicClassId": null,
    //             "cancelAvailable": 0,
    //             "editAble": null,
    //             "showForStudent": 0,
    //             "updateTime": "2022-03-19 16:30:05",
    //             "showBindFile": 1
    //         }],
    //         "beginDate": "2022-03-19",
    //         "endDate": "2022-03-20",
    //         "teacherArea": 3
    //     },
    //     "totalCount": 10,
    //     "showPermission": false
    // }`;
    //showClasses(mockData);
}

//提交评语按钮点击事件
$('#doComment').on('click', function(){
    var tempName = window.localStorage.getItem("selectedTemplateName");
    var comment = window.localStorage.getItem(tempName);
    var data = {id: _classIdList, data: comment};
    var sendMsg = "DoComment|" + JSON.stringify(data);
    sendMessageToRenderer(sendMsg, showResult);
});

//打评语结果
function showResult(msg){
    alert(msg);
    sendMessageToRenderer("GetList", showClasses);
}

//显示列表
function showClasses(data){
    _classIdList = "";
    let html = "";
    var count = 0;
    try{
        var dataObj = JSON.parse(data);
        if(dataObj.resultCode != 0){
            html = "获取课程列表失败:" + dataObj.resultMessage;
        }else if(dataObj.resultData.bookedList.length == 0){
            html = "无待提交评语课程。";
        }else{
            layui.use('table', function(){
                var table = layui.table;
                
                table.render({
                  elem: '#classTable'
                  ,cellMinWidth: 30
                  ,limits: [5,8,10,20,50]
                  ,limit: 8
                  ,cols: [[
                    {field:'datebookId', title: 'Class ID', width:100, sort: true}
                    ,{field:'dateTime', title: 'Time', width:200, sort: true}
                    ,{field:'lessonPlan', title: 'Lesson', width:330}
                    ,{field:'userName', title: 'Student', width:110}
                  ]]
                  ,data: dataObj.resultData.bookedList
                  ,page: true
                  ,height: 395
                });
              });

              dataObj.resultData.bookedList.forEach(element => {
                _classIdList += element.datebookId + ",";
                count ++;
              });
              
        }
    } catch(ex){
        html = "获取课程列表异常:" + ex.message;
        console.log("showClasses", html);
    }

    document.querySelector('.msg').innerHTML = html;
    
    if(count == 0){
        $('#doComment').addClass("layui-btn-disabled").attr("disabled", true);
    }
    document.querySelector('#count').innerHTML ="共" + count.toString() + "节课";
}