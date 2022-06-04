# Framework to determine the context of data based on domain ontologies

Framework that seeks to give context to relational databases by making use of domain ontologies. With the objective of achieving a graphic interface that makes the process easy, we create a [React](https://facebook.github.io/react/) application that communicates with a backend in [Django](https://www.djangoproject.com/), through a REST API.

![Alt text](/frontend/src/assets/final_mapping_example.png?raw=true "Example")

# Requirements

Make sure you have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

# Architecture

The application currently consists of a React web app with a Django+DjangoRestFramework backend serving a RESTful API. The whole system is backed up by a Postgres DB.

## Installation

Clone this repository

```shell
$ git clone https://github.com/ssantiacevedo/proyecto-grado.git app
```

## Running

This command will pull the required Docker images, create the necessary containers and install the dependencies for each service.

```shell
$ docker-compose build
```

To initialize the DB schema, run.

```shell
$ docker-compose run django python manage.py migrate
```

Bring containers up.

```shell
$ docker-compose up
```

There should now be two servers running:

- [http://localhost:8000](http://localhost:8000) is the Django app
- [http://localhost:3000](http://127.0.0.1:3000) is the React app

Bring containers down.

```shell
$ docker-compose down
```

## Administrative Dashboard

The administrative interface, or admin for short, allows trusted site administrators to create, edit and publish content, manage users, and perform other administrative tasks.

To create a Super User in the Django admin, run

```shell
$ docker-compose run django python manage.py createsuperuser
```

Finally, access the URL [http://localhost:8000/admin](http://localhost:8000/admin) and complete the log in form

## User guide

A guide on how to interact with the application will be presented.
For this guide, a flow of a use case that uses an ontology and a database that represent the reality of a University will be used.

The application has a login/register screen that allows users to create different accounts and use them as profiles. The screen is as follows.

![Alt text](/frontend/src/assets/login.png?raw=true "Login/Register Page")

Once the session with a user is started, they will find a dashboard where they see all the mappings associated with their user. Here you can load a previously created mapping and modify it, or create a mapping from scratch.

![Alt text](/frontend/src/assets/dashboard.png?raw=true "Dashboard Page")

By selecting the option to create a mapping from scratch, the user will see a screen where they can load the ontologies to give context, as well as the connection to the Postgres database. In case an existing process is chosen, the fields will be automatically completed with the saved information. Ontologies can be uploaded from `.owl` files as well as by their URI. It is also necessary to set a number in the field: `Steps to iterate` to specify how much context you want to give the data. Finally, you must enter a name that identifies the mapping.

![Alt text](/frontend/src/assets/upload_data.png?raw=true "Upload Data Page")

Once the ontologies and the connection to the database have been loaded, the application obtains the elements of each of these to present them to the user.

Each mapping is done in steps, to start with a mapping you have to select the `Add new mapping` button, then you have to select an element from the database and finally one or more elements of the loaded ontologies. At the end of the mapping of the corresponding database element, the `Confirm mapping` button must be selected.

![Alt text](/frontend/src/assets/intermediate_mapping1.png?raw=true "Intermediate mapping step 1")

![Alt text](/frontend/src/assets/intermediate_mapping2.png?raw=true "Intermediate mapping step 2")

One possible action by the user on this screen is to view the ontologies that were uploaded on the previous screen. Ontologies are displayed in graph form, so mapping is easier to perform. For this, the `Show ontology graph` button must be selected, which is below the name of each ontology. Then it will be displayed as follows:

![Alt text](/frontend/src/assets/ontology_graph.png?raw=true "Ontology Graph")

Once all the mappings that the user considers necessary to obtain their context have been added, they can confirm and send them by selecting the `Submit your mappings` button.

A process with several mappings looks like this:

![Alt text](/frontend/src/assets/final_mapping_process.png?raw=true "Mapping Process")

Here, if all the mappings are valid, the user will be redirected to the screen where the generated context by an ontology will be shown. Otherwise, if there is any mapping that does not comply with the defined rules, an alert will be displayed where the details of the error will be specified. Rules can be checked by selecting the `Rules` button, which is found in the upper right hand corner of the screen.

The final screen of the flow allows the user to view the generated context, identifying the originally mapped elements and gives the user the possibility to download the ontology as a `.owl` file. The generated graph offers the possibility of reorganizing the elements.

Taking into account the mappings previously shown, the generated context is the following:

![Alt text](/frontend/src/assets/generated_context.png?raw=true "Generated Context")

It should be noted that the RDF graph shown on the screen, due to limitations in the Owlready2 library, not all the data properties are shown. This is because the library recognizes only some types of Data Property ranges. However, the generated .owl file does contain them.

As previously mentioned, the context generated in the form of an ontology can be downloaded by selecting the `Dowlnload` button.
