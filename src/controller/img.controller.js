let currentSavedBase64 = []

exports.PostRoot = function (request, reply) {

    let data = request.body["data"]
    
    currentSavedBase64[0] = `data:image/png;base64,${data}`

    return "OK"
}

exports.GetImgBase64 = function(request, reply) {
    if(request.headers["x-auth-token"] != "FIT12354"){
        return "409 INVALID TOKEN"
    }
    if(!currentSavedBase64[0]){
        return "404 PHOTO NOT FOUND"
    }
    return reply.send({"new-photo" : currentSavedBase64[0]})
}