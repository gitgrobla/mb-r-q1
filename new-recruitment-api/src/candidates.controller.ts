import { Request, Response, Router } from "express";
import { CandidatesService } from "./candidates.service";
import { PAGE_SIZE } from "./constants";
import { CandidateOutputDto } from "./dto/candidate.output.dto";
import { GetAllQueryParams } from "./interfaces/paginate.interface";
import { CandidateInputDto } from "./dto/candidate.input.dto";
import { CandidateLegacyDto } from "./dto/candidate.legacy.dto";

export class CandidatesController {
    readonly router = Router();
    readonly service: CandidatesService;

    constructor(service: CandidatesService) {
        this.router.get('/candidates', this.getAll.bind(this));
        this.router.post('/candidates', this.create.bind(this));
        this.service = service;
    }

    async getAll(req: Request<{}, {}, {}, GetAllQueryParams>, res: Response) {
        const {page} = req.query
        console.log(page)
        const parsedPage = page ? parseInt(page, 10) : 0;

        const result = await this.service.getAll(parsedPage * PAGE_SIZE, PAGE_SIZE)

        res.json(result.map(
            e => new CandidateOutputDto(e)
        ))
    }

    async create(req: Request<{}, {}, CandidateInputDto, {}>, res: Response) {
        const candidate = req.body
        try {
            const created = await this.service.create(candidate)

            const legacy = new CandidateLegacyDto({
                firstName: candidate.firstname,
                lastName: candidate.surname,
                email: candidate.email
            }) 

            await fetch(process.env.LEGACY_URL, {
                method: 'POST',
                headers: {
                    'x-api-key': process.env.LEGACY_API_KEY
                },
                body: JSON.stringify(legacy)
            })

            res.status(201).json(new CandidateOutputDto(created))
        }
        catch (e) {
            res.status(400).json({error: e.message})
        }
    }
}
