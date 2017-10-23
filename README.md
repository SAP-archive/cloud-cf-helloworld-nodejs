# Chapter 2: Node.js RESTful API persists data in PostgreSQL DB

## Learning Goal
After finishing this chapter, you should have a Node.js RESTful API that persists data in a PostgreSQL DB.

## Prerequisite
You performed the previous chapter.


## Step 1: Create the PostgreSQL service instance.
Perform the following command:
```
cf create-service postgresql v9.4-dev sapcpcfhw-db
```
For more information about this command, see the [documentation](https://docs.cloudfoundry.org/devguide/services/managing-services.html).


## Step 3: Push to Cloud and run the service.
In the folder you cloned into, execute the `npm install` command.  
Then perform the following command:
```
cf push --random-route
```
For more information about this command, see the [documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html).  
Check the output of this command, and write down the URL created for the application.  
As a result you should be able to browse `https://<URL for your app>/users`.  
Import the new version of the `Postman` collection, and replace `<host>` with the allocated `<URL for your app>` in the URL.

