/* pattern to be used to reduce efforts in case nothing is listening to an event
 could also be using EmitterListener.js */

export { weatherForecastEvent, acitveDataProvider };
import Emitter from "../event-e3.js";

const weatherForecastEvent = Symbol();
const acitveDataProvider = Emitter({});

acitveDataProvider.provideWeather = () => {
    let result = {};
    // ...

    acitveDataProvider.emit(weatherForecastEvent, result);
};

setInterval(() => {
    if (acitveDataProvider.hasListeners(weatherForecastEvent)) {
        // has at least 1 listener
        acitveDataProvider.provideWeather();
    }
    // else no worth the effort, as nothing is listening
}, 1000)