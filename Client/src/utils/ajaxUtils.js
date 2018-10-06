class AjaxUtils {
    async fetch(url, method, data) {
        const config = {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, config);

        return await response.json();
    }
}

export default new AjaxUtils();