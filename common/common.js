
module.exports = {

    checkAndUpdateVisitCount:checkAndUpdateVisitCount,
    checkNeedShowInvitedView:checkNeedShowInvitedView
};

function checkAndUpdateVisitCount(req) {
    
    req.session.visitCount ++;
    if (req.session.visitCount > 5) {


    }
};

function checkNeedShowInvitedView(req) {

    req.session.showRecommondView ++;
    if (req.session.showRecommondView > 5) {
        // req.session.showRecommondView = 0;
        return true;
    }
    return false;
}