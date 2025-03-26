import { CandidateInnerDto } from "./dto/candidate.dto";
import { CandidateInputDto } from "./dto/candidate.input.dto";
import { DB_INJECTION_TYPE } from "./types";


export class CandidatesService {
    private readonly db: DB_INJECTION_TYPE;

    constructor(db: DB_INJECTION_TYPE){
        this.db = db;
    }

    async getAll(skip: number, limit: number): Promise<CandidateInnerDto[]> {
        try {
            const result = await this.db.all(`SELECT * FROM Candidate LIMIT ${limit} OFFSET ${skip}`);
            return result.map(e => CandidateInnerDto.fromDbRow(e));
        } catch (e) {
            throw new Error('DB Error')
        }
    }

    async create(data: CandidateInputDto): Promise<CandidateInnerDto> {
        try {
            await this.db.run('BEGIN TRANSACTION');

            const candidateQuery = `
            INSERT INTO Candidate (
              firstname, surname, email, phone_number, 
              experience, notes, recruitment_state, agree_date
            ) VALUES ('${data.firstname}', '${data.surname}', '${data.email}', '${data.phoneNumber}', '${data.experience}', '${data.notes}', '${data.recruitmentState}', '${data.agreeDate}')
          `;

            const {lastID} = await this.db.run(candidateQuery);

            const p: Promise<any>[] = []
            data.jobOfferIds.forEach(async id => {
                p.push(this.db.run(`INSERT INTO CandidateJobOffer (candidate_id, job_offer_id)
                    VALUES (${lastID}, ${id})`))
            })
            await Promise.all(p)

            await this.db.run('COMMIT')

            const c = await this.db.all(`SELECT * from Candidate where id = ${lastID}`)
            return CandidateInnerDto.fromDbRow(c[0])
        } catch (e) {
            console.log(e)
            this.db.run('ROLLBACK')
            throw new Error('DB Error')
        }
    }

}