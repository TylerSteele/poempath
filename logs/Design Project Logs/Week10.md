### Log 7: THERE'S NO TIME!!

##### 2/8, Week 10 Update

#### Now people know I'm not an impostor

The site is live! Well, the data collection version of the site, anyway, which is nearly the site itself. 

This week, I finished implementing captcha into the site and reconfigured it around survey collection. 

Once that was done, I spun up 2 servers with Digital Ocean: one for the frontend, and one for the backend/database. 

For the DO Droplets (server instances), I configured domain services and routing for _poempath.com_. Both instances use 
Nginx as the web server. I have set up a server with Nginx before, but I had to relearn how to do it this time. That 
part was easy. 

What was difficult and new for me was deploying my apps to each server. For the Vue app, I needed to build it locally
and scp (remotely copy) it into the server's index directory. That sounds and is simple, but it took me a while to 
figure that out because code deployment has been foreign to me. 
 
The backend was not so easy to deploy. I needed to download and run mongo locally and import the poetry to that 
database. Then, I needed to write a `.service` file for the deployment of Koa. In my index.js file, I needed a `#!` for 
initiation. I also needed to do port routing so `/` requests would be rerouted to the port on which Koa was running. 
 
Oh, on top of that, I configured SSL for both servers using Let's Encrypt. Honestly, it was a bit of a Hail Mary 
that I was able to learn all of these different technologies and get something working out of it. The tutorials are 
spotty at best, especially when there is no tutorial that matches my specific languages. I have  learned to read the
docs and respect their (sometimes cryptic) knowledge. 

Once my site was usable on all devices with internet access across the world (:tada:) I celebrated momentarily and 
realized that the scale of everything was more or less atrocious. I have been developing on a 4K monitor, so when I 
opened the website on my phone, the text was waaaaay too large. And it was even too big in desktop view. CSS
has been my weakest link as a web developer, I think, but this week I learned the difference between most of the 
CSS units. After experimentation with what felt like every one (px, em, vh, vw, vmin) I finally settled on rem.
I loved the idea of using vmin as it scales directly to the view size, but then zoom functionality does not work. 
  
To better account for different screen sizes, I learned about and implemented CSS media queries. This concept seems 
outdated at this point, but for this project I was able to fudge mobile and desktop support by applying mobile CSS 
when the screen is portrait and desktop CSS when the screen is landscape. _Just don't open the website on your phone 
in landscape mode!_

Now, I feel good about having proof in the world that I can build things. It is not done, and the website itself is 
simple, but now I have an embodiment of the skills I have honed and validation for the career path I have chosen. 
Also, I have barely any time left. **AGGGHHHHH**

#### How Did I Do?

- Finalize reCaptcha configuration. Should be nearly done...? Don't forget to reconfigure the env variable for the 
deployed site. **Done** 
- Remove user sign in for data collection phase. Just identify based on session variable. (If at all. Unique db 
entries should speak for themselves.) **Done. Did use session variables, forgot I did that this week**
- Host the website and database on live servers and configure DNS for the URL: _poempath.com_ **Done**
- You have two weeks left, so if you do not do these things this week, then your outlook is bleak.  **Acknowledged**

:100: :clap: :clap: :clap:

#### Goals for Week 9

- Post everywhere you can think of to try and convince people to rate poems. 
- Build the recommendation engine. Might be a fast and dirty solution, but it should at least work.
- Reconcile changes between the two branches (`data-collection` and `master`).
- Connect the recommendation engine to codebase. This should ideally be the last week in which code is written. 
- Create logo and implement the design (bonus).
- Think about what you want to convey in the presentation. 