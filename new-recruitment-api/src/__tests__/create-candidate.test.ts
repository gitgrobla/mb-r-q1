import { Application } from "express";
import { setupApp } from "../app";
import { CandidatesService } from "../candidates.service";
import { DB_INJECTION_TYPE } from "../types";
import request from "supertest";
import { CandidateInputDto } from "../dto/candidate.input.dto";
import { RecruitmentState } from "../types";

describe('Create Candidate', () => {
    let app: Application;
    let mockDb: Partial<DB_INJECTION_TYPE>;
    const now = new Date();
    const candidateInput: CandidateInputDto = {
        firstname: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "+48123456789",
        experience: 5,
        notes: "Experienced developer",
        recruitmentState: RecruitmentState.NOWY,
        agreeDate: now,
        jobOfferIds: [1]
    };

    beforeAll(async () => {
        mockDb = {
            all: jest.fn().mockResolvedValue([{id: 1,...candidateInput}]),
            get: jest.fn(),
            run: jest.fn().mockResolvedValue({ lastID: 1 }),
        } as Partial<DB_INJECTION_TYPE>;
        const service = new CandidatesService(mockDb as DB_INJECTION_TYPE);
        app = await setupApp(service);
    });

    it('should create a new candidate successfully', async () => {
        const mockDbResponse = {
            id: 1,
            firstname: candidateInput.firstname,
            surname: candidateInput.surname,
            email: candidateInput.email,
            phone_number: candidateInput.phoneNumber,
            experience: candidateInput.experience,
            notes: candidateInput.notes,
            recruitment_state: candidateInput.recruitmentState,
            agree_date: now.toISOString(),
            created_at: now.toISOString(),
            updated_at: now.toISOString()
        };

        (mockDb.get as jest.Mock).mockResolvedValueOnce(mockDbResponse);

        const response = await request(app)
            .post('/candidates')
            .send(candidateInput)
            .expect(201);

        expect(response.body).toMatchObject({
            firstname: candidateInput.firstname,
            surname: candidateInput.surname,
            email: candidateInput.email,
            experience: candidateInput.experience,
            notes: candidateInput.notes,
        });

        expect(mockDb.run).toHaveBeenCalledTimes(4);
        expect(mockDb.all).toHaveBeenCalledTimes(1);
    });
});
