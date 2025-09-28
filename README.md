
# the auth strategy
I had to figure the auth strategy for react -> django server because both are now decoupled. 
before django rendered the frontend so exposed the authed user into the template wheras now our frontend only communicates via api calls. 

i decided on JWT.

[x] query our backend server and hit the superuser/tasks endpoint
[x] get bootstrap working correctly
[x] get react router working correctly
[x] create a task component

[x] create a user global context using zustand.
[x] login requests gets back generated token and handle this in storage
[x] auth checks and page protection
[x] display tasks for that user
[x] user component that shows name , email and ability to sign out
[x] tasks filtering and status ability

[] ability to create new tasks
[] ability to delete existing tasks.
---




# how to login / register / auth with our server
# create ui for login / register / user profile
# using react-router for pages - setup the auth flow / user task area and auth restriction. 
# fetch / create / edit / delete tasks via signed in user.

