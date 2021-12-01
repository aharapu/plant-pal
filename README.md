# Research journal

This project is an exploration of different web technologies. Unlike a conventional readme, this file contains
notes made along this journey.

---

## Initial setup

The repo was initialized inside of github and then cloned to my local machine. I added React using **create-react-app**
and used the **typescript** flag as well. Then proceeded to add **Grommet** as the UI dependecy of choice.

```cli
npx create-react-app . --template typescript
npm install grommet grommet-icons styled-components --save
```

To familiarize myself with using Grommet i followed the [tutorial](https://github.com/grommet/grommet-starter-new-app) found on their github.

For ease of formatting, prettier was introduced in the IDE and a `.prettierrc.json` file was created.

For linting, **ESLint** was initialized using **npx eslin --init**<br />
Attempted to use airbnb rules, but certain conflicts and eslint errors prevented it.

Added **React Router 6** and established some very basic navigation.

---

## Development notes

### Grommet forms

Grommet forms seem to somehow "communicate" with the form elements that they hold. As it appears, in order to have controlled inputs, a single state object is all that is required, and the only handler is an onChange handler, passed to the Form element itself.

### Setting up authentication

1. **Firebase** was chosen as the SAAS of choice for authentication and data management. My private google account ( al\*\*@gmail.com ) was used for setting up. A new project called **PlantPal** ( firebase id is _pp-plant-pal_ ) was created in the [console](https://console.firebase.google.com/). Additionally, analytics was turned on with region "Romania".
1. Instructions found in the [firebase docs](https://firebase.google.com/docs/web/setup) were used to add an app.
