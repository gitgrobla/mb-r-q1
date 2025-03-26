import * as process from "node:process";
import { setupDb } from "./db";
import { setupApp } from "./app";
import { setupService } from "./services";

const PORT = process.env.PORT ?? 3000;

main();

async function main() {
    const db = await setupDb();
    const service = await setupService(db);
    const app = await setupApp(service);

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
};

