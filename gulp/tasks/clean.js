import { deleteAsync } from "del";

export const clean = () => deleteAsync(app.paths.clean)