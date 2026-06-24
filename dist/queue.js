export async function sendToQueue(event) {
    const endpoint = process.env.QUEUE_ENDPOINT;
    if (!endpoint)
        return; // optional feature
    await fetch(endpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            ...(process.env.QUEUE_TOKEN
                ? { authorization: `Bearer ${process.env.QUEUE_TOKEN}` }
                : {})
        },
        body: JSON.stringify(event)
    });
}
//# sourceMappingURL=queue.js.map