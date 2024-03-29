
module.exports = (express, db, session, sessionStore) => {
    const router = express.Router({ mergeParams: true });

    router.use(session
        ({
            secret: 'JVLg|FZ0MFOmP~H',
            resave:false,
            saveUninitialized:true,
            store:sessionStore,
            saveUninitialized: true,
            cookie: { maxAge :600000 }, //10분 
            rolling : true  // rolling 새로고침시 maxage 갱신
    }));
    
    var communityIdx //const & let X (블록 스코프)
    var userid 
    var title 
    
    var resResult ={
        status : 0,
        message : "",
        data : {communityIdx, userid, title}
    };

    router.post("/community", async(req, res) => {
        communityIdx = req.body.idx;
        userid = req.session.name;
        title = req.body.title;

        await db.getCommunityLike(req.body.idx, req.session.name, (communityResult) => {
        console.log(communityResult)
            
        })

        await db.getCommunityLikeList(req.body.idx, req.session.name, (likeResult) => {
            if(likeResult[0]) {
                resResult.status = 1;
                resResult.message = "좋아요 -1"
                resResult.data = {communityIdx, userid, title};
                res.send(resResult)
                db.communityLike(resResult.status, req.body.idx, req.session.name, () => {
        }) 
            } else { 
                resResult.status = 0;
                resResult.message = "좋아요 +1"
                resResult.data = "";
                res.send(resResult)
                db.communityLike(resResult.status, req.body.idx, req.session.name, () => {
                }) 
            } 
        }    
        ); 
        
    });

    router.post("/job", async(req, res) => {
        jobIdx = req.body.idx;
        userid = req.session.name;
        title = req.body.title;

        await db.getjobLike(req.body.idx, req.session.name, (jobResult) => {
        console.log(jobResult)
            
        })

        await db.getjobLikeList(req.body.idx, req.session.name, (likeResult) => {
            if(likeResult[0]) {
                resResult.status = 1;
                resResult.message = "좋아요 -1"
                resResult.data = {jobIdx, userid, title};
                res.send(resResult)
                db.jobLike(resResult.status, req.body.idx, req.session.name, () => {
        }) 
            } else { 
                resResult.status = 0;
                resResult.message = "좋아요 +1"
                resResult.data = "";
                res.send(resResult)
                db.jobLike(resResult.status, req.body.idx, req.session.name, () => {
                }) 
            } 
        }    
        ); 
        
    });


    return router;

}



