# Chapter 5: Authorization - Static Checks and Configuration

## Learning Goal
After finishing this chapter, you should be able to protect your application to only grant access to authorized users. That is, you'll learn about roles and how to configure them for the end users so they can execute some (or all) operations.

## Prerequisite
You performed the previous chapter.


## Step 1: Clean up and redo the security-related preparation.
To apply the changes performed in the file `security/xs-security.json`, perform the following commands:
```
cf unbind-service sapcpcfhw sapcpcfhw-uaa
cf unbind-service sapcpcfhwapr sapcpcfhw-uaa
cf delete-service sapcpcfhw-uaa -f
cf create-service xsuaa application sapcpcfhw-uaa -c security/xs-security.json
```
If you renamed all the occurrences of `sapcpcfhw` in the `manifest.yml` to some unique strings, as indicated in a previous chapter, make sure that you replace the application names also in the commands above (that is, the 2nd parameters `sapcpcfhw` and `sapcpcfhwapr` in the first 2 commands, respectively) with the unique names you defined in the manifest.yml.  
Finally, when everything is set up, perform the following command:
```eMail
cf push
```

## Step 2: Initial test.
Browsing the application `https://<URL for your app>/users` still returns a `401 Unauthorized`.  
Browsing `https://<URL for the app router>/hw/users` will return a `403 Forbidden`.  
The reason is that the application router only forwards those calls to the application that come from users who are authorized to send calls. For more information, see the `appRouter/xs-app.json` and `security/xs-security.json` files.  

## Step 3: Configure permissions.
Go to the [SAP Cloud Platform cockpit](https://account.hanatrial.ondemand.com/) -> `<own Trial account>` -> trial Subaccount -> Security -> Role Collections, and create 2 role collections: `ViewerRC` and `ManagerRC`.  
Add the role `Viewer` of your application to `ViewerRC` and the role `Manager` to `ManagerRC`.  
In the [SAP Cloud Platform cockpit](https://account.hanatrial.ondemand.com/), choose `<own Trial account>` -> trial Subaccount -> Security -> Trust configuration -> SAP ID Service, and then enter your e-mail address in the "User" field. While "Show Assignments" displays no data, add `ViewerRC` using the "Add Assignment" button.

## Step 4: Test again - only GET operations should work.
Restart the browser, and then open `https://<URL for the app router>/hw/users`. After you logged in, the result should be displayed.  
Try to perform a "change" operation, by considering the CSRF token, as explained in the previous chapter. This will return a `403 Forbidden`, as the test user has the role `Viewer`, that is, the scope `Display`, but not the scope `Update` (contained in the role `Manager`).

## Step 5: Enable change operations and test.

In the [SAP Cloud Platform cockpit](https://account.hanatrial.ondemand.com/), choose `<own Trial account>` -> trial Subaccount -> Security -> Trust configuration -> SAP ID Service, and the enter your e-mail address in the "User" field and choose "Show Assignments".  
Delete the assignment to `ViewerRC`, and then add an assignment to `ManagerRC`.  
Restart the browser, and then open `https://<URL for the app router>/hw/users`. After you logged in, try to perform in Postman a "change" operation, by considering the CSRF token, as explained in the previous chapter. This will work as expected.


