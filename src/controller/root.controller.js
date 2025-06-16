function GetRoot(request, reply) {
    return reply.view("index.ejs", {title: "Fitha Dashboard"});
}

module.exports = GetRoot;