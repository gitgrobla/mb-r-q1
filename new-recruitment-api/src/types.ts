import { Database } from "sqlite/build/Database";
import sqlite3 from "sqlite3";

export type DB_INJECTION_TYPE = Database<sqlite3.Database, sqlite3.Statement>

export enum RecruitmentState {
    NOWY = 'nowy',
    W_TRAKCIE_ROZMOW = 'w trakcie rozmów',
    ZAAKCEPTOWANY = 'zaakceptowany',
    ODRZUCONY = 'odrzucony'
}