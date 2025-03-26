import { CandidatesService } from "./candidates.service"
import { DB_INJECTION_TYPE } from "./types";

export const setupService = async (db: DB_INJECTION_TYPE) => {
    return new CandidatesService(db);
}