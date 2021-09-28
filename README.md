# Code along IRONHACK SÃO PAULO WDPT 50

This is a RESTful API exercise presented as a challenge and then, as requested, a Code Along as an example resolution for the class on 27/Out/2021.

---

[LAB express rooms with reviews](https://github.com/ironhack-sao-wdft/lab-express-rooms-with-reviews)

---

## FEATURES:

- Create users;
- Login users;
- Authorized users can create, see, update and delete rooms and reviews.

---

## TECHNOLOGIES:

IronRooms server uses:

- nodejs;
- express;
- json web token;
- bcryptjs.

---

## USAGE:

Online: [API IronRooms](https://api-ironrooms.herokuapp.com/)

-or-

Local:

- clone this repo;
- `npm i`;
- set your environment variables with:

```
PORT=         // use the one you prefer
DB_URI=       // your local mongoDB storage or AtlasDB
SECRET_JWT=   // your own secret
```

- Use `npm start` (node) or `npm run dev` (nodemon) to start application at:

```
http://localhost:<PORT>
```

---

## Endpoints:

| METHOD | ENDPOINT¹         | PAYLOAD²                         | RESPONSE        | ACTION                                                                            |
| ------ | ----------------- | -------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| POST   | /auth/signup      | { username², password² }         | { message }     | Creates a user in DB                                                              |
| POST   | /auth/login       | { username², password² }         | { user, token } | Creates a token for the user to access private routes                             |
| POST   | /review/:roomId   | { comment² }                     | { review }      | Creates a review linked to the user and room. Users cannot review their own rooms |
| GET    | /review/:roomId   | -                                | [ { review } ]  | Get all reviews from a room                                                       |
| PUT    | /review/:reviewId | { comment }                      | { review }      | Updates a review made by the user                                                 |
| DELETE | /review           | -                                | { message }     | Deletes a review                                                                  |
| POST   | /room             | { name², description, imageUrl } | { room }        | Creates a room linked to the user                                                 |
| GET    | /room/all         | -                                | [{ room }]      | Get all rooms from DB                                                             |
| GET    | /room/:roomId     | -                                | { room }        | Get a room by the id with reviews populated                                       |
| GET    | /room/user        | -                                | [{ room }]      | Get all rooms created by the user                                                 |
| PUT    | /room/:roomId     | { name, description, imageUrl }  | { room }        | Updates a room name, description or imageUrl                                      |
| DELETE | /room/:roomId     | -                                | { message }     | Deletes a room and all reviews linked to it                                       |

¹: all endpoints except the ones starting with `/auth` need to use a token (bearer) authorization header.

²: required field.

### Payload fields:

All fields presented are Strings

### Response fields:

```javascript
message: String;

user: {
  id: String,
  username: String
};

token: String;

review: {
  _id: ObjectId,
  comment: String,
  roomId: ObjectId,
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
};

room: {
  _id: ObjectId,
  name: String,
  description: String,
  imageUrl: String,
  reviews: [ ObjectId ],
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
};
```
