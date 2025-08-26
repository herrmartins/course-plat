export function classToPlain(value) {
  return JSON.parse(
    JSON.stringify(value, (_k, v) => {
      if (v && typeof v === "object" && v._bsontype === "ObjectID" && typeof v.toString === "function") {
        return v.toString();
      }

      if (v instanceof Date) {
        return v.toISOString();
      }

      if (v && v.type === "Buffer" && Array.isArray(v.data)) {
        try {
          return Buffer.from(v.data).toString("base64");
        } catch {
          return null;
        }
      }
      return v;
    })
  );
}
