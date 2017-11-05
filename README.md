# CapMetrocket
## WebSocket implementation of CapMetro's realtime service tracker

## Development

- Ensure you have `node` v8.9+ and `npm` installed.
- Clone repo.
- Run `npm install`.
- To start the server locally on port 8080, run `npm start` from the project root.
- To test the WebSocket call, start the server and navigate to the [example](localhost:8080/example) page in your browser. You should see data related to the 7 and 550 lines in both your browser window and browser console.
- Visit [localhost:8080](localhost:8080) for more information about the service.
- Tests are written with [Ava](https://github.com/ava/ava). Before adding unit tests, make sure you aren't just exercising module code or third-party libraries.
- Committing will run a series of checks before completing, including linting & testing.

### Deploying

- Get your changes into the `master` branch. NB: the branch is protected, so no force-pushing.
- Log into Heroku from the command line: `heroku login`.
- Deploy with `npm run deploy` from `master`. To deploy changes from another branch, run `git push heroku OTHER-BRANCH:master`.
- Inspect the server response with `heroku logs --tail`.

## 🚌  Roadmap 🚌

- [x] Socket connection serving static JSON: [branch](https://github.com/chrisbodhi/cap-metrocket/tree/implement-ws)
- [x] Call to CapMetro for current data: [branch](https://github.com/chrisbodhi/cap-metrocket/tree/get-live-data)
- [x] Repeat call to CapMetro every x seconds, sending fresh data to client: [branch](https://github.com/chrisbodhi/cap-metrocket/tree/call-cap-metro)
- [x] Add Express server for getting query params + responding to static HTTP requests: [branch](https://github.com/chrisbodhi/cap-metrocket/tree/add-express-server)
- [x] Filter data returned by route number. [branch](https://github.com/chrisbodhi/cap-metrocket/tree/filter-response)
- [x] Deploy to server on Heroku. [branch](https://github.com/chrisbodhi/cap-metrocket/tree/deploy-to-heroku)

## Working with the Service

For the 7 and 10 bus lines, and 550 train line (example response recorded when 550 was not running).

_Abbreviated Client Code_

```
const conn = new WebSocket("ws://localhost:8080?routes=7,10,550");
conn.onmessage = (evt) => {
    console.log(JSON.parse(evt.data));
}
```

_Abbreviated Response_

```
{
  "7": [
    {
      "trip": {
        "trip_id": "1832275",
        "start_time": "12:55:00",
        "start_date": "20171105",
        "schedule_relationship": 0,
        "route_id": "7"
      },
      "position": {
        "latitude": 30.27339,
        "longitude": -97.74345,
        "bearing": 15,
        "odometer": 0,
        "speed": 7.59968
      },
      "current_stop_sequence": 0,
      "current_status": 2,
      "timestamp": 1509911145,
      "congestion_level": 0,
      "stop_id": "864",
      "vehicle": {
        "id": "2061",
        "label": "2061",
        "license_plate": " "
      }
    },
    ...
  ],
  "10": [
    {
      "trip": {
        "trip_id": "1822171",
        "start_time": "12:25:00",
        "start_date": "20171105",
        "schedule_relationship": 0,
        "route_id": "10"
      },
      "position": {
        "latitude": 30.2008171,
        "longitude": -97.78553,
        "bearing": 210,
        "odometer": 0,
        "speed": 6.25856
      },
      "current_stop_sequence": 0,
      "current_status": 2,
      "timestamp": 1509911172,
      "congestion_level": 0,
      "stop_id": "4397",
      "vehicle": {
        "id": "2067",
        "label": "2067",
        "license_plate": " "
      }
    },
    ...
  ],
  "550": []
}
```
