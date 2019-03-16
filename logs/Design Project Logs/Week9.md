### Log 6: Burnt out or lazy? 

##### 1/31, Week 9 Update

#### Change of direction and pace

I am currently feeling quite unmotivated, so I was about to say that this week has been relatively less productive. I just reviewed my commits, however, and I guess I got quite a bit done?

While I was planning on sticking to basic vue functionality for the majority of my frontend, I decided this past weekend to use VueX for proper state management. VueX was difficult to wrap my head around. I still am a bit shakey on the fundamentals, but I have VueX implemented to the point of having the current user's information accessible throughout the app (only one view for now, but should I add more, the information will be available).

As part of that user state, I also added liked and disliked poem arrays, so any poem that a user reacts to is appended to their respective array. Currently, I am not doing anything with that data, but the skeleton of the app is taking shape.

 I nearly have invisible recaptcha setup, but encountered some issues and will continue with that next week. Hopefully, this will allow me to verify the humanity of my users without damaging user experience. 
 
 After a brief consultation and recap with my professor, we decided to scrap the whole neural network idea (good thing I didn't user neural in the name!) and switch to a recommendation engine. To be fair, I think he had a recommendation engine in mind the whole time and I just got confused and caught up in the NN hype. 
 
 Recommendation engines are cool, too! But I know less about them than I do about neural networks, so I will need to quickly familiarize myself and determine how I can build one in this terribly limited time frame. Note to future self: _start with the backend_.

With the change to a recommendation engine came changes to my requirements for my data collection. So, while I did fail at launching that on time, I do believe I would have had it up had my requirements not change. There's always next week (until next week, that is).

Speaking of disappointment, I have noticed a pattern of me setting goals for myself and succeeding ~60% of the time. If I track my progress based on that, I am unsuccessful. However, if I look only at positive gains and my long term progress, I am quite alright. Hopefully, success is nothing more than a sum of partial failures. Hopefully, I can learn to see the forest for the trees. For now, though, call me an arborist.

In my defense, though, I did start a new job this week. That has been a significant time and cognitive investment.  

#### How Did I Do?

- Build flow for the survey users, should just be 10 or so poems and options to like or dislike. This includes data capture, so good luck! (From Week 8's goals) **I do have data collection done. Finishing this is as simple as creating a new survey collection and drawing poems from that (hard part is done).**
- Host the website and database on live servers and configure DNS for the URL: _poempath.com_ **Not done at all. I am waiting until the code is tip-top before I begin hosting.**
- Post online to forums and social media links to the site and desperate pleas. May need help from others with actual online presence. **For next week**
- THIS IS IT. Time for surveyal has come. You said this would be out there by the end of January so you would have enough time to gather data. **No excuses.** **<-- _Where does this guy get off?_ Yeah, so apparently things change and life goes on.**

#### Goals for Week 9

- Finalize reCaptcha configuration. Should be nearly done...? Don't forget to reconfigure the env variable for the deployed site. 
- Remove user sign in for data collection phase. Just identify based on session variable. (If at all. Unique db entries should speak for themselves.) 
- Host the website and database on live servers and configure DNS for the URL: _poempath.com_
- You have two weeks left, so if you do not do these things this week, then your outlook is bleak.  
