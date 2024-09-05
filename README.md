# Social Media Application README

=====================================

## Overview

This is a social media application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to follow each other, post photos, get newsfeed, like posts, comment on them, get follow suggestions, and update their details.

## Technologies Used

### Frontend

- React

### Backend

- Node.js with Express

### Database

- MongoDB

### Other

- Mongoose for MongoDB ORM

## Database Schema

### Users Collection

| Field Name     | Data Type | Description                                      |
| -------------- | --------- | ------------------------------------------------ | --------------------- | --- |
| \_id           | ObjectId  | Unique user ID                                   |
| username       | String    | Username chosen by the user                      |
| email          | String    | Email address of the user                        |
| password       | String    | Password of the user (hashed)                    |
| name           | String    | Full name of the user                            |
| profilePicture | String    | URL of the user's profile picture                |
| <!--           | bio       | String                                           | Short bio of the user | --> |
| createdAt      | Date      | Timestamp when the user account was created      |
| updatedAt      | Date      | Timestamp when the user account was last updated |

### Posts Collection

| Field Name | Data Type | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| \_id       | ObjectId  | Unique post ID                               |
| userId     | ObjectId  | Foreign key referencing the Users collection |
| caption    | String    | Caption of the post                          |
| imageUrl   | String    | URL of the post image                        |
| createdAt  | Date      | Timestamp when the post was created          |
| updatedAt  | Date      | Timestamp when the post was last updated     |

### Comments Collection

| Field Name | Data Type | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| \_id       | ObjectId  | Unique comment ID                            |
| postId     | ObjectId  | Foreign key referencing the Posts collection |
| userId     | ObjectId  | Foreign key referencing the Users collection |
| comment    | String    | Comment text                                 |
| createdAt  | Date      | Timestamp when the comment was created       |
| updatedAt  | Date      | Timestamp when the comment was last updated  |

### Likes Collection

| Field Name | Data Type | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| \_id       | ObjectId  | Unique like ID                               |
| postId     | ObjectId  | Foreign key referencing the Posts collection |
| userId     | ObjectId  | Foreign key referencing the Users collection |
| createdAt  | Date      | Timestamp when the like was created          |

### Follows Collection

| Field Name | Data Type | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| \_id       | ObjectId  | Unique follow ID                             |
| userId     | ObjectId  | Foreign key referencing the Users collection |
| followeeId | ObjectId  | Foreign key referencing the Users collection |
| createdAt  | Date      | Timestamp when the follow was created        |

## API Endpoints

### User Endpoints

#### Create a new user account

`POST /api/users`

- Request Body: `username`, `email`, `password`
- Response: `201 Created` with the newly created user object

<!-- #### Get a user's profile information
`GET /api/users/{id}`

* Response: `200 OK` with the user object

#### Update a user's profile information
`PUT /api/users/{id}`

* Request Body: `username`, `email`, `password`, `name`, `profilePicture`, `bio`
* Response: `200 OK` with the updated user object

#### Delete a user account
`DELETE /api/users/{id}`

* Response: `204 No Content`

### Post Endpoints

#### Create a new post
`POST /api/posts`

* Request Body: , `imageUrl`
* Response: `201 Created` with the newly created post object

#### Get a post's information
`GET /api/posts/{id}`

* Response: `200 OK` with the post object

#### Update a post's information
`PUT /api/posts/{id}`

* Request Body: `caption`, `imageUrl`
* Response: `200 OK` with the updated post object

#### Delete a post
`DELETE /api/posts/{id}`

* Response: `204 No Content`

### Comment Endpoints

#### Create a new comment
`POST /api/comments`

* Request Body: `postId`, `comment`
* Response: `201 Created` with the newly created comment object

#### Get a comment's information
`GET /api/comments/{id}`

* Response: `200 OK` with the comment object -->
