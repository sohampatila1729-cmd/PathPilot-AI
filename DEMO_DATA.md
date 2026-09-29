# DEMO_DATA.md — PathPilot AI Dataset Documentation

This document transparently explains the data sources, synthetic generation methodology, underlying assumptions, and known limitations used in **PathPilot AI** for Round 1 of **HACK MATRIX 5.0 (Kali Yuga)**.

---

## 1. Overview & Data Transparency

PathPilot AI is designed as an **educational decision-support platform**, NOT an automated admissions authority. In adherence to hackathon integrity and fair representation:

- **Classification:** Synthetic benchmark dataset modeled on publicly available state entrance rules (DTE Maharashtra, MHT-CET, JoSAA, MahaDBT).
- **Purpose:** Demonstrate multi-pathway simulation, sensitivity analysis, and trade-off calculation without relying on live web scraping or unverifiable proprietary APIs.
- **Labeling:** All institution comparisons, fee estimates, and scholarship matches within the application are clearly labeled as `[DEMO / SYNTHETIC DATA]`.

---

## 2. Dataset Entities

### 2.1 Demo Personas (`data/demoData.ts`)
To allow instant demonstration during hackathon evaluation, 3 diverse student personas are pre-loaded:

1. **Aarav Deshmukh (Default Persona)**
   - **Academic Score:** 88.4% in Class 10 (CBSE/State Board).
   - **Strong Subjects:** Mathematics, Science / Physics, Computer Science.
   - **Budget:** ₹3,50,000 / year (~₹14 Lakhs total for 4-year degree).
   - **Target Career:** AI / Machine Learning Engineer.
   - **Demonstrates:** Balanced trajectory toward premier autonomous engineering programs (COEP / PCCOE).

2. **Pooja Shinde (Budget-Constrained Polytechnic Persona)**
   - **Academic Score:** 74.2% in Class 10.
   - **Strong Subjects:** Applied Science, Technical Drawing, Mathematics.
   - **Budget:** ₹95,000 / year (Highly budget-constrained).
   - **Target Career:** Automation & Robotics Engineer.
   - **Demonstrates:** High-resilience Polytechnic Diploma (3 Years) → Direct Second Year B.Tech (Lateral Entry), reducing costs by >60% with zero entrance exam stress.

3. **Ishaan Mehta (Data Science & FinTech Persona)**
   - **Academic Score:** 92.6% in Class 10.
   - **Strong Subjects:** Mathematics, Economics, English.
   - **Budget:** ₹6,00,000 / year.
   - **Target Career:** Data Scientist / Quantitative Analyst.
   - **Demonstrates:** Specialized applied computation and dual-degree tracks.

---

### 2.2 Institutions Dataset
The dataset includes regional institutions representing diverse tiers:

| Institution Name | Location | Type | Approx Annual Tuition | Typical Admission Channel |
|---|---|---|---|---|
| **COEP Technological University** | Pune, MH | Government / Autonomous | ₹1,05,000 | MHT-CET (98.5+ %ile) / JEE Main |
| **PCCOE (Pimpri Chinchwad College of Engineering)** | Pune, MH | Autonomous / Aided | ₹1,45,000 | MHT-CET (94-97 %ile) |
| **MIT World Peace University (MIT-WPU)** | Pune, MH | Private University | ₹3,60,000 | MIT-WPU CET / MHT-CET / JEE |
| **Government Polytechnic Pune (GPP)** | Pune, MH | Government Polytechnic | ₹14,000 | Direct Class 10 Board Merit (CAP) |
| **Vishwakarma Institute of Technology (VIT)** | Pune, MH | Autonomous | ₹1,85,000 | MHT-CET / JEE Main |
| **BITS Pilani** | National | Private Deemed | ₹5,80,000 | BITSAT Entrance Exam |

---

### 2.3 Scholarships & Funding Opportunities
Modeled on real state and central educational policies:
1. **Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)** — 50% tuition and exam fee waiver under Government of Maharashtra MahaDBT.
2. **AICTE Pragati Scholarship for Girls** — ₹50,000/year allowance for female students entering technical degree/diploma programs.
3. **Central Sector Scheme of Scholarship** — ₹12,000 to ₹20,000/year for students in the top 20th percentile of board exams.
4. **Vidyasaarathi Corporate CSR Scholarships** — Supplemental corporate funding grants (Tata, JSW, ACC).

---

### 2.4 Education Loan Benchmark Profiles
Modeled according to RBI / Indian Banks' Association (IBA) norms:
- **SBI Scholar Loan:** 8.4% p.a., up to ₹40 Lakhs (no collateral up to ₹7.5L).
- **Bank of Baroda Vidya:** 9.15% p.a., 0.50% concession for female students.
- **Canara Vidya Turan:** 8.85% p.a., quick digital approval.

---

## 3. Assumptions & Methodology

1. **Tuition Inflation:** Fees in the demo dataset assume flat annual tuition across the standard 3 or 4-year degree period, excluding hostel living costs (~₹80k - ₹1.2L/yr).
2. **Scoring Formulas:**
   - **Academic Fit:** Baseline matches Class 10 score against the prerequisite rigor of Class 11-12 PCM and entrance examinations.
   - **Budget Fit:** Calculated as `(Annual Family Budget * Program Duration) / Total Estimated Cost`. A ratio $\ge 1.0$ yields a score of 85–100, while lower ratios scale down smoothly to signal the need for loans or fee waivers.
   - **Admission Feasibility:** Incorporates competitive cutoffs. Government top-tier seats carry moderate feasibility even for 90% students due to entrance exam percentile variability.
   - **Composite Decision Index:** Weighted sum:
     $$\text{Index} = 0.25 \times \text{Academic} + 0.25 \times \text{Interest} + 0.20 \times \text{Budget} + 0.15 \times \text{Admission} + 0.15 \times \text{Career}$$

---

## 4. Limitations

- **Seat Reservation Policies:** The prototype simulates primarily Open/EBC general categories; specific category reservation multipliers (SC/ST/OBC/NT/EWS) can be integrated in future phases.
- **Dynamic Cutoffs:** Real-world cutoffs change each year based on applicant density and exam difficulty.
- **Verification Requirement:** The platform explicitly instructs students to confirm admission requirements on `cetcell.mahacet.org` and `dtemaharashtra.gov.in`.
