//保存的模板列表<key,value>
var _templateList = new Array();
//当前使用的模板
var _selectedTemplateName = "";

layui.use(function(){
    var layer = layui.layer
    ,dropdown = layui.dropdown
    ,form = layui.form
    ,laypage = layui.laypage
    ,element = layui.element
    ,laydate = layui.laydate
    ,util = layui.util;
   
    //输入框绑定数据
    var list = lay('.comment');
    list.forEach(element => {
      var commentType = eval(element.attributes.id.value);
      dropdown.render({
        elem: element
        ,data: convertData(commentType)
        ,click: function(obj){
          this.elem.val(obj.title);
        }
      });
    });
  
    //获取保存的评语模板
    var templateList = GetTemplateList();
    templateList = templateList.filter(Boolean)
    if(templateList && _selectedTemplateName){
        $('#tempName').val(_selectedTemplateName);
        console.log(templateList);
        var comment = templateList.find(elem => elem.title == _selectedTemplateName);
        fillTemplate(comment.value);
    }

    var tempName = lay('#tempName')[0];
    dropdown.render({
        elem: tempName
        ,data: templateList
        ,click: function(obj){
            this.elem.val(obj.title);
            fillTemplate(obj.value);
        }
    });

    //保存模板
    $('#saveTemplate').on('click',function(){
        // var data = {pronunciation: "", vocabulary: "", grammar: "", suggestion: ""};
        var commentData = {};
        var tempName = lay('#tempName').val();
        var isError = false;
        if(tempName){
            var list = lay('.comment');
            list.forEach(element => {
                var comment = element.value;
                if(comment){
                    //保存评语
                    // var item = {key: element.attributes.id.value, value:element.value};
                    commentData[element.attributes.id.value] = element.value;
                }else{
                    layer.msg(`⚠️${element.attributes.id.value} 的值不能为空!`);
                    isError = true;
                }
            });

            if(isError){
                // layer.msg(`⚠️评语不能为空。`);
            }else{
                window.localStorage.setItem(tempName, JSON.stringify(commentData));
                _selectedTemplateName = tempName;
                window.localStorage.setItem('selectedTemplateName', _selectedTemplateName);
                layer.msg(`模板保存成功`);
            }
        }else{
            layer.msg("⚠️模板名不能为空!");
        }
    });
  });
  
//获取评语模板列表
function GetTemplateList(){
    var templateList = new Array();
    var len = localStorage.length;
    for(var i = 0; i < len; i++){
         var getKey = localStorage.key(i);
         var getVal = localStorage.getItem(getKey);

         //当前使用的模板名称
         if(getKey == "selectedTemplateName"){
             _selectedTemplateName = getVal;
         }else{
            templateList[i] = {
                'title': getKey,
                'value': getVal,
            }
         }
    }
    return templateList;
}

//填充评语
function fillTemplate(data){
    var obj = JSON.parse(data);
    var list = lay('.comment');
    list.forEach(element => {
      var commentType = element.attributes.id.value;
      element.value = obj[commentType];
    });
}

//评语数据转换
function convertData(sourseData){
    var data = [];
    sourseData.forEach(element => {
        if(element.value != 0){
        var ele = {title: "", id: "", child: []};
        ele.title = element.label;
        ele.id = element.value;
        if(element.children){
            ele.child = convertData(element.children);
        }
        data.push(ele);
        }
    });
    return data;
}

//以下为官方评语数据
var pronunciation = [{
                        value: "0",
                        label: "Please select",
                        children: [{
                            value: "0",
                            label: "Please select"
                        }]
                    }, {
                        value: "1",
                        label: "Mispronounced some words",
                        children: [{
                            value: "0",
                            label: "Please select"
                        }, {
                            value: "11",
                            label: "Dear，you mispronounced these words during our class, please practise them."
                        }]
                    }, {
                        value: "2",
                        label: "No mispronounced words",
                        children: [{
                            value: "0",
                            label: "Please select"
                        }, {
                            value: "21",
                            label: "Well done, no mispronounced words."
                        }, {
                            value: "22",
                            label: "Excellent! You read clearly and precisely."
                        }, {
                            value: "23",
                            label: "Good. No real problems with pronunciation today."
                        }, {
                            value: "24",
                            label: "You have very good English pronunciation skills."
                        }, {
                            value: "25",
                            label: "Great! You were able to read properly."
                        }, {
                            value: "26",
                            label: "Amazing reading skills! Always impresses me so much!"
                        }, {
                            value: "27",
                            label: "You were able to follow the proper pronunciation of words."
                        }, {
                            value: "28",
                            label: "Good job my dear! You didn't have any mispronounced words today!"
                        }, {
                            value: "29",
                            label: "Your pronunciation was fantastic so no errors needed to be corrected."
                        }, {
                            value: "210",
                            label: "Your pronunciation was very good. A few minor corrections were made during the class."
                        }]
                    }];

