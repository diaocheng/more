# more
这是一个基于jQuery的加载更多插件！
## 使用示例
    //$(selector),more({});selector可为window和其他的元素
    //为window时为滚动加载，其他元素时为点击加载
    $(".more").more({
        disabled:false,
        callback:function(more){
            $.ajax({
                url:"json.php",
                type:"GET",
                dataType:"json",
                success:function(data){
                    if (data.rows.length>0) {
                        for (var i = 0; i < data.rows.length; i++) {
                            $(".more").before("<h2>"+data.rows[i].id+". "+data.rows[i].name+"</h2>");
                            more.disabled(false);
                        }
                    }
                    else{
                        more.disabled(true);
                    }
                },
                error:function(e){
                    console.log(e);
                }

            });
        }
    })
