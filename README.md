# Code along IRONHACK SÃO PAULO WDPT 50

**[ LAB ]**: https://github.com/ironhack-sao-wdft/lab-express-rooms-with-reviews

---

## FEATURES:

- Create users;
- Login users;
- Authorized users can create, see, update and delete rooms and reviews.

---

## TECH:

IronRooms server uses:

- nodejs;
- express;
- json web token;
- bcryptjs;

---

## USAGE:

Online: `https://api-ironrooms.herokuapp.com/`

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

- Use `npm start` or `npm run dev` to start application at:

```
http:localhost:<PORT>
```

---

## Endpoints:

| METHOD | ENDPOINT¹         | PAYLOAD                          | RESPONSE        | ACTION                                                                            |
| ------ | ----------------- | -------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| POST   | /auth/signup      | { username², password² }         | { message }     | Creates a user in DB                                                              |
| POST   | /auth/login       | { username², password² }         | { user, token } | Creates a token for the user to access private routes                             |
| POST   | /room             | { name², description, imageUrl } | { room }        | Creates a room linked to the user                                                 |
| GET    | /room/all         | -                                | [{ room }]      | Get all rooms from DB                                                             |
| GET    | /room/:roomId     | -                                | { room }        | Get a room by the id with reviews populated                                       |
| GET    | /room/user        | -                                | [{ room }]      | Get all rooms created by the user                                                 |
| PUT    | /room/:roomId     | { name, description, imageUrl }  | { room }        | Updates a room name, description or imageUrl                                      |
| DELETE | /room/:roomId     | -                                | { message }     | Deletes a room and all reviews linked to it                                       |
| POST   | /review/:roomId   | { comment² }                     | { review }      | Creates a review linked to the user and room. Users cannot review their own rooms |
| GET    | /review/:roomId   | -                                | [ { review } ]  | Get all reviews from a room                                                       |
| PUT    | /review/:reviewId | { comment }                      | { review }      | Updates a review made by the user                                                 |
| DELETE | /review           | -                                | { message }     | Deletes a review                                                                  |

¹: all endpoints except the ones starting with `/auth` need to use a token (bearer) authorization header.

²: required field.
