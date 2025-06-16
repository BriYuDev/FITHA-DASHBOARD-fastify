function GetRoot(request, reply) {
    return reply.view("index.html", {title: "Fitha Dashboard"});
}

module.exports = GetRoot;