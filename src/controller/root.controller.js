function GetRoot(request, reply) {
    return reply.view("index");
}

module.exports = GetRoot;