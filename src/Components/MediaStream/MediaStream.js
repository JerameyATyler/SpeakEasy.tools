export default async (config) => {
    try {
        return await navigator.mediaDevices.getUserMedia(config);
    } catch (e) {
        console.log(`Error... ${e.error}`);
    }
};