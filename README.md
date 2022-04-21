# Timer Service

Simple compact timer functionality that can:
- Start and reset the timer;
- Pause and continue the timer at any time.

## Properties

The timer input object has the following structure:

```json
{
  "format": "string"
}
```

- In the `format` property, you can pass any timer conversion format that is supported by the [moment.js](https://momentjs.com/) package.
- In addition to the formatting properties of this package, you are given the option to specify a `timestamp` property that will return a `timestamp` without any formatting of the output value.

The default `format` property is `HH:mm:ss` (hours:minutes:seconds).

## Initialization & Usage

Component initialization is as simple as possible.

```javascript
const timer = new Timer();
```

As well as the methods that will be briefly described below to demonstrate the work:

## Start timer

To start the timer, you need input data that will meet the requirements - it must be in the format of seconds or a timestamp.

```javascript
const timer = new Timer();

// Start timer in 3 minutes
timer.start(180);
// And the same timer but in timestamp entry
timer.start(moment().unix() + 180);
```

After the timer has started, you can keep track of it thanks to the `output` property, which is described below.

## Output timer data

As the timer runs, the property will output its formatted data. If the timer has become invalid for some reason or its time has expired, then the property will be equal to false.

```javascript
// Output timer data: 00:03:00...
timer.output();
```

## Pause & Continue

You can pause the timer, but not clear it completely, then continue from where it stopped.

```javascript
// Pause timer
timer.pause();

// Continue timer from stopped point
timer.continue();
```

## Stop

This method is recommended for both explicitly resetting the timer and clearing `setInterval`, for example, in frameworks when removing a component that uses a timer to avoid saving a reference to it.

```javascript
// Timer data & setInterval clear
timer.clear();
```
