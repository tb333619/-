/**
 * Created by Administrator on 2016/10/22.
 */
function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,opitions){
    var timer = null;
    clearInterval(obj.timer);
    opitions = opitions||{};
    opitions.duration = opitions.duration||'1000';
    opitions.easing = opitions.easing||'linear';
    clearInterval(obj.timer);
    var strat = {};
    var dis = {};
    for(var name in json){
        strat[name] = parseInt(getStyle(obj,name));
        dis[name]=json[name]-strat[name];
    }
    var count = Math.floor(opitions.duration/30);
    var n=0;
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch(opitions.easing){
                case 'linear':
                    var a = n/count;
                    var cur = dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a = 1-n/count;
                    var cur = dis[name]*(1-a*a*a);
                    break;
            }
            if(name=='opacity'){
                obj.style[name]=strat[name]+cur;
                obj.style.filter='alpha(opacity:'+(strat[name]+cur)*100+')';
            } else{
                obj.style[name]=strat[name]+cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            opitions.complete&&opitions.complete();
        }
    },30);
}