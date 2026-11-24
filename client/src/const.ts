export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { withPublicBase } from "./publicBase";

// Local password login (replaces Manus OAuth portal)
export const getLoginUrl = () => withPublicBase("/login");
