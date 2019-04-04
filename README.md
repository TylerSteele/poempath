![Logo](https://github.com/SteeleTyler/poempath/blob/master/client/public/logo.png)

# [poempath.com](https://poempath.com)

![Vue](https://img.shields.io/badge/Frontend-Vue-41b883.svg)
![Koa](https://img.shields.io/badge/Backend-Koa-5fd3d1.svg)
![Mongo](https://img.shields.io/badge/DB-Mongo-13aa52.svg)

Web application that displays poetry in a readable format and offers suggestions based on the user's preferences with the help of an open-source [recommendation engine](https://github.com/guymorita/recommendationRaccoon).

## Features 

#### Front End

- Secure user sign-up and log-in
- Clean, component-based design primed for reusability and future development
- Powerful state management with VueX
- Mostly responsive design for mobile and desktop
- Neat styling with [Quasar](https://quasar-framework.org/) 

#### Back End

- Lightweight, bare-bones api with [Koa.js](https://koajs.com/) 
- Lightning-fast recommendations from [Recommendation Raccoon](https://github.com/guymorita/recommendationRaccoon) (it uses redis :sunglasses:)
- Easy data access and manipulation with [MongoDB](https://www.mongodb.com/)
