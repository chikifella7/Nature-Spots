# Project Name
BasedNature 
<br>



## Description

Search platform for nature spots around the globe and creating the favorite list of spots.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add favorite spots to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of nature spots.
- **nature spots listing** - As a user I want to see more details of the spot.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, country, city}                                 |
| `DELETE`   | `/private/favorites/:natureId`      | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/nature-spots`                     | Renders `nature-spots-list` view.                              |                                                          |
| `GET`      | `/private/nature-spots/details/:id`         | Renders `nature-spots-details` view for the particular nature spot details. |                                                          |
| `POST`     | `/private/favorites/reviews`        | Private route. Adds a new review for the current user.     |
| `GET`      | `/nature-spots/recommended`                     | Renders a recommended nature spots by crontributors.|






## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
  reviews: [String]
}

```



Favorites model

```javascript
{
  placeId: String,
}

```



<br>

## API's


<br>


## Packages
Express

Mongoose

Hbs

.env

cloudinary

ironlauncher




<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
FirstName LastName - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

FirstName LastName - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)
