
<img src="https://i.imgur.com/Y74xxoD.jpg" width="100%">

# Mongoose "Flights" Lab - Part 1

## Intro

Today in the Intro to Mongoose lesson you Created and Read documents using a `Movie` Model.

In this lab, you'll do the same, except you'll create and use a `Flight` model.

You'll begin by creating a `mongoose-flights` project.

FYI, future lessons will expand upon the `mongoose-movies` project, and the labs will expand upon the `mongoose-flights` project!

#### The final version of `mongoose-flights` (parts 1 thru 3 combined) will be a deliverable, so do each part and don't fall behind.

## Exercises

1. Refer to the **_Express Routers and Controllers_** lesson as necessary on how to use Express Generator to set up a new Express project named **mongoose-flights**.

    > Hint: Don't forget the `-e` option to ensure that EJS templating is configured.

2. Be sure to install the Node modules after you `cd` into the project.

3. Rename **app.js** to **server.js** and make the necessary change inside of `bin/www`.

4. Install the `dotenv` module and

    ```js
    // server.js

    var logger = require('morgan');
    // Add the line below
    require('dotenv').config();
    ```

5. Create a **.env** file in the root of the project file.

6. Copy your `DATABASE_URL=...` from your **.env** file in `mongoose-movies` and change the name of the database to something like `flights`.

7. Create a **config/database.js** module that connects to a database.

8. Be sure to require the **config/database.js** AFTER `dotenv` in **server.js**.

9. Verify that starting the Express server with `nodemon` console.logs out a successful connection to the database.

10. Set up partial templates.

    > Hint:  Reference the **_EJS Partial Templates_** lesson as needed.

11. Create a `Flight` Model with the following properties:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `airline`| `String`| `enum` to include 'American', 'Southwest' & 'United'<br>(or your choices) | n/a | 
	| `airport`| `String`| `enum` to include<br>'AUS', 'DFW', 'DEN', 'LAX' & 'SAN'<br>(or your choices) | 'DEN'<br>(or your choice) |
	| `flightNo`| `Number`| Required<br>Between `10` and `9999` | n/a | 
	| `departs`| `Date`| n/a | One year from date created | 

12. Implement the following User Stories:
	- AAU, I want to view a list of all flights (`index` functionality) that displays each flight's airline, airport, flight no., and departure date/time (consider formatting the `departs` property).
	
	- AAU, I want to create flights by entering the information on a page (`new` functionality) that has a form and submitting it.

	- AAU, I want to be able to access each view via a navigation bar at the top of the page with links to:
		- `ALL FLIGHTS`, and
		- `ADD FLIGHT`

#### Hints:

- Checkout the [`<input type="datetime-local">`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) to assist users in entering valid date/time values.

- In the form for adding a new Flight, use a `<select name="airport">` to assign the flight's `airport`. Since they don't change, it's okay to hard-code the `<option>` elements, e.g., `<option value="DEN" selected>`. Same for the `airline` property (use a `<select>`).

## Bonuses

1. Display the default departure date when displaying the new flight form.

	Hints:
	1. In the flight controller's `new` action, you could create an in-memory flight like this:<br>`const newFlight = new Flight();`<br>  This in-memory flight doc would have the default departure date set properly based on the logic in the function you assigned to `default`.
	2. Just like any other data you want to access/display in a view template, that data needs to be passed by the controller action when it calls `res.render`, however…
	3. Although an input of `type="datetime-local"` will display a date assigned to its `value` attribute, that date value needs to be formatted as a string matching this format: `yyyy-MM-ddThh:mm` (yes, a “T” character is used to separate the date portion from the time portion).  One way of obtaining the properly formatted string is to use the following approach:<br>

```js
const newFlight = new Flight();
// Obtain the default date
const dt = newFlight.departs;
// Format the date for the value attribute of the input
let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
res.render('flights/new', { departsDate });
```

2. Code these additional User Stories:
	- AAU, I want to view the list of flights by departure date in ascending order.
	
	- AAU, I want the flights in the list to be displayed using red text if the flight's departure date has passed.

3. Style the `index` and `new` views.

## Deliverable?

### The final version of `mongoose-flights` (parts 1 thru 3 combined) will be a deliverable - don't fall behind.

Please create a repo named `mongoose-flights` and commit your code.

> Hint:  Reference the **_My Dev Skills - Part 1 Lab_** or the Project 1 Getting Started instructions as needed for help with creating a personal GH repo, etc.

After Part 3 of the lab is completed submit the link to the repo as directed.