# ![MongoDB Atlas Setup Lab - Exercise](./assets/hero.png)

Welcome to the MongoDB Atlas Setup Lab! In this lab, we will guide you through setting up a MongoDB Atlas account, which is essential for creating and managing non-relational databases. MongoDB Atlas is a leading service for hosting MongoDB databases, offering robust features and an intuitive interface for database management.

This exercise is divided into several steps, starting with account creation, then database deployment, security configuration, and finally, obtaining the connection string for your applications. Each step is clearly outlined with screenshots and detailed instructions to ensure a smooth setup experience. By the end of this lab, you will have a fully functional MongoDB Atlas account and the knowledge to deploy and manage databases effectively for your projects.

Let's get started!

## Create an Atlas account

Not surprisingly, the most popular service for hosting MongoDB databases is MongoDB's own [Atlas](https://www.mongodb.com/atlas/database). We'll use it to host all of our MongoDB databases in class.

First, you will need to sign up for a free account [here](https://www.mongodb.com/cloud/atlas/register).

![The MongoDB Atlas Sign up page.](./assets/atlas-sign-up.png)

As seen in the image above, you will have two different options to sign up:

1. Click Sign up with Google (***blue highlighted button***)
2. Enter the required information which includes providing an email and a password (***red highlighted inputs and button***)

It is important that you choose only ***one*** of the following two options to proceed:

### Option 1: Sign up ***WITH*** Google

Click the **Sign up with Google** button.

Read the Terms of Service and Privacy Policy, then agree to them.

Select the **Submit** button.

![The MongoDB Atlas privacy policy and terms of service acceptance page.](./assets/google-tos.png)

Proceed to the **Welcome to Atlas** section below.

### Option 2: Sign up ***WITHOUT*** Google

1. Provide the required information (Company is not required). You should store the email address and password you provide somewhere easily accessible and secure (like a password manager).
2. Read the Terms of Service and Privacy Policy, then agree to them.
3. Finally select the **Create your Atlas acount** option.

If you created an account with an email and password, you'll be taken to a page asking you to verify your email, as shown below.

![The MongoDB Atlas email verification page.](./assets/email-verification.png)

1. Find the email from MongoDB in your inbox and verify your email.
2. After you've verified your email, you'll be taken to a page informing you that you've successfully verified your email and a **Continue** button.
3. Click the **Continue** button.

Proceed to the **Welcome to Atlas** section below.

## Welcome to Atlas

1. Answer the marketing questions however you'd like. Some suggestions are shown below, but your selections do not matter and do not impact your experience.
2. Select the **Finish** button when you're done.

![The MongoDB Atlas Welcome to Atlas page. The fields have been prefilled with data, matching the SEB use case, but this information is not important](./assets/marketing.png)

## Deploy your database

It's time to set up the cluster! Clusters are MongoDB's way of collecting your databases all in one place.

1. Select the **M0** option, which is ***FREE***.
2. Select **AWS** as the Provider, and select the **Region** closest to your job market.
3. Name your cluster whatever you want, but know that this name cannot be changed later. We recommend something simple like `student-cluster`. 
4. Ensure that the text directly above the **Create** button says **FREE**.
5. ***Do not select the*** **Create** ***button unless this text says*** **FREE**. If it has a dollar amount, review your selections and ensure you have correctly configured the service from this page.
6. Finally, select the **Create** button.

![The MongoDB Atlas Deploy your database page.](./assets/aws.png)

## Security quickstart

Next, you will be taken to a ***Security Quickstart*** page. There will be a message at the bottom left stating that the database cluster is being provisioned and the approximate time it will take to complete.

While the cluster is provisioned, create a **database user** (*different from your account user*) by following the steps in the **How would you like to authenticate your connection?** section.

### Creating a database user

1. Select a **username** and **password**. Do not use the same password shown in the image below. The username and password must be alphanumeric. They cannot contain any characters that are not English letters or numbers. Do not use special characters of any kind, including spaces.
2. Feel free to use the **Autogenerate Secure Password** option if you would like or use the default selections; it will only build passwords that meet this constraint. 
3. *Pause* - After creating your username and password, save them in a secure yet accessible place, such as a password manager. Use the **Copy** button provided to copy your password accurately. You'll need to access these details shortly. The credentials you've just created will be incorporated into a *connection string* - a crucial element for connecting your applications to the database.
4. After you have selected a username and password, select the **Create User** button.

![The first step of the MongoDB Atlas Security Quickstart page.](./assets/security-quickstart-1.png)

#### After creating a database user

The page should look something like this after you have the above step:

![The completed first step of the MongoDB Atlas Security Quickstart page.](./assets/security-quickstart-1-complete.png)

### Specifying access from anywhere

Scroll down to the second step: **Where would you like to connect from?**

1. In the IP Address field, enter the text **`0.0.0.0/0`** exactly as shown here.
2. In the description, write `Anywhere`.
3. Then click the **Add Entry** button.

> ❗️ IMPORTANT: This is ***NOT*** a suitable setting in a production environment and means that your database can be accessed from any device with the correct username and password combination. We use this setting to ensure you can easily develop and deploy to aid your educational experience. For this reason (among others), it is imperative that you not store personally identifying information (phone numbers, addresses, credit card numbers or details, insurance identification, your lucky numbers, and so on) in your database.

![The second step of the MongoDB Atlas Security Quickstart page.](./assets/security-quickstart-2.png)

#### After specifying access from anywhere

The page should look like this after the above step.

You may receive an email from MongoDB Atlas with a subject of **You've added "Allow access from anywhere (0.0.0.0/0)" to your Network Permission List**. This is normal and is ok!

Select the **Finish and Close** button and then the **Go to Overview** button in the pop-up.

![The completed second step of the MongoDB Atlas Security Quickstart page.](./assets/security-quickstart-2-complete.png)

## Obtain the Connection String

A connection string is a line of text that specifies the necessary parameters to establish a secure connection to a database. It includes critical information such as the database's location, username, and password. This string is essential for your application to communicate with the database.

> ❗️ **IMPORTANT:** Database connection strings contain the username and password for connecting to the database. ***NEVER*** include the connection string in the project's source code - use a `.env` file to secure this sensitive information.

1. Once you arrive on the **Overview** page, click the **Connect** button as shown below:

![The MongoDB Atlas Overview page.](./assets/atlas-overview.png)

2. Select the only option under the **Connect to your application** header, **Drivers**:

![The connection methods provided by MongoDB Atlas.](./assets/connection-method.png)

3. Click the **copy** button to add the connection string to your clipboard. You do not need to do anything else on this page.

![The grand prize! A first-class one-way ticket to Albuquerque. No actually, a MongoDB Atlas connection string. Sorry for getting your hopes up.](./assets/connection-string.png)

## Use the connection string in your app

> ❗️ Please do not attempt to use any of the connection strings below; they will not function in your applications.

We're almost done, but you'll need to make a couple of changes in your connection string before it can be used:

1. **Add Password:** Replace `<password>` (including the `<` and the `>`) with the password of the database user you created earlier.

    For example, using the password `my2Tacos`, a properly formatted connection string would look like this:

    ```bash
    mongodb+srv://student:my2Tacos@student-cluster.uwdsn12.mongodb.net/?retryWrites=true&w=majority
    ```

2. **Add Database Name:** It is important to note that the connection string does not include a database name by default. You'll need to add an appropriate database name between the `/` and `?` part of the connection string for each project. For example, if you have a project named `my-project`, you could give the database the same name:

    ```bash
    mongodb+srv://student:my2Tacos@student-cluster.uwdsn12.mongodb.net/my-project?retryWrites=true&w=majority
    ```

3. With your password and database name added, your connection string is now ready to use. 

4. Paste the connection string into your application's `.env` file, assigning it to a **MONGODB_URI** environment variable.

    As an example:

    ```bash
    MONGODB_URI=mongodb+srv://student:my2Tacos@student-cluster.uwdsn12.mongodb.net/my-project?retryWrites=true&w=majority
    ```

> ❗️ **If you do not have an application built yet, paste your connection string somewhere safe on your computer for future use.**

## Reusing the connection string for multiple projects

The database connection string you've created can be used for various projects. Remember to securely store this string for easy access in the future.

When using the same connection string for different projects, replace the database name within the string. For instance:

For a flights app, the string might be:
```bash
mongodb+srv://student:my2Tacos@student-cluster.uwdsn12.mongodb.net/flights?retryWrites=true&w=majority
```

For a tacos app, it could be:
```bash
mongodb+srv://student:my2Tacos@student-cluster.uwdsn12.mongodb.net/tacos?retryWrites=true&w=majority
```

**The only change needed is the database name, which is the text between the `/` and `?` in the connection string.**

## Viewing and editing data

You can use Atlas to view and edit data by clicking on the **Browse Collections** button on the **Database Deployments** page, as shown below.

MongoDB also maintains an application called Compass that lets you browse your data on Atlas with just your connection string. You can download Compass [here](https://www.mongodb.com/try/download/compass).

![Accessing data stored in your databases from within Atlas.](./assets/browse-collections.png)

Congrats, you are now ready to create databases in MongoDB Atlas! 🎉
