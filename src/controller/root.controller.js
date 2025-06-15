export async function GetRoot(request, reply) {
    return reply.view("index.ejs", {title: "Fitha Dashboard"});
}