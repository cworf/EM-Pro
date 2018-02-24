# EM-Pro

## Project Proposal

### Name of Student:
Colin Worf

### Name of Project:
EM-Pro

### Project’s Purpose or Goal: (What will it do for users?)
A full featured equipment management platform for multi-location Pro Audio companies, with inventory management, conflict notifications, event lifecycle tracking, and more.

### List the absolute minimum features the project requires to meet this purpose or goal:
- user can click a date on a calendar and fill out a pull sheet (event details and equipment needs)
- user can check to see if there are any conflicts on future equipment needs
- user can add inventory to database with the ability to distinguish the number of items in each location
- user can save venue details (including multiple separate stage's power and rigging details) for later use in pull sheets
- user can save client details for later use in pull sheets
- user can sign off on every piece of equipment on every stage of the event (pulled, loaded, returned)

### What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.
- React JavaScript framework
- FireBase user authentication
- FireStore NoSQL database
- Material-UI
- react-big-calendar (npm module)

### If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.
- user can set to return the equipment to a different location (during the final return stage of the process)
- user can note problems and fixes on specific pieces of equipment and view repair history of each item
- user can track purchase dates and warrantee status through serial numbers of all purchased equipment
- user can keep track of crew requirements (Prep Crew, Load Crew, Show Crew, Strike Crew, QC Crew)
- crew hours and performance ratings can be managed
- switch between light and dark theme for use in various environments (possibly auto detect the ambient light level and adjust theme automatically)
- Get total weight and volume of equipment list

### What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?
None

### Is there anything else you’d like your instructor to know?

I need to confirm some questions about the structure of my app, specifically related to placing a switch area within a component that is already being routed to in App

## Component Flow Chart

![alt text](src\assets\images\MProFlow.jpg)
