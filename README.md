# Chapter 6: Authorization - Runtime Checks

## Learning Goal
After finishing this chapter, you should know how to extend the static checks implemented in the previous chapter by coded checks executed during runtime to ensure that only authorized users execute a certain routine.  
This is relevant if the scope check done by the app router should be extended by checks in the application itself. For example, if a more granular scope check is needed. In this example, we assume that `Display` scope is no longer sufficient to get details on one particular user, but that for this operation `Update` scope is needed.

## Prerequisite
You performed the previous chapter.


## Step 1: Prepare the configuration and test before push.

In the [SAP Cloud Platform cockpit](https://account.hanatrial.ondemand.com/), choose `<own Trial account>` -> trial Subaccount -> Security -> Trust configuration -> SAP ID Service, enter your e-mail address in the "User" field, and choose "Show Assignments".  
Delete the assignment to `ManagerRC`, and add an assignment to `ViewerRC`.  
Restart the browser, and then open `https://<URL for the app router>/hw/users`. After you logged in, the result should be displayed.  
Open `https://<URL for the app router>/hw/users/<id of a user>`. This should also work.

## Step2: Push and test again.
Perform the following command:
```
cf push
```
Restart the browser, and then open `https://<URL for the app router>/hw/users`. After you logged in, the result should be displayed.  
Open `https://<URL for the app router>/hw/users/<id of a user>`. This is no longer working, and the log (`cf logs sapcpcfhw --recent`) contains the error message `Missing the expected scope`. This error message is produced by an additional check in `myApp/server.js`.


