;jQuery.fn.pagination = function(totals,opts){
    opts = jQuery.extend({
        page_size: 1,
        curr_page: 0,
        num_display_entries: 4, // 连续主体页数
        num_edge_entries: 1, //边缘页数
        ellipse_text: '...',
        link_to: '#',
        prev_text: 'Prev',
        next_text: 'Next',
        prev_show_always: true,
        next_show_always: true,
        callback:function(){return false}
    },opts || {});
    
    var page_size = opts.page_size;
    var curr_page = opts.curr_page;
    var jumpId = 0;
    var panel = this;
    function getTotalPages(){
        return Math.ceil(totals / page_size);
    }
    function getInterval()  {
        var ne_half = Math.ceil(opts.num_display_entries/2);
        var total_pages = getTotalPages();
        var upper_limit = total_pages - opts.num_display_entries;
        var start = curr_page > ne_half ? Math.max(Math.min(curr_page - ne_half, upper_limit), 0):0;
        var end = curr_page > ne_half ? Math.min(curr_page + ne_half, total_pages): Math.min(opts.num_display_entries, total_pages);
        return [start,end];
    }
    function getClick(page_id){
        return function(evt){
            return getSelected(page_id, evt);
        }
    }
    function getSelected(page_id, evt){
        curr_page = page_id;
        drawlink();
        opts.callback(page_id,this);
    }
    function drawlink(){
        panel.empty();
        var total_pages = getTotalPages();
        var interval = getInterval();
        var appendItem = function(page_id,appendOpts){
            page_id = page_id < 0 ? 0 : (page_id < total_pages ? page_id : total_pages -1);
            appendOpts = jQuery.extend({text: page_id + 1 , classes:''},appendOpts || {});
            if(page_id == curr_page){
                var link = jQuery('<span class="current">'+appendOpts.text+'</span>');
            }else{
                var link = jQuery('<a>'+ appendOpts.text +'</a>')
                            .bind('click', getClick(page_id))
                            .attr('href', opts.link_to);
            }
            if(appendOpts.classes){
                link.addClass(appendOpts.classes);
            }
            panel.append(link);
        }
        //生成priv
        if ((opts.prev_text && curr_page > 0) || opts.prev_show_always ){
            appendItem(curr_page - 1, {text: opts.prev_text, classes: 'prev'})
        }
        // 产生起始点
        if (interval[0] > 0 && opts.num_edge_entries > 0)
        {
            var end = Math.min(opts.num_edge_entries, interval[0]);
            for(var i = 0; i < end; i++) {
                appendItem(i);
            }
            if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
            {
                jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
            }
        }
        // 产生内部的些链接
        for(var i=interval[0]; i<interval[1]; i++) {
            appendItem(i);
        }
        // 产生结束点
        if (interval[1] < total_pages && opts.num_edge_entries > 0)
        {
            if(total_pages - opts.num_edge_entries > interval[1]&& opts.ellipse_text)
            {
                jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
            }
            var begin = Math.max(total_pages - opts.num_edge_entries, interval[1]);
            for(var i= begin; i< total_pages; i++) {
                appendItem(i);
            }
        }
        // 生成next
        if ((opts.next_text && curr_page < total_pages -1 ) || opts.next_show_always ){
            appendItem(curr_page + 1, {text: opts.next_text, classes: 'next'})
        }
        // 生成跳转
        panel.append('<div style="display:inline-block;margin-left:10px;">跳转到<input id="jumpId" style="padding:2px 5px;width:20px;margin:0 10px;" value='+(jumpId ==0 ? '' : (jumpId + 1))+'></input>页</div>');
        jQuery('#jumpId').change(function(){
            curr_page = jQuery('#jumpId').val() - 1;
            jumpId = curr_page;
            drawlink();
            opts.callback(curr_page,this);
        })
    }
    drawlink();
    opts.callback(curr_page,this);
}