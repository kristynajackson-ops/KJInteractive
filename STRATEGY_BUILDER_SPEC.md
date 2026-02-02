# Interactive Strategy Framework - Product Specification

## Overview

A web-based enterprise SaaS product for building, managing, and evolving organisational strategies with real-time intelligence monitoring.

**Product Name:** Strategy Builder  
**Framework Name:** Interactive Strategy Framework

---

## Core Concepts

### Hierarchy

```
Organisation (e.g., ASIC)
└── Program (transformation initiative)
    ├── Strategy Inputs
    │   ├── External (align to) - DTA, Treasury, WofG policies
    │   └── Internal (owned) - Agency strategies
    └── Interactive Strategy Framework
        ├── Strategy Level
        ├── Establishing Level
        ├── Delivery (EPICs) Level
        ├── Features Level
        └── Stories Level
```

### Specialty Layers (horizontal)

Each level has three specialty layers:
- **Core** - Foundational program management artifacts
- **Design** - User experience and service design artifacts
- **Architecture** - Technical and solution architecture artifacts

---

## Framework Nodes by Level

### STRATEGY LEVEL

#### Core (10 nodes)
1. Values
2. Mission
3. Strategic Goals/Outcomes
4. Measures of Success
5. Current State
6. Future State (Vision)
7. Enablers
8. Opportunities
9. What Success Looks Like
10. Priorities

#### Design (12 nodes)
1. Concept of Operations
2. Concept Model
3. Current State Model
4. Future State Model
5. Service Blueprint
6. User Personas
7. Design Principles
8. Design Governance Framework
9. Content Strategy
10. Research Strategy
11. Channel Strategy
12. Brand/Visual Identity Principles

#### Architecture (14 nodes)
1. Enterprise Architecture Model
2. Architecture Principles
3. Target State Architecture
4. Current State Architecture
5. Technology Strategy/Roadmap
6. Capability Model
7. Integration Strategy
8. Data Strategy
9. Security Architecture Principles
10. Architecture Governance Framework
11. AI Strategy
12. Cyber Security Strategy
13. Cloud Strategy
14. Technical Debt Strategy

---

### ESTABLISHING LEVEL

#### Core (20 nodes)
1. Strategic Roadmap (horizons, timebound activities, priorities, initiatives)
2. Prioritisation Framework
3. Business Value Maps
4. Risks and Issues
5. Dependency Map
6. Outcomes
7. KPIs
8. Project Definitions
9. Resourcing Model
10. Operating Model & Ways of Working
11. Scope/Boundaries
12. Assumptions
13. Constraints
14. Stakeholder Map
15. Strategic Risks
16. Governance Framework
17. Stakeholder Engagement Plan
18. Benefits Realisation Framework
19. Communication Plan
20. Budget/Funding Model

#### Design (11 nodes)
1. Current State Model
2. Mid/Interim Model
3. End State Model
4. User Journeys (Current State)
5. User Journeys (Future State)
6. Pain Points
7. Needs and Wants
8. Detailed Service Blueprint
9. Research Approach and Roadmap
10. Opportunity Assessment
11. Measurement Framework

#### Architecture (17 nodes)
1. Solution Architecture Approach
2. Current State Platforms
3. Future State Platforms
4. Integration Architecture
5. Data Architecture
6. Infrastructure Architecture
7. Security Architecture
8. Architecture Governance & Decision Making Framework
9. Technical Debt Assessment
10. Transition/Migration Architecture
11. NFRs (Target Standards)
12. API Strategy
13. Way of Working Architecture (e.g., DevOps)
14. Technology Standards
15. Architecture Review Process
16. Vendor/Product Assessment Framework
17. Environment Strategy

---

### DELIVERY (EPICs) LEVEL

#### Core (15 nodes)
1. Outcome/Purpose
2. Value (prioritised)
3. Benefits (measurable)
4. EPIC/Initiative Canvas
5. Owner
6. Stakeholders
7. Dependencies
8. Resourcing
9. Cost
10. Risk
11. Issues
12. Scope Statement
13. Timeline/Milestones
14. Success Criteria
15. Assumptions & Constraints

#### Design (8 nodes)
1. User Journey (Current)
2. User Journey (Future)
3. Personas
4. Pain Points
5. Needs and Wants
6. End State Model
7. Product Specifications (state, responsiveness, motion)
8. Usability Approach and Testing

#### Architecture (14 nodes)
1. Solution Design
2. Data & Integration Models
3. Technology & Stack Assessment
4. API Specifications/Contracts
5. Security Design
6. Infrastructure Requirements
7. Performance Requirements
8. PoC Outcomes
9. Technical Dependency Analysis
10. Technical Risk Assessment
11. Test Architecture
12. Deployment Architecture
13. Architecture Decision Records (ADRs)
14. Compliance/Regulatory Requirements

---

### FEATURES LEVEL

#### Core (14 nodes)
1. Resourcing Model
2. Features Roadmap
3. Prioritised Product Backlog
4. Acceptance Criteria
5. Definition of Done
6. Definition of Ready
7. Dependencies
8. Dependency Mapping
9. Risks
10. Issues
11. Impact
12. Benefits
13. Release Plan
14. Feature Owner

#### Design (7 nodes)
1. User Journeys
2. Personas
3. Pain Points
4. Needs and Wants
5. End State Model
6. Prototypes
7. Wireframes

#### Architecture (12 nodes)
1. Component/Module Design
2. API Endpoint Specifications
3. Data Model/Schema
4. Interface Contracts
5. Technical Acceptance Criteria
6. Test Approach
7. Configuration Requirements
8. Security Controls
9. Error Handling Approach
10. Logging/Audit Requirements
11. Caching Strategy
12. Feature Toggles/Flags

