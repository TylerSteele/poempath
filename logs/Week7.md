### Log 4: Identity before Wisdom

##### 1/17, Week 7 Update

#### Bongo, bongo, bongo do I want to host the Mongo?

This week, I managed to write a bash script (my first one ever) to congregate all of my poems into one JSON file. I saved a local version of the poetry-collection-api fork and iterated through each of the author directories, appending each of their poems to `allPoems.JSON`. With that, I learned how to use the `mongoimport` command to get the contents of my JSON into my local collection.

Now that that was done, I wanted to get the database setup on a server. I was about to setup a server and host it using a service like Digital Ocean, but a friend recommended I use mLab.com. So, I created an account and now have my poem collection hosted there. This is not a permanent solution for the product, but it should be sufficient for the scope of my design project. If necessary, I can host my own server with replica sets and the whole shebang later on. 

In an impulse born of frustration with not knowing what to name my mLab db, I have also made strides in the branding sector. I have purchased the domain rights for *poempath.com* <-- Both "poem path": the path of poems my app provides, and "po-empath": a reference to the predictive nature of the app and a nod to science-fiction mind-readers. If this name sours in my mind, I also picked up *nextpoem.com* for 99 cents (a safer and respectively more boring option).

As for the frontend, I did build out a simple login page. I learn a bit more about using Quasar and have that much less to do for my frontend. Right now, it is simply conditionally rendered if the loggedIn variable is set to false and no routing takes place, but this will likely change. I was not able to connect it to the mongo db because, (duh) I need to  set up my backend first. 

After changing my directory layout to separate front end (client) from backend (server), I  configured the server folder so that it is ready to go with all of Koa's necessary packages. 

While I was hoping to accomplish more today, I had my wisdom teeth extracted this morning more or less wiped me out (as one would imagine) and my productivity has been a bit stifled. Tomorrow, I have all day to recover so hopefully I wil find time to devote to this project. 

#### How Did I Do?

From week 6:
- Have the database configured completely for basic app functionality and (*stretch goal*) host the database on a server. **Complete**
- Begin building the backend- at least have it installed and configured. **Complete (the "at least" portion, anyway)**
- Flesh out the frontend to the point of being able to cycle through multiple poems that are retrieved from the database. Do not spend time on aesthetics. **Not done, but I did add a login page. *According to web development fundamentals, backend talks to the db and the frontend talks to the backend. Who knew?!*** 

#### Goals for Week 8

- Build the backend to allow for CRUD with the database. Really, just build the whole backend, neural network withholding. 
- Select 30 poems to be used for the survey data collection.
- Build flow for the survey users, should just be 10 or so poems and options to like or dislike. This includes datacapture, so good luck!
- Set up user login / signup. Should just be username and password for now. 
