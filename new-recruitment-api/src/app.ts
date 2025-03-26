import express from "express";
import { CandidatesController } from "./candidates.controller";
import { DB_INJECTION_TYPE } from "./types";
import { CandidatesService } from "./candidates.service";
require('dotenv').config()

export const setupApp = async (service: CandidatesService) => {
    const app = express();

    app.use(express.json());

    app.use(new CandidatesController(service).router);

    return app;
}
