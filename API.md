FORMAT: 1A

# PushItBE

PushIT is a simple API that returns data for workout records for users.

# Group Users

Resources related to users in the API.

## Users Collection [/users]

### Create a user [POST /]

Creating a new user requires the request payload

+ Request (application/json)

    + Body

        ```json
        {
          "username": "Build"
        }
        ```

+ Response 201 (application/json)

    ```json
    {
      "id": 3,
      "username": "Build"
    }
    ```

### List All Users [GET /] - Authenticated

+ Response 200 (application/json)

    ```json
    [
        {
            "id": 1,
            "username": "Swifty",
        }, {
            "id": 2,
            "username": "Moody"
        }
    ]
    ```

### Get a user stats [GET /<user_id>] - Authenticated

Creating a new user requires the request payload

+ Response 200 (application/json)

    ```json
    {
        "pushups": {
          "week_avg": 23,
          "week_total: 0,
          "cumulative_avg": 34,
          "week_diff_percent": -2
        },
        "squats": {
          "week_avg": 23,
          "week_total: 0,
          "cumulative_avg": 34,
          "week_diff_percent": -2
        }
    }
    ```

## WorkoutTYpe Collection [/workoutType] - Authenticated

### Record a workout [POST /]

+ Payload

```json
    {
      "type": "Squats"
    }
```

+ Response 201

 ```json
    {
      "id": 3,
      "type": "Squats"
    }
    ```


## Workout Collection [/workout] - Authenticated

### Record a workout [POST /]

+ Payload

```json
    {
      "type": "Squats",
      "count": 20,
      "rep_no": 1
    }
```

+ Response 200


### Get workout stats [GET /] - Authenticated

Get stats for workouts

+ Query (optional)

    type=Squats
    from="12/11/1887"
    to="12/11/2017"

+ Response 201 (application/json)

```json
{
  "Squats": {
    "distribution": [20, 60, 20],
    "wow_avg": 34,
    "no_of_users": 45,
    "avg_attendance": 23,
    "LeaderBoard": [
        {
          id: 1, username: "Swifty"
        },
        {
          id: 2, username: "Moody"
        },
        {
          id: 3, username: "Tester"
        }
    ]
  }
}
```