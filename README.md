## Lab 04/07 -- Build Something w/ Layered Architecture & CRUD Routes

### Basic Overview

- Theme: "Facts About Nougat" -- humorous and occasionally true fact database
- Operation: User can add, edit, delete and view nougat-facts
- CRUD implementation:
  - Create = POST to add new fact
  - Read = GET to retrieve all or single-by-id facts
  - Update = PUT to edit a single fact by id
  - Delete = DELETE an apparently non-factual fact
- External Interactivity: functionality to send a fact via email using Amazon SES

### Work Process Outline

1. create data model for facts SQL table
2. load data into SQL database
3. write POST /facts endpoint test
4. develop POST /facts endpoint to pass test
5. repeat steps 3-4 for rest of endpoints
6. move on to Amazon SES
