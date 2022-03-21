// function showPage(obj){
//     var pageUrl = obj.attributes.id.value + ".html";
//     lay('#ifMain').attr('src', pageUrl)
// };
  
layui.use(['element', 'layer', 'util'], function(){
  var element = layui.element
  ,layer = layui.layer
  ,util = layui.util
  ,$ = layui.$;

  lay('.layui-nav-item').on('click',function(sender,e){
    var pageUrl = sender.path[1].id + ".html";
    lay('#ifMain').attr('src', pageUrl)
  });
  //头部事件
  util.event('lay-header-event', {
   
    menuRight: function(){
      layer.open({
        type: 1
        ,content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
        ,area: ['260px', '100%']
        ,offset: 'rt' //右上角
        ,anim: 5
        ,shadeClose: true
      });
    }
  });
  
});