---

### STORIES LEVEL

#### Core (13 nodes)
1. Acceptance Criteria
2. Definition of Done
3. Definition of Ready
4. User Story Mapping
5. Risks
6. Issues
7. Dependencies
8. Dependency Mapping
9. Impact
10. Benefits
11. Assignee/Owner
12. Estimation
13. Sprint/Iteration

#### Design (8 nodes)
1. UI Mockups
2. Interaction Specifications
3. Accessibility Requirements
4. Content/Copy
5. Design Tokens/Specs
6. Edge Case Scenarios
7. Validation Rules
8. Annotations

#### Architecture (8 nodes)
1. Code Design/Pseudo-code
2. Database Scripts/Migrations
3. API Request/Response Specs
4. Unit Test Cases
5. Technical Implementation Notes
6. Configuration Values
7. Code Review Checklist
8. Definition of Technical Done

---

## Relationship Model

### Vertical Mapping (between levels)
- Nodes decompose/trace from Strategy → Establishing → Delivery → Features → Stories
- Progressive decomposition: same artifact type appears at multiple levels with narrowing scope

### Horizontal Mapping (within a level)
- Direct links: Explicit relationships between nodes (Core ↔ Design ↔ Architecture)
- Indirect links: Derived through transitive connections

---

## Strategy Inputs

### External (align to)
- Read-only (can't edit source)
- Monitored for changes (intelligence feed)
- Create alignment mappings
- Flag gaps

**Examples:**
- Whole-of-government strategies (DTA Digital Strategy, APS Reform)
- Portfolio strategies (Treasury directives)
- Cross-agency frameworks (Cyber security strategy)
- Legislation/policy (new Bills, regulatory changes)

### Internal (owned)
- Editable (owned content)
- Authored or imported
- Version controlled

**Examples:**
- Agency corporate plan
- Division/branch strategies
- Existing transformation roadmaps

---

## Intelligence Feed

### Sources
- digital.gov.au
- dta.gov.au
- pmc.gov.au
- finance.gov.au
- itnews.com.au
- aph.gov.au (Bills, Hansard, Committee reports)
- legislation.gov.au (Federal Register of Legislation)
- apsc.gov.au
- anao.gov.au
- budget.gov.au
- cyber.gov.au / ACSC
- treasury.gov.au
- abs.gov.au

### Behavior
- AI suggests impacts, human approves (HITL)
- Relevance scoring
- Node mapping (which strategy elements affected)
- Version history with source attribution

---

## Target Audience

- Australian government agencies
- Senior executives (SES)
- Business leaders
- Strategy authors

---

## Technical Architecture

### MVP Stack
| Layer | Service |
|-------|---------|
| Frontend | Next.js on Vercel |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| File storage | Supabase Storage |
| Region | Sydney (ap-southeast-2) |

### Enterprise Considerations
- Data residency (Australia only)
- Encryption at rest + in transit
- SSO integration (Azure AD/Entra ID) - future
- Audit logging
- Role-based access control
- Multi-tenant with row-level security

---

## MVP Scope

### IN
- Email/password auth
- Organisation (hardcoded to "ASIC")
- Create, view, edit a program
- Strategy Level - Core (all 10 nodes)
- Node detail view (click, view, edit)
- Basic navigation (Home → Program → Strategy Level → Node)
- Import strategy PDF (AI extracts to nodes)

### OUT (for now)
- Design & Architecture specialties
- Establishing / Delivery / Features / Stories levels
- Intelligence feed
- External source monitoring
- Relationships/traceability
- Version history
- Multiple users per org

---

## UI Concepts

### Navigation Model
| Direction | Movement |
|-----------|----------|
| Vertical | Strategy → Establishing → Delivery → Features → Stories |
| Horizontal | Core ↔ Design ↔ Architecture (tabs at any level) |
| Relationships | Click related nodes (direct links) |
| Traceability | See parent/child connections across levels |

### Key UI Elements
- Level tabs (top navigation)
- Specialty toggle (Core / Design / Architecture)
- Node cards (clickable, show summary + status + link count)
- 🔗 Link badges (relationship count)
- 🔔 Alert badges (intelligence items)
- ↑↓ Trace indicators (parent/child)
- Status indicators (✅ Complete, ⚠️ Draft, ❌ Not started)
- Intelligence panel (collapsible feed)

### Views
1. **Dashboard** - All programs
2. **Program view** - Strategy level overview
3. **Node detail** - Full content, related nodes, drill-down
4. **Traceability view** - Tree/graph of relationships

---

## Data Model (Conceptual)

```
Organisation
├── id
├── name
└── created_at

Program
├── id
├── organisation_id
├── name
├── description
└── created_at

StrategyInput
├── id
├── program_id
├── type (external/internal)
├── name
├── source_url
└── content

Node
├── id
├── program_id
├── level (strategy/establishing/delivery/features/stories)
├── specialty (core/design/architecture)
├── type (values/mission/goals/etc.)
├── title
├── content
├── status
├── source_id (StrategyInput reference)
└── created_at

NodeRelationship
├── id
├── from_node_id
├── to_node_id
├── relationship_type (direct/indirect)
└── created_at

Intelligence
├── id
├── program_id
├── source
├── url
├── title
├── content
├── relevance_score
├── affected_nodes[]
├── status (new/read/actioned/dismissed)
└── created_at
```

---

## Version History

| Date | Change |
|------|--------|
| 2 Feb 2026 | Initial specification created |
