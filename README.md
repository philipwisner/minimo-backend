# Minimo

<div style="text-align:center; height: 200px;"><img src ="http://philipwisner.com/images/minimo-line.svg" /></div>

>"A minimalist blogging and thought capturing platform"

<br/>

## Introduction
Minimo was created as my final project for the Ironhack Full Stack Web Development Bootcamp in Barcelona I was tasked to create a MEAN stack app that had at least 3 data models. I couldn't really think of a unique idea, but I knew I wanted a place that I could write blogs but also individual posts. Basically I wanted to create Medium but with a blog feature. I knew that this could have at least 3 data models and could be completed in 2 weeks. And so minimo was born.

<br/>

## Demo
* See minimo live [here](https://minimo.herokuapp.com/home)
* Take a look at the frontend code [here](https://github.com/philipwisner/minimo-frontend)

<br/>

## Development
I am a very visual developer, I like to have a basic wireframe ready along with all my user stories and data models defined before I start coding. I spent the weekend before our final project defining my data models relations and user stories. I was able to have zero redundancy in my database. Everything is linked by userId, so I am never saving something twice. Then based off of that I spent the entire first day creating my wireframes which you can check out 
[here](http://philipwisner.com/images/Minimo%20Mobile.pdf).

Then I spent almost all of the second day battling Angular. I was familiar with creating an Express app with Node and MongoDB but now I had to strip back all of the excess that is generated for an express app and do everything with Angular. Since we learned Angular in just a few days, it was a struggle creating the frontend app and the backend app and then having them interface. I would generate components in the wrong area, I would mess up names. I wound up deleting the entire Angular app multiple times. By then end of the day I had them both up and running and communicating.

The next two days I was working on just the login/signup authorization. Using passport when it was just an express app was super easy for me, I had it working in less than a hour, but Angular was not having it. It took two days of troubleshooting and writing additional functions, along with lots of googling to finally get it working. 

I then fifinishedff the week and weekend creating most of the pages and components needed for minimo based off the user stories, but there wasn't much functionality yet.

I started off the final week adding all the functionality to minimo, starting with the settings page and main profile page. After that was done, I worked on adding posts to the profile. The next day I worked on creating blogs and then being able to add posts to blogs. It was at this point I had too spend some time sorting the posts to only show posts that don't belong to a blog. I had most of the major features working by Wednesday of the second week, but there was still a lot of bugs. So I spent most of that day fixing all the bugs and errors, and then at the end of the day added to photo upload ability, which took a while to get working. Then on Thursday our internal presentation day, I decided to add a global feed to the app, which of course added more bugs so I had to leave it pretty bare.

We then presented our apps to our class. You can see my presentation [here](http://slides.com/philipwisner/minimo/fullscreen#/). After that was over I spent all night just cleaning up my code, I had so much unnecessary stuff and duplicated code. I then started to cleanup the styling and layout bebecauset was very basic at this point. Then the next morning we presented to the judges and that was it.

Want to read more about the creation of minimo or my Ironhack experience, checkout my blog at [philipwisner.com](http://philipwisner.com/pages/blogs/ironhack.html) 

<br/>

## Built with
* [Angular](https://angular.io/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Sass](http://sass-lang.com/)
* Prototyping done with [Adobe Xd](http://www.adobe.com/products/xd.html)

<br/>

## To-do
* Be able to see other users profiles
* Be able to edit/delete posts & blogs
* Be able to sort posts by recent or oldest
* Allow user to change their profile color
* Make the Read More button only show up on long posts, and expand each post individually.
* Add Route Guards
* Add way to format text, add pictures and links
* Optimize the adding post/creating blog process
* Have feed show usernames instead of Id
* Be able to follow profiles
* Be able to like/comment on posts

