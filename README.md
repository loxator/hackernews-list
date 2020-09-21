# HackerNews Clone

This project is a clone of the HackerNews frontpage which provides a list of Top/Best/New stories:

- Stories - A container element which diplays a list of <Story/> components
- Story - A component which renders the metadata into a readable Card format

---

## Installation

Running `yarn start` will install all dependencies and start the development server at `http://localhost:3000`

---

## Test
Running `yarn test` will start the unit tests which picks up any files ending with suffix `.test.js`

---

## Source Folder Structure

- Components - Collection of resuable components to be used easily throughout the application
- Scenes - A scene represents a screen in the app made from predefined or new components bundled together
- services - Folder which houses an APIService to make asynchronous calls, could also house DataBaseService in the future
- static - Contains the global theme object
- requests - server calls which hit the API and retrieve data
---
