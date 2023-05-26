import url from "url";
import path from "path";

const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default _dirname