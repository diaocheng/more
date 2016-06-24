# more
这是一个基于jQuery的加载更多插件！
## 使用示例
    $(window).more({
    	disabled:false,
    	callback:function(more){
    		$.ajax({
    			url:"json.php",
    			type:"GET",
    			dataType:"json",
    			success:function(data){
    				if (data.rows.length>0) {
    					for (var i = 0; i < data.rows.length; i++) {
    						$("#more").before("<h1>"+data.rows[i].id+". "+data.rows[i].name+"</h1>");
    						more.animate.stop({disabled:false,text:"加载更多"});
    					}
    				}
    				else{
    					more.animate.stop({disabled:true,text:"没有更多了"});
    				}
    			},
    			error:function(e){
    				console.log(e);
    			}
    
    		});
    	}
    })
