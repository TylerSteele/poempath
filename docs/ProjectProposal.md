# Poetically Sense (Working title, play on "poetic license")


![frontend|Vue](https://img.shields.io/badge/frontend-Vue-42b983.svg) ![backend|Koa](https://img.shields.io/badge/backend-Koa-000000.svg) ![database|Mongo](https://img.shields.io/badge/database-Mongo-33cc33.svg)

### Introduction

With the advent of the Internet, poetry is more accessible now than ever. With its extensive accessibility, however,  comes paradox of choice. Every last person has a form or style of poetry that they would enjoy, but it would take a concentrated effort for them to sort through the variations, authors, topics, et cetera that exist. 

### What It Is

This web application is a poetry aggregate that suggests poems to users based on their preferences. Users are able to like or dislike each poem, altering the site's future recommendations. The recommendation will be generated using a **neural network**.

### Necessary Features 
- User Profiles: Sign Up, Log In, Settings, Preferences
- Poetry Database: Robust poem JSON with author, title, content, tags, style, form...
- Standardized NN Input: Method to rate poems based on a variety of factors that will be compressed down into readable data for the NN
- Functioning NN: The neural network at the heart of this should have a success rate (determined by whether the user likes the recommended poem) of 70% or higher at the time of project completion 

### Desired/Possible Features
- Curated poetry collections
- User poem submission
- Dictionary/Thesaurus hinting for difficult/rare words or on request
- Typing interface so users may type through poems: Must detect keystrokes and apply them appropriately ***User's hands must not leave keyboard post log-in**
- Comprehensive typing statistics and lessons
- Random button to ignore user preferences
- Share this poem: enter an email to send a link to the current poem. The page should show just that poem and offer the recipient a chance to register to see more poems. Social media share links could also be provided (preferably not)
- Monetization: This should only be implemented if the user-base is significant enough to generate revenue that could be used to practically benefit the site. This app's structure seems to be suited for a subscription model or donations. No non-literary advertisements (essentially, this will not be a cash cow in any universe so it should not be treated like one) 
- Publication Collaboration: Magazines, online publications, publishing houses, et cetera could provide poems to support the site's content in exchange for links to their sites/book sellers. "This poem was provided by XXXXXX, read more from them at XXXXXX." This should not interrupt the flow of the site
 
### Frontend 

Vue is lightweight and relatively new to me (and the industry), so it is the ideal candidate for this project's frontend and my learning potential.
   
### Backend 

I have never used Koa, but it was recommended to me as being a simple backend framework that works great for small scale applications. This app will not have a complex backend as the majority of heavy listing will take place within the NN. 

### Neural Network

I plan on building my NN using Keras and Tensorflow (Keras is now integrated into Tensorflow). Apparently, Keras has a simpler user interface that machine learning beginners (me) should benefit from. If I need any of Tensorflow's advanced methods, I can simply use Tensorflow code anywhere within my Keras code (really, it's the other way around). One walkthrough I followed used TensorFlow exclusively and I was able to (mostly) follow the logic. I will use that as a model where applicable: [TensorFlow Basics, US Census Data Example](https://youtu.be/E8n_k6HNAgs) 

### General Design and UX

Upon visiting the site for the first time, user will be asked to provide an email address and password to register. They will then be presented with a list of poems and asked whether they enjoy them. They may also be surveyed on general poetry preferences. This will create an initial profile from which the NN can work. If this ends up being a bad read, the NN should be able to self correct over time, but the longer it takes to understand the user, the worse.

For the first iteration, the page that displays when a user is signed in should always contain nothing but the poem being read and the preference interaction elements (like, dislike). There should be no page-to-page navigation whatsoever- only one view. This means that the decision point resolution of like/dislike should immediately show the next poem without redirection. This likely means that a healthy recommended poem queue should be loaded for the user to provide snappy load time. For example, when viewing a poem the next five suggestions should be loaded. During that time, the user's newest preference reads will not affect the loaded queue. This is acceptable, but the number of poems in the queue should be calibrated with this in mind. 

There should be an expandable user settings option in the primary nav, but the UI should be incredibly simple and streamlined. The goal is to provide poetry, not build a cool web interface. Other options should include features from the *Desired/Possible Features* list if they are implemented. Maybe a "How it works" page about machine learning.  

Font choice is imperative. The CSS should be configured such that later on the font can be selected from a list of curated options. For now, a simple, practical font should be used like Roboto. No serifs, cursive, or fantastical fonts. It should almost certainly be monospace to allow for standardized display of the poems.

