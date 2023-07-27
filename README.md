# RouteWeatherFrontend
React frontend app that calls the RouteWeather API to provide weather information for a given route. Using the manifest.json file, this can be deployed as a Google Chrome extension.

Current version of app provides an interface where user can input origin and destination information, and will be returned a list of waypoints along that route, along with the forecasted weather at each of those points. That forecasted weather for each location is based on the predicted time the user would reach that town/city, if they were to leave immediately. This information is pulled from my RouteWeatherAPI (https://github.com/ihemmige/RouteWeatherAPI).

While this UI does allow for a user to see the forecasted weather along a route accurate to the time they are likely to be in each city, its key shortcoming is that weather is not overlaid directly on a map. As a result, the user isn't able to say, pick an alternate route and compare different routes based on weather. In the next version of this extension/UI, I will work to solve this problem.

Note: <br>
The RouteWeather API (which this app gets its route/weather information from) is hosted as a free instance on Microsoft Azure, so spins down with inactivity. As a result, when request is made to the API from this app when it has spun down, it takes an extra minute or so to spin up and provide that first response. This is NOT a bug or malfunction.
