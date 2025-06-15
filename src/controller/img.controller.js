
const __dirname = import.meta.dirname;

let currentSavedBase64 = []

export async function PostRoot(request, reply) {

    let data = request.body["data"]
    
    currentSavedBase64[0] = `data:image/png;base64,${data}`

    return "OK"
}

export async function GetImgBase64(request, reply) {
    if(request.headers["x-auth-token"] != "FIT12354"){
        return "409 INVALID TOKEN"
    }
    if(!currentSavedBase64[0]){
        return "404 PHOTO NOT FOUND"
    }
    return reply.send({"new-photo" : currentSavedBase64[0]})
}