var vocabulary = [{
                        value: "0",
                        label: "Please select",
                        children: [{
                            value: "0",
                            label: "Please select"
                        }]
                    }, {
                        value: "1",
                        label: "Misunderstand some words",
                        children: [{
                            value: "0",
                            label: "Please select"
                        }, {
                            value: "11",
                            label: "These are the words that you need to practise after class."
                        }]
                    }, {
                        value: "2",
                        label: "Understand all words",
                        children: [{
                            value: "0",
                            label: "Please select"
                        }, {
                            value: "21",
                            label: "You easily understand the meaning of the words in our discussion. These are the words that you learned today."
                        }, {
                            value: "22",
                            label: "Here are some of the new words that we discussed."
                        }]
                    }];

var grammar = [{
                    value: "0",
                    label: "Please select",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }]
                }, {
                    value: "1",
                    label: "Student made mistake",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }]
                }, {
                    value: "2",
                    label: "Has main grammatical points",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }]
                }, {
                    value: "3",
                    label: "No mistake,no grammatical points",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }, {
                        value: "31",
                        label: "Read and practice the sentences:"
                    }]
                }];

var suggestion = [{
                    value: "0",
                    label: "Please select",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }]
                }, {
                    value: "1",
                    label: "Suggestions",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }, {
                        value: "11",
                        label: "Nice! You are such a smart kid! Keep speaking and keep practicing that skill. Keep learning new words and expressions! You will keep developing!"
                    }, {
                        value: "12",
                        label: "Keep reading and listening, dear. You are doing a great job and can only improve with practice. It's always a pleasure talking with you. Best wishes."
                    }, {
                        value: "13",
                        label: "To help you further improve, I recommend that you continue studying and learning new words. Just take it easy and enjoy studying! Nice to meet you! See you again next time! "
                    }, {
                        value: "14",
                        label: "Hello! You have participated well in our discussion today. You need to speak more to be able to get used to the English language. Practice makes perfect! Have a good day ahead!"
                    }, {
                        value: "15",
                        label: "Great work again today, keep practicing using your English to ask good questions and to keep exploring the wold. You will have a great time travelling to many more new places when you can! "
                    }, {
                        value: "16",
                        label: "You just have to practice your skills as much as you can, remember that practice makes perfect so keep in mind those useful suggestions. Always expose yourself to English language. Enjoy your day."
                    }, {
                        value: "17",
                        label: "Daily reading practice will enhance vocabulary and language development. Opportunity for additional language support is a big help during flex-time. Watching English films and listening to English conversation or songs is a good way to practice it.  keep going on!"
                    }, {
                        value: "18",
                        label: "Try to learn more words. Enrich your vocabulary skills so that your comprehension will be developed. You may also need to write down the words you learned in your English classes. Keep a notebook for this purpose so that you can review the whatever you've learned in class."
                    }, {
                        value: "19",
                        label: "I would like to recommend you to learn more new words in your vocabulary bank to help you out in your conversation as well as your listening and comprehension skills. You could also watch more American movies or TV programs. You can listen to English songs and also try to practice talking in English during your free time. You can also read some English magazines or article that interest you most."
                    }, {
                        value: "110",
                        label: "Talk to yourself in English whenever you're at home, you can practice your English with your favorite person: yourself. The following tips would help you to talk to yourself in English. Read out loud from your favorite books. Speak out loud with your own thoughts in English on certain topics (e.g. sports, family). Use a mirror to practice as you can see yourself. Use a recording device (e.g. your phone) to record what you read/speak (you will be able to hear yourself speaking English and then finding out the problems of your tone, pronunciation and even accent). The most significant benefit of this method is that you will be more comfortable in speaking English and be aware of your own strengths as well as weaknesses in speaking. Then you can find the right tips to improve the specific weak points in your spoken English."
                    }]
                }, {
                    value: "2",
                    label: "Affirmative learning attitude",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }, {
                        value: "21",
                        label: "Very good attitude in learning!"
                    }, {
                        value: "22",
                        label: "I just wanna say thank you so much for the participation. You are such a great kid and I love you in my class."
                    }, {
                        value: "23",
                        label: "Dear, your enthusiasm and interest in class are noticeable. You could participate in class with patience and you showed willingness to learn. Well done!"
                    }, {
                        value: "24",
                        label: "Hello! In our class today, you were very interested in our lesson. You showed your best to answer teacher's questions very well. Continue doing that, dear!"
                    }, {
                        value: "25",
                        label: "Dear, I appreciated your efforts in answering the questions today. You tried your best and that's good. I can see that you are really eager to learn. Keep that up! "
                    }, {
                        value: "26",
                        label: "Hello my dear, You did very well in class today. You participated well. You were so full of energy and I liked it! Keep that energy up and continue doing well in class. Good job!"
                    }, {
                        value: "27",
                        label: "Hi there! I really enjoyed our class today. You are full of energy and enthusiasm in class . You focus and tried your best to compose sentences of your own. Thank you for your effort."
                    }, {
                        value: "28",
                        label: "Pretty Good! You always try your best to answer in complete sentences. You also try your best to express your ideas. I belive you will be better and better with your good attitude in learning. Fighting!"
                    }, {
                        value: "29",
                        label: "You've shown great interest in learning English. I admire your determination and eagerness. With that right kind of attitude, you'll go the extra mile so keep up the good work! I'm looking forward to having our next class!"
                    }, {
                        value: "210",
                        label: "You are a cheerful student. You have good vocabulary skills and you're able to use it on your sentences. You have good comprehension. I believe with your positive attitude, you will continuously improve as an English speaker. Keep moving forward!"
                    }]
                }, {
                    value: "3",
                    label: "Good performance in class",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }, {
                        value: "31",
                        label: "It was nice to practice with you today dear. You did a good job and made your best effort today!"
                    }, {
                        value: "32",
                        label: "You shared some great ideas and we had a nice discussion about the words and topic for today. Fantastic job. Keep it up!"
                    }, {
                        value: "33",
                        label: "Very well! You spoke a lot and tried your best to express yourself! Keep doing that in your classes! It is the best way to learn!"
                    }, {
                        value: "34",
                        label: "I believe in you, honey. You can read very well. I hope you continue your journey in English. Thank you for the times we spent together. Hope to see you again! "
                    }, {
                        value: "35",
                        label: "You were able to answer most of my questions and were confident enough in giving answers. You did good today so keep it up and just continue working hard!"
                    }, {
                        value: "36",
                        label: "Hello! You are very fluent in English. I really enjoy having class with you because you are clever and opinionated. You are not afraid to express your thoughts during class."
                    }, {
                        value: "37",
                        label: "You have participated well in our discussion today. You need to speak more to be able to get used to the English language. Practice makes perfect! Have a good day ahead!"
                    }, {
                        value: "38",
                        label: "Hi! You did great today! I am truly delighted with your cooperation. I appreciate the fact that you always listen and remember the things we learned. I hope that I could be of great help to your learning. See you!"
                    }, {
                        value: "39",
                        label: "You are a great student. You consistently follows teacher's instructions. You can read well. You can answer the questions correctly. You are having fun while learning. Had a great time teaching you! I like you very much! "
                    }, {
                        value: "310",
                        label: "Hi! I really had a good time teaching you today! You can easily catch up with our discussion and you can easily comprehend as well. You're smart and that's for sure, you have a brilliant mind so just keep up the good work. Continue learning. Thanks for the great time. I hope to see you again soon!"
                    }]
                }, {
                    value: "4",
                    label: "Get improvement",
                    children: [{
                        value: "0",
                        label: "Please select"
                    }, {
                        value: "41",
                        label: "Excellent as always!"
                    }, {
                        value: "42",
                        label: "Wow! You have really improved a lot! Keep it up!"
                    }, {
                        value: "43",
                        label: "Thank you for another wonderful class today my dear. See you again! "
                    }, {
                        value: "44",
                        label: "The student is making an excellent progress in communicating orally and in English."
                    }, {
                        value: "45",
                        label: "You can speak well and is more relaxed in class now than before . See you next time."
                    }, {
                        value: "46",
                        label: "You're getting better my dear, please continue studying and learning English to improve more your skills in speaking. See you again."
                    }, {
                        value: "47",
                        label: "Thank you for always doing well in class my dear. Please read and learn more English words everyday and use them in a sentence. See you next time, my dear!"
                    }, {
                        value: "48",
                        label: "You did great in participating in class. You were active and answered a lot of questions. Great job, keep it up. I hope you continue to learn and practice your English skills."
                    }, {
                        value: "49",
                        label: "I enjoy every class with you because I can see your determination to learn. You keep trying and you've tremendously shown so much improvement. Keep up the good works!!!"
                    }, {
                        value: "410",
                        label: "Dear, you have worked so hard and put in so much effort! I Believe you are a very strong student. You love reading, remember reading is the best way to learn a language! You have grown so much and I am very proud you and your effort. Thank you for choosing me as your English teacher. All the best with your English studies and your future!"
                    }]
                }];
  