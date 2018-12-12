### Plan for Data Collection

After exploring other examples, it seems like the simplest form NN data can take is several attributes followed by one binary classification. The TensorFlow walk-through that I followed used US census data (age, gender, race, etc) to predict whether a given individual's income was >$50K or <$50K. 

The analogy to my use case would be using data on how much a given person likes different aspects of poetry based on previous likes (form, author, style, era, etc) to predict whether they would like one poem. The alternative, to further remove human ideas from the classification and fully make use of the NN methodology, I could simply present the NN with a certain number of poems that the user likes or dislikes and have it predict based on that whether the user would enjoy a poem of unknown preference. This would be the simplest solution as it require only the plain text of poems, but it would be of questionable efficiency and validity. 

Thus, I will try both (if possible) and determine which is more effective and sustainable. 

Given these requirements, the data I would need to collect would need to meet the following conditions:

1. Substantial per-reader sample size: Each person would need at least 10 poems that they either like or dislike. Hopefully, it will not matter if they like or dislike every poem as the NN should still be able to use this information to its advantage. 
2. Vast reader demographics: This should diversify the NN and avoid any heavy biases.
3. Substantial number of readers: The more reader preferences to learn from, the better. 
4. Follow-up email with suggested poems: I am not sure about this, but I feel as though the initial data will be far more valuable with definitive litmus test. Plus, it could increase engagement with these vital users. At the same time, asking for email addresses should not be taken lightly.

This very much feels like it will be a shot in the dark given my limited understanding and the number of variables involved. Regardless, the results should be enough to either legitimize my project or encourage me to change course. 

As for the data collection itself, I wonder if I could get away with using a survey website. I probably could, but given that I need to build a front end anyway, now is as good of a time as any to get started. It does not need to be pretty, but I would want it to signify that this project is not half-hearted or a waste of time. 