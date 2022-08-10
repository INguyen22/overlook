# Overlook

# Introduction
- this project was the final project for Mod 2 students to individually demonstrate their understanding of asynchronous JavaScript and how to use fetch calls to retrieve data from a web api by making a hotel website. In addition, test driven developement was used to develope the classes and methods.

## Table of Contents
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Application in action](#application-in-action)
  - [Deployed Page](#deployed-page)
  - [Possible Future Extensions](#possible-future-extensions)
  - [Set Up](#set-up)
  - [Contributors](#contributors)
  - [Project Specs](#project-specs)

## Technologies
- Mocha and Chai
- JavaScript
- HTML
- CSS

## features
- This website allows users to login with their respectable username ranging from 'customer1' to 'customer50' and a password of 'overlook2021'
- upon logging in as a customer, the user will be able to see all the reservations they've made in the past and any upcoming ones as well. 
- The user can select a date on which they want to make a reservation and filter the availble rooms by room type.
- the user can book a reservation and see that new reservation appear in their past and upcoming reservations section. 
- The user will be able to see how much they've spent on past and upcoming bookings and they expenses will update with every new booking that they've made
- The user can logout and log back in as a different user
- Users may also log in as a manager with the following credentials: username:'manager', password: 'overlook2021'
- As a manager, the user can see their hotel's revenue, occupied rooms, and available rooms for the day.
- the manager can find their clients with their first and last name and see what bookings that client has made so far.
- The manager can find reservations for a user and add it to the clients upcoming and past reservation list
- The manager can aslo delete reservations from a user but not any reservations from the past. 

## Application in Action
![client-in-action](https://user-images.githubusercontent.com/100492419/183787593-f1eea4dc-1b81-4f39-83c5-8854761171ae.gif)
![manager-in-action](https://user-images.githubusercontent.com/100492419/183787700-d5bfb45a-9647-42f3-a366-79273feec6e4.gif)
![Screen Shot 2022-08-09 at 7 02 56 PM](https://user-images.githubusercontent.com/100492419/183787782-3597f0c2-bdbf-476a-bc7f-3039dfc8362c.png)
![Screen Shot 2022-08-09 at 7 03 22 PM](https://user-images.githubusercontent.com/100492419/183787825-1be4c498-d76b-4068-a345-fec274cf2b93.png)
![Screen Shot 2022-08-09 at 7 04 25 PM](https://user-images.githubusercontent.com/100492419/183787929-322f0ae0-e700-4f87-b423-8d384b516637.png)

## Challenges
- working sround asynchronous Javascript to update the DOM
## Possible Future Extentions
- Allow the users to delete reservations they may not want on their own
- Have revervations have more details to them, such as, pictures or views
- Have the passowrd the user types in be hidden 
## Contributors
  - [Ivy Nguyen](https://github.com/INguyen22)
## Project Specs
  The spec for this project can be found [here](https://frontend.turing.edu/projects/overlook.html).

## Set Up
To access the application locally:
- Clone this repository to your local machine
- Type `cd` into the application
- Run `npm install` to run the local serve to see the HTML page
- Paste `http://localhost:8080/` into your browser to view the HTML page
- When you would like to stop running the local server, press control + c in your terminal
- To view tests, run `npm test`
- In addition to cloning down this application's repo, you will also need to clone down this [repository](https://github.com/turingschool-examples/overlook-api) in your terminal to have this server running in addition to the one above.
- Once cloned, run `npm install` and `npm start`

## Deployed Page

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
