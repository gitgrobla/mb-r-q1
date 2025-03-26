CREATE TABLE IF NOT EXISTS Candidate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(50) NOT NULL,                    
    surname VARCHAR(50) NOT NULL,               
    email VARCHAR(255) NOT NULL UNIQUE,          
    phone_number VARCHAR(20) NOT NULL,        
    experience INTEGER NOT NULL CHECK (experience >= 0),
    notes TEXT,                      
    recruitment_state VARCHAR(20) NOT NULL CHECK (recruitment_state IN ('nowy', 'w trakcie rozmów', 'zaakceptowany', 'odrzucony')), 
    agree_date DATE NOT NULL,                    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS CandidateJobOffer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id INTEGER NOT NULL,
    job_offer_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (candidate_id) REFERENCES Candidate(id) ON DELETE CASCADE,
    FOREIGN KEY (job_offer_id) REFERENCES JobOffer(id) ON DELETE CASCADE,
    
    UNIQUE (candidate_id, job_offer_id)
);


