<!-- {% raw %} -->
<img src="https://i.imgur.com/RWixB90.png">

# Intro to Django

## Road Map

1. What is Django?
2. Django's MVT Architecture
3. Components of a Django Project
4. Django's Routing Methodology
5. Installation & Set Up
6. Further Reading

## 1. What is Django?

Django is one of the most popular Python-based web frameworks and its popularity continues to grow, thanks to the amazing growth of Python itself.

Django was publicly released in 2005 and got its name from one of its creators, Adrian Holovaty, who named Django after his favorite guitarist: [Django Reinhardt](https://en.wikipedia.org/wiki/Django_Reinhardt).

It's designed for the rapid development of highly-secure web applications.

Compared to the minimalist web framework of Express, Django is a much higher-level framework that provides lots of functionality baked-in, including:

- A powerful Object-Relational-Mapper (ORM) for working with relational databases using Python code instead of SQL.
- A built-in admin app for browsing and manipulating data in the database.
- Built-in user management and authentication.

## 2. Django's MVT Architecture

Django's architecture is similar, but different than that of MVC:

<img src="./mvt-pattern.png">

This chart compares MVC to Django's MVT:

| Concern | MVC | Django<br>MVT |
|---|:-:|:-:|
| Database access | Model | Model |
| Code mapped to routes | Controller | View |
| Rendering of dynamic HTML | View | Template |

When developing with Django, we'll just have to be careful to say:

- **view** instead of **controller**, and
- **template** instead of **view**

MVC and MVT are all related to the MV* family of design patterns. These patterns emphasize separating presentation concerns(UI), application processing concerns, and data management concerns. They also have a wide variety of acronyms and are usually only differentiated by small details and marginal philosophical differences between framework developers. Some common MV* patterns are MVC(model, view, controller), MVVM(model, view, view model), MPV(model, view, presenter) and many others. MVT is just another one of the many patterns modeled after MV*.

Why did they call it MVT if it's basically MVC?

- If you'd like to read more on this topic, checkout this clarification provided by the Django team here: [Why did they call it MVT if it's basically MVC?](https://docs.djangoproject.com/en/dev/faq/general/#django-appears-to-be-a-mvc-framework-but-you-call-the-controller-the-view-and-the-view-the-template-how-come-you-don-t-use-the-standard-names).

## 3. Components of a Django Project

This diagram visually outlines the relationships between the different components of a Django project:

<img src="https://i.imgur.com/1fFg7lz.png">

The quirky thing about Django is how it names its high-level components.

What we think of as a web **application**, Django calls a **project**.

Furthermore, what we think of as part of an app's functionality (or **modules**), Django refers to as **apps**.

A Django _project_ can have many _apps_, and a Django _app_ can belong to multiple _projects_. More on this later.

## 4. Django's Routing Methodology

Because routing is so fundamental to developing web apps, it's worthwhile to know (in advance) an important difference between Express and Django's routing methodology. 

Web frameworks such as Express and Ruby on Rails, use both the *HTTP verb & URL* to define routes used to map requests to controller actions.

Other frameworks, such as Django and ASP.NET Core, use *just the URL* when defining a route, ignoring the HTTP verb.

That's why the Python modules used to define routes in Django are named **urls.py** (see diagram above).

## 5. Installation & Set Up

### Prerequisite Installs

To manage Django and its dependencies effectively, we'll utilize pipenv. While there are alternatives like Docker for containerization, Python's built-in venv, or third-party tools like virtualenvwrapper, pipenv offers a balanced blend of simplicity and functionality for our purposes. 

Pipenv is a handy tool that automatically creates and manages a virtual environment for your projects. It also manages dependencies, adding or removing packages in your Pipfile as you install or uninstall them.

#### Installing Pipenv on macOS

If you don't have Pipenv installed on your macOS system, you can install it using Homebrew with this command:
```
brew install pipenv
```

#### Setting Up Your Project:

First, navigate to the directory where you plan to create your project. Then, use the following command to initiate a virtual environment and create a Pipfile:

```
pipenv shell
```

You'll notice a change in your terminal prompt indicating that you're now working inside your virtual environment. To exit, type exit or press CTRL-D.

#### Installing Django

With your virtual environment activated, install Django by typing:

```
pipenv install django
```

Let's verify the installation by typing `django-admin` and pressing enter in terminal. You should receive output similar to the following:

```
Type 'django-admin help <subcommand>' for help on a specific subcommand.

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver
Note that only Django core commands are listed as settings are not
properly configured (error: Requested setting INSTALLED_APPS, but
settings are not configured. You must either define the environment
variable DJANGO_SETTINGS_MODULE or call settings.configure() before
accessing settings.).
```

By default, Django uses a lightweight database called SQLite. However, SQLite is not appropriate for production use because it's considered *not to be scalable* (for example, only one user/request can access the database at a time).

Therefore, from the start we'll be following the better practice of using a more capable database by configuring each of our Django projects to work with PostgreSQL.

To use PostgreSQL, we need to install the **psycopg2** Python package:

```
pipenv install psycopg2-binary
```

[`psycopg2`](https://wiki.postgresql.org/wiki/Psycopg) is a popular library that enables Python applications to interface with PostgreSQL.

Now, you're all set to start working with Django!

### Using `django-admin` to create our Django Project

Django includes a `django-admin` command that we can use to quickly start a project template.

Run the command (including the `.` at the end): `django-admin startproject nyc_subway . `. Your directory should look like this:
```
.
├── nyc_subway
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── Pipfile
```

It should *not* look like this:
```
.
├── nyc_subway
│   ├── nyc_subway
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── manage.py
└── Pipfile
```

If it looks like the second example, you ran the command wrong. Make sure you ran `django-admin startproject nyc_subway . ` with the `.` at the end. Delete the directory and start over.

#### Start the Server

Our Django project has create a file called `manage.py`! The `manage.py` script contains a lot of management commands for Django. You can see a list of the commands `manage.py` offers by typing `python manage.py`.

We can run `python manage.py runserver` to start the server. We can run this right now to check that our project runs without errors. For now it will load a nice homepage and not do much else.


### Setting Up Postgresql

By default Django uses SQLite. We'll be using Postgresql instead. Make sure that our database is up and running with `brew services list`, then run the following SQL script:


```sql
-- Create the database
CREATE DATABASE nyc_subway;

-- Create an admin user for our app to use
CREATE USER nyc_subway_admin WITH PASSWORD 'password';

-- Give that user permissins to manage the database:
GRANT ALL PRIVILEGES ON DATABASE nyc_subway TO nyc_subway_admin;
```

Edit the `nyc_subway/stettings.py` file to include the database configuration:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nyc_subway',
        'USER': 'nyc_subway_admin',
        'PASSWORD': 'password',
        'HOST': 'localhost'
    }
}
```

Run `python manage.py runserver` to confirm our Django project connects to our database without errors.


### Using `django-admin` to create our Django App

A Django *project* is composed of many *apps*. Our `nyc_subway` project directory is the base of the Django project where we'll handle our base routes, project-level configurations and include our apps. We'll make a `subway` app where we will write our models.

Per the Django documentation...
> What’s the difference between a project and an app? An app is a web application that does something – e.g., a blog system, a database of public records or a small poll app. A project is a collection of configuration and apps for a particular website. A project can contain multiple apps. An app can be in multiple projects.

Create the app with `django-admin startapp subway`. (Note there's no `.` at the end this time). 

Then, update `nyc_subway/settings.py` to include `'subway'` in the list of `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'subway'
]
```

Directory:
```
.
├── nyc_subway
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── subway
│   ├── migrations
│   │   └── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── manage.py
└── Pipfile
```


### Running Our First Migration

If you look at the list of `INSTALLED_APPS` you can see that there are automatically some pre-made Django apps that include user-based authentication. In order for our application to run we need to have a `user` table and more in our database. In order to update our database we'll run a *migration*.

#### Create & run migrations:
```
python manage.py makemigrations
python manage.py migrate
```

Use `psql` to look at your `nyc_subway` database. What tables have been added?

Whenever we make changes to our Django application that will require changes to the database (such as new tables or column changes) we will need to create and run a migration. 

### Creating Our First Model

First, let's plan our models using an ERD diagram.

We'll have three models:
 - Subway Trains
 - Subway Lines
 - Subway Stations

What are the relationships between the trains, lines and stations?

Our train models will have the following fields:
  - Model
  - Car Count
  - Line

Our line models will have the following:
  - Name
  - Color
  - Stations

Our stations will have the following:
  - Name
  - Lines

![UML Diagram](./train-station-erd.svg)

```python
# subway/models.py

