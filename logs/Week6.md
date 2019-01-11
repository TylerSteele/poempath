### Log 3: Red eyes and APIs

##### 1/10, Week 6 Update

#### Full Throttle, Indeed

The year is new and I, after a lovely vacation, have returned to reality. With my return came the rough realization that I only have ~3 weeks to finish my frontend and survey. I am happy to report that, since my return, I got loads of work done!

First, I built an actually passable frontend for the main poem view using Quasar. This, in no way, reflects a full user experience, but it will serve as a sufficient platform for my development of the backend. 

My favorite bit of progress is that I configured my project with Axios (an API library) and completed my first successful query to the poetry (github) API! So, I viewed Robert Frost's "After Apple-Picking" within the frontend that I built using Vue and Quasar; using data that was collected via Axios and an API call that I wrote. *Pretty cool*. 

Finally, I installed MongoDB locally on my development machine. This project will not rely on API calls within the application itself (unless the calls are to my own server) so I need to host the poetry database. I decided to use Mongo because it does not require as much setup as SQL and it is what I have the most experience with.   

#### Goals for Week 7

- Have the database configured completely for basic app functionality and (*stretch goal*) host the database on a server. 
- Begin building the backend- at least have it installed and configured.
- Flesh out the frontend to the point of being able to cycle through multiple poems that are retrieved from the database. Do not spend time on aesthetics. 