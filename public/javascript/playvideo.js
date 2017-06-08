window.onload = function () {

    var videoNode = document.getElementById('my-player');
    // var overlayNode = document.createElement('div');
    // // 因为视频节点是普通的节点,所以直接让需要覆盖在其上的新节点宽高与其相同即可
    // // clientWidth属性只有数值，所以还需手动加上 'px' 这个单位
    // overlayNode.style.width = videoNode.clientWidth + 'px';
    // // http://stackoverflow.com/questions/9191803/why-does-z-index-not-work
    // // 只有设置了position属性的元素,z-index才能对其起作用
    // overlayNode.style.position = 'relative';
    // overlayNode.style.zIndex = 20000;

    // http://stackoverflow.com/questions/19355952/make-html5-video-stop-at-indicated-time
    // 下面这个函数可以使视频只暂停一次
    // 常规的pause方法,只要视频播放时长超过指定时间
    // 就会一直执行暂停函数
    var pausing_function = function () {
        // currentTime 的单位为秒，有些时间属性单位为毫秒，要区分好
        if (this.currentTime >= 1*20) {
            this.pause();
            alert("必须注册");
            // videoOverlay();
            // 暂停播放后，移除事件监听器
            // 否则视频播放只要超过2秒，就会一直被暂停
            // this.removeEventListener("timeupdate", pausing_function);
        }
    };
    videoNode.addEventListener("timeupdate", pausing_function);
}