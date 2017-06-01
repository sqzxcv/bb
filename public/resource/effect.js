/**
 * Created by ruby on 15/12/24.
 * @mail liyufeng_23@163.com
 */


/**
 * 页面初始效果
 */
function loadDynamicEffect(){
    
    
    $(".tab-nav li").each(function() {
        $(this).click(function () {
            var tabs = $(this).closest(".tab-nav").children("li");
            tabs.removeClass("active");
            $(this).addClass("active");

            //var panels = $(this).closest(".m-tabs").children(".tab-content").children(".tab-panel");
            //panels.css("display", "none");
            //var content = $(this).closest(".m-tabs").children(".tab-content").children(".tab-panel").eq($(this).index());
            //content.css("display", "block");
            var panels = $(this).closest(".m-tabs").find(".tab-panel");
            panels.css("display", "none");
            var content = $(this).closest(".m-tabs").find(".tab-panel").eq($(this).index());
            content.css("display", "block");
        });
    });
}

 