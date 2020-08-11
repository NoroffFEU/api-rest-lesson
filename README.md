# REST API Lesson

### `GET /animals`  
Making a GET request to this endpoint will return an array with objects for each animal currently stored in the database.

_Example response of a GET request to /animals_
```json
[
    {
        "id": 1,
        "name": "Molly",
        "type": "dog",
        "color": "white",
        "legs": "4",
        "gender": "female"
    },
    {
        "id": 2,
        "name": "Chloe",
        "type": "pig",
        "color": "white",
        "legs": "4",
        "gender": "female"
    },
    {
        "id": 3,
        "name": "Buddy",
        "type": "chicken",
        "color": "white",
        "legs": "2",
        "gender": "male"
    }
]
```
### `GET /animals/:id`  
Making a GET request to this endpoint will return only the animal you specified in the id parameter. For example, `GET /animals/2` will return the animal with id 2 from the database.  

_Example response of a GET request to /animals/2_
```json
[
    {
        "id": 2,
        "name": "Chloe",
        "type": "pig",
        "color": "white",
        "legs": "4",
        "gender": "female"
    }
]
```
### `POST /animals`  
Making a POST request to this endpoint will create a new animal and save it in the database. You will need to include an object containing all keys with their respective values.  

_Example body of a POST request to /animals_
```json
{
    "name": "Mister",
    "type": "cat",
    "color": "brown",
    "legs": "4",
    "gender": "male"
}
```
### `PUT /animals/:id`  
Making a PUT request to this endpoint will update an animal in the database. PUT requests require you to include all keys with their respective values, even if that value isn't being updated.  

_Example body of a PUT request to /animals/1 - Changing type to cat._
```json
{
    "name": "Molly",
    "type": "cat",
    "color": "white",
    "legs": "4",
    "gender": "female"
}
```
### `DELETE /animals/:id`  
Making a DELETE request to this endpoint will delete the animal with that id from the database.

_Example response of a DELETE request to /animals/3_
```json
{
    "message": "Animal deleted from database"
}
```
