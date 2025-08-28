export function retrieveFiles(rawFiles) {
    if (!Array.isArray(rawFiles)) {
        console.error("Input must be an array.");
        return [];
    }

    return rawFiles.map((file) => ({
        name: file?.title || file?.name || "Arquivo",
        size: file?.size,
        type: file?.mimetype || "",
        url: file?.url,
    }));
}