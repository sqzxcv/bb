
module.exports = {

    checkAndUpdateVisitCount: checkAndUpdateVisitCount,
    checkNeedShowInvitedView: checkNeedShowInvitedView,
    randomString:randomString
};

function checkAndUpdateVisitCount(req) {

    req.session.visitCount++;
    if (req.session.visitCount > 5) {


    }
};

function checkNeedShowInvitedView(req) {

    req.session.showRecommondView++;
    if (req.session.showRecommondView > 5) {
        // req.session.showRecommondView = 0;
        return true;
    }
    return false;
}

function randomString(len) {
    len = len || 32;
    var $chars = 'abcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}