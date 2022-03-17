import type { ServiceResponse } from "$lib/models/ServiceResponse";

export async function endpointPost<T>(url: string, model: any): Promise<T> {
    try {
        console.log(`EndPointClient: POST request at: ${url}`);
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(model)
        });

        return await res.json();

    } catch (err) {
        console.log(err);
    }
}