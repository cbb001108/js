var Game=(function(){

    var ROW=config.row+2;
    var COL=config.col+2;
    var itemCount=config.row*config.col;

    var data={
        time:config.time,
        cell:[],
    };

    var timeCooldown=60;

    var helpData=[];

    var Game=function(){
        
    };

    Game.prototype={
        setuo:function(){
            this.view=new View();
            this.init();
        },

        init:function(){
            this.start();
            this.view.init(this,data);
        },

        start:function(){
            this.initCell();
            this.fillCell();
            this.checkDeadlock();
            this.update();
        },

        restart:function(){
            location.reload();
        },

        help:function(){
            this.judge.apply(this,helpData);
        },

        update:function(){

            this.updateTime();

            window.requestAnimationFrame(this.update.bind(this));
        },

        updateTime:function(){
            timeCooldown--;
            if(!timeCooldown){
                timeCooldown=60;
                data.time--;
                this.view.updateTime(data.time);
            }
            if(data.time===0){
                this.over();
            }
        },
        initCell:function(){
            var index=-1;
            for(var i=o;i<ROW;i++){
                data.cell[i]=[];
                for(var j=0;j<COL;j++){
                    index++;
                    data.cell[i][j]={
                        var:null,
                        index:index,
                    }
                }
            }
        },
        fillCell:function(){
            var row=config.row;
            var col=config.col;
            var count=config.objectCount;
            var repeat=config.repeatCount;
            for(var i=0;i<repeat;i++){
                for(var j=0;j<repeat;j++){
                    while(true){
                        var x=random(1,col);
                        var y=random(1,row);
                        var item=data.cell[y][x];
                        if(item.val===null){
                            data.cell[y][x].val=i;
                            break;
                        }
                    }
                }
            }
        },
        indexToPos:function(index){
            return{
                x:index % COL,
                y:Math.floor(index / COL),
            }
        },
        posToIndex:function(obj){
            return(
                obj.y *COL + obj.x
            );
        },
        removeItem:function(before,after){
            this.getItem(before).val=null;
            this.getItem(after).val=null;
            this.view.removeItem(before);
            this.view.removeItem(after);
            itemCount-=2;
            this.checkWinning();
        },
        isEmpty:function(obj){
            return obj.val===null;
        },
        isSame:function(before,after){
            return this.getItem(before).val===this.getItem(after).val;
        },
        identicalX:function(before,after){
          return this.indexToPos(before).x===this.indexToPos(after).x;  
        },
        identicalY:function(before,after){
            return this.indexToPos(before).y===this.indexToPos(after).y;
        },
        getAround:function(index){
            return[
                -COL,
                COL,
                -1,
                1
            ]
        },
        getCorner:function(before,after){
            var min=Math.min.call(null,before,after);
            var max=Math.max.call(null,before,after);
            min=rhis.indexToPos(min);
            max=this.indexToPos(max);
            return[
                this.posToIndex({
                    x:max.x,
                    y:min.y,
                }),
            ];
        },
        connectable:function(before,after){
            var _this=this;
            var pos=[];
            var success=false;
            var min = Math.min.call(null,before,after);
            var max = Math.max.call(null,before,after);
            var called=function(dir){
                var i=min;
                var num=dir==='x' ? COL : 1;
                for(;i+=num;i<=max){
                    var current =_this.getItem(i);
                    if(current=_this.getItem(max)){
                        success=true;
                        break;
                    }else if(_this.isEmpty(current)){
                        pos.push(current.index)
                    }else{
                        break;
                    }
                }
            }
            if(this.identicalY(before,after)){
                called('y');
            }else if(this.identicalX(before,after)){
                called('x');
            }
            if(success){
                if(min!==before){
                    pos=pos.reverse();
                }
            }
            return{
                success:success,
                pos:pos,
            }
        },
        directlyConnectable:function(before,after){
            var status=this.connectable(before,after);
            return status;
        },
        onceCorner:function(before,after){
            var _this=this;
            var success=false;
            var pos=[];
            var corners=this.getCorner(before,after);
            
        }
    }
})