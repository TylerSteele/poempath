### Log 5: On the Route to Success (Status: 200)

##### 1/24, Week 8 Update

#### Developer Authenticated

At long last, my project is beginning to look like a full-stack application (based on the technical definition). The frontend speaks to the backend and the conversation is coherent. All I have, really, is a simple app with user sign-up/log-in and a random poem. At the same time, though, I built the backend in a new framework I have never used before (Koa), created API calls and an API with practically zero experience, and assembled a decent (to be improved) frontend. Still, the worst is yet to come. 

Currently, the API supports creating a user, validating a user (log in), deleting a user, finding a random poem, and finding a poem by author. Each one can return a number of status codes depending on the input data (built for more than just the best-case). 

I implemented a router in the frontend with "/welcome" and "/home" routes for login and the main view, respectively. The routes are programmatically secured such that any visitor who is not logged in cannot access the home page or its contents. Upon log-in or sign-up, the user is redirected to home. I still need to store the active user in the state, but I do not currently have any logic dependent on that. 

For the user entry view, I thoroughly improved the validation and user experience. Fields are highlighted to indicate bad input and reasons are presented to inform them what is expected. If I wanted to turn this app into a product, I would likely request email instead of or in addition to username. 

One day, when I was feeling less motivated, I actually used my application to peruse poetry (randomly) and compile a list of 20 poems that can be used for the data collection phase. My goal initially was 30, but I believe 20 will be more than enough given the fact that each user will view a random, limited assortment drawn from that pool. Plus, I can find more when the time comes if necessary. 

#### How Did I Do?

From week 7:
- Build the backend to allow for CRUD with the database. Really, just build the whole backend, neural network withholding. 
   
   **Pretty much done. I will need more API actions, but I now have the knowledge to quickly build them as I go.**  
- Select 30 poems to be used for the survey data collection. 

    **I selected 20, and that actually took a significant amount of time. Many poems in my database lack their proper spacing/layout, are impractically long for a survey, or simply are missing content. _THIS PROBLEM SHOULD BE REVISITED_**
- Build flow for the survey users, should just be 10 or so poems and options to like or dislike. This includes data capture, so good luck! 

    **Not at all done. User log-in/sign-up was far more difficult to learn (not so much implement) than I anticipated.**
- Set up user login / signup. Should just be username and password for now. 
    
    **Completely Done.**

#### Goals for Week 9

 - Build flow for the survey users, should just be 10 or so poems and options to like or dislike. This includes data capture, so good luck! (From Week 8's goals)
 - Host the website and database on live servers and configure DNS for the URL: _poempath.com_
 - Post online to forums and social media links to the site and desperate pleas. May need help from others with actual online presence. 
 - THIS IS IT. Time for surveyal has come. You said this would be out there by the end of January so you would have enough time to gather data. **No excuses.**
