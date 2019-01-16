### Log 4: _Identity

##### 1/17, Week 7 Update

#### Bongo, bongo, bongo do I want to host the Mongo?

This week, I managed to write a bash script (my first one ever) to congregate all of my poems into one JSON file. I saved a local version of the poetry-collection-api fork and iterated through each of the author directories, appending each of their poems to `allPoems.JSON`. With that, I learned how to use the `mongoimport` command to get the contents of my JSON into my local collection.

Now that that was done, I wanted to get the database setup on a server. I was about to setup a server and host it using a service like Digital Ocean, but a friend recommended I use mLab.com. So, I created an account and now have my poem collection hosted there. This is not a permanent solution for the product, but it should be sufficient for the scope of my design project. If necessary, I can host my own server with replica sets and the whole shebang later on. 

In an impulse born of frustration with not knowing what to name my mLab db, I have also made strides in the branding sector. I have purchased the domain rights for *poempath.com* <-- Both "poem path": the path of poems my app provides, and "po-empath": a reference to the predictive nature of the app and a nod to science-fiction mind-readers. If this name sours in my mind, I also picked up *nextpoem.com* for 99 cents (a safer and respectively more boring option).

As for the frontend, I did build out a simple login page. I learn a bit more about using Quasar and have that much less to do for my frontend. Right now, it is simply conditionally rendered if the loggedIn variable is set to false and no routing takes place, but this will likely change. 

#### How Did I Do?

From week 6:
- Have the database configured completely for basic app functionality and (*stretch goal*) host the database on a server. **Complete**
- Begin building the backend- at least have it installed and configured. **TBD Likely, wil not be complete this week**
- Flesh out the frontend to the point of being able to cycle through multiple poems that are retrieved from the database. Do not spend time on aesthetics. **Not done, but I did add a login page. Also still TBD???** 

#### Goals for Week 8

