module.exports ={ 
    isLogined: function(req, res) {
            if (request.session.is_logined) {
                return true;
            } else {
                return false;
            }
    }
}