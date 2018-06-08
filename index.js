
var express = require('express');
var app = express();
var ws = require('nodejs-websocket');
var moment = require('moment');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

var server = app.listen(2425, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("The access address is:http:/%s:%s", host, port);
});


var scserver = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str);

        var strRes;
        switch (str) {
            case "Tom":
                strRes = "I'm here";
                break;
            case "time":
                strRes = moment().format('YYYY-MM-DD HH:mm:ss');
                break;
            case "joke":
                var jokes = [
                    "我网名叫“帅到掉渣”，认识了一个女网友，叫“美得冒泡”，觉得很般配，就约了见面。<br/>一见面，她怒了：“就你这样敢叫自己帅到掉渣？”<br/> 我一挠头皮，头屑飞扬，道：“看到没有，这些就是我的帅渣！不过，话说你这二百斤的体重，也敢叫自己美得冒泡？”<br/>她笑了：因为体重大，一走路脚上就磨得冒泡，没撒谎啊",
                    "我向女神表白：丽丽，嫁给我吧！<br/>女神：嫁给你？除非我脑袋被驴踢了！<br/> 我拉起丽丽就跑：快，我带你去我老家！<br/>女神：去你老家干啥？<br/>我：我老家有驴！",
                    "“大师，我一直以来，本本分分做人，勤勤恳恳做事，为人正直，待人坦荡，你说我为啥子找不到女朋友呢？之前有过几个也都分手了。”<br/> 大师听罢，拿出一根正要吃的油条，摇晃了一下。<br/>“大师，您是说，要我做人像根老油条一样，圆滑一些？”<br/> 大师怒曰：“我特么是问你——是不是像油条这么软？”",
                    "哥们儿问我借十万块钱。<br/>我：干啥用？<br/>哥们儿：违章了，交罚款！<br/> 我：净瞎扯，哪有这么厉害的违章罚款？<br/>哥们儿：有啊，昨晚驾驶的不是我老婆，被人丈夫逮了个现形！",
                    "昨天开车拉着媳妇，路边有个老头摆手，我刚要刹车，媳妇说道：“你要干嘛？”<br/>我：“那是我高中老师，让他搭个车吧？”<br/>媳妇：“不行，太危险了”<br/>我：“他一个老师又不是恐怖分子，危险什么？”媳妇：“我怕他一说话，你睡着了”"
                ];
                var index = Math.floor(Math.random() * 4);
                strRes = jokes[index];
                break;
            default:
                strRes = "Sorry, I can't understand what your saying."
                break;
        }

        conn.sendText(strRes)
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
    console.log("Websocket server created!");
}).listen(2426);