class Station(models.Model):
  name = models.CharField(max_length=120)

  def __str__(self):
    return self.name

class Line(models.Model):
  name = models.CharField(max_length=4)
  hex_color = models.CharField(max_length=6)
  stations = models.ManyToManyField(Station)

  def __str__(self):
    return self.name

class Train(models.Model):
  name = models.CharField(max_length=5)
  cbtc_enabled = models.BooleanField()
  line = models.ForeignKey(Line, on_delete=models.CASCADE, related_name='trains')

  def __str__(self):
    return self.name

```

## The Admin Panel (where the magic happens)

We're going to make our first user that can log into our website: `python manage.py createsuperuser`

Call the user "admin", the email is optional and you can ignore the password warnings.

Next, we're going to add our models to the admin panel. Update `subway/admin.py`:
```python
from django.contrib import admin
from .models import Train, Line, Station

admin.site.register(Train)
admin.site.register(Line)
admin.site.register(Station)
```

Next, go to `http://localhost:8000/admin` and log in. Magic!

## 6. Further Reading

### Code the Django Official Tutorial App

Django, in so many words, is a beast! Its documentation is hundreds of times larger than that of Express.

A great way to get started learning it is by following the official Django tutorial.  It's an excellent tutorial and we'll be getting a lot of information straight from *the horse's mouth*!

Rest assured that we'll be diving deeper into the Django topics touched upon during the tutorial.

Let's get started by clicking [here](https://docs.djangoproject.com/en/4.1/intro/tutorial01/)!

Work on the tutorial through Part 4.

**Don't** complete any parts of the tutorial **after** Part 4.

[Link to Final Tutorial Code](https://git.generalassemb.ly/SEB-Base-Curriculum/django-tutorial-final-code)

### References

[Django Homepage](https://www.djangoproject.com/)
<!-- {% endraw %} -->
