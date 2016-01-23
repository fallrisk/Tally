# Tally
Free Code Camp Challenge: Build a Voting App.

This application doesn't use a database. It uses memory to store information. Every time the
application restarts the users are cleared and the polls are cleared. I made the application
this way because I don't want to deal with keeping stuff clean on just a sample app. The goal
of the app. is to show the functionality required in the user stories. In essence the app. has
temporary storage, and that's all it needs to show the functionality.

## User Stories (Requirements)
### As an Authenticated User
* User Story: As an authenticated user, I can keep my polls and come back later to access them.
* User Story: As an authenticated user, I can share my polls with my friends.
* User Story: As an authenticated user, I can see the aggregate results of my polls.
* User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.
* User Story: As an authenticated user, I can create a poll with any number of possible items.
* User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.

### As an Unauthenticated User
* User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

## References
There are many references through out the code that can be found at the top of the source files.
They generally have to do with solving one particular problem. The one's listed here are more
important and fundamental to understanding the architecture.

* https://github.com/facebook/flux/tree/master/examples/flux-chat
* https://github.com/facebook/flux/tree/master/examples/flux-todomvc
* This one is incredibly important for understanding how to get persisted data.
  http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/
