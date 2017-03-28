## 分页思路
> jQuery 原型链的使用，jQuery.fn.pagination = function(opts){}  
1，模式调用  
```javascript
    jQuery.fn.pagination = function(opts){
        opts = jQuery.extend({},opts || {})
        // 参数合并，外部参数优先使用
        drawlink()
    }
```
2，绘制分页链接
```javascript
    function drawlink(){
        // 创建绘制每个链接的方法
        var appendItem = function(page_id,appendOpts){
            appendOpts = jQuery.extend({},appendOpts || {})
        }
        //  生成preiv
        appendItem(curr_page -1 ,appendOpts);
        // 生成页码 --根据边缘值和连续分页数[start,end]
        appendItem(i);
        // 生成next
         appendItem(curr_page +1,appendOpts);
        // 生成跳转
        panel.append();
    }
```
3，回调函数
```javascript
    opts.callback(curr_page)
````
4，外部调用
```javascript
    $('#pagination').pagination({})
    function callback(curr_page){

    }
```