 $(function() {
     // 初始化右侧滚动条
     // 这个方法定义在scroll.js中
     resetui()

     //发送点击事件
     $('#btnSend').on('click', function() {
             //接受文本框内容
             var text = $('#ipt').val().trim()
                 //文本框不为空
             if (text.length <= 0) return $('#ipt').val('')
                 //文本框内容显示到中间消息框
             $('#talk_list').append(`<li class="right_word">
                    <img src="img/person02.png" /> <span>${text}</span>
                </li>`)
                 //清空输入文本框内容
             $('#ipt').val('')
                 //页面自动滚动到最新的消息
             resetui()
                 //发请求获取聊天消息
             getMsg(text)
         })
         //发请求获取聊天消息函数
     function getMsg(text) {
         $.ajax({
             method: 'GET',
             url: 'http://www.liulongbin.top:3006/api/robot',
             data: {
                 spoken: text
             },
             success: function(res) {
                 if (res.message === 'success') {
                     //接收聊天消息
                     var msg = res.data.info.text
                         //渲染到页面
                     $('#talk_list').append(`<li class="left_word">
                    <img src="img/person01.png" /> <span>${msg}</span>
                </li>`)
                         //页面自动滚动到最新的消息
                     resetui()
                         //调用文本转文字函数
                     getVoice(msg)
                 }
             }
         })
     }
     //文本转语音函数
     function getVoice(text) {
         $.ajax({
             method: 'GET',
             url: 'http://www.liulongbin.top:3006/api/synthesize',
             data: {
                 text: text
             },
             success: function(res) {
                 if (res.status === 200) {
                     //播放语音
                     $('#voice').attr('src', res.voiceUrl);
                 }
             }
         })
     }
     //回车事件 
     $('#ipt').on('keyup', function(e) {
         //e.keyCode可以获取当前按键的编码 回车是13
         if (e.keyCode === 13) {
             console.log(e)
                 //调用按钮元素的click函数
             $('#btnSend').click()
         }
     })
 })