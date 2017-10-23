# Chapter 4: Security Insight 

## Learning Goal
After finishing this chapter, you should have a basic understanding on how security and authentication work in the SAP Cloud Platform Cloud Foundry Environment and of some libraries that support you in developing secure applications.

## Prerequisite
You performed the previous chapter.


## Step 1: Download the needed libraries and push.
Perform the following commands:
```
cd myApp
npm install
cd ..
cf push
```

Test by accessing the URL: `https://<URL for the app router>/hw/users` as described in the previous chapter.  

## Step 2: Check the JSON Web Token (JWT).
Check the output of the `logJWT()` function by calling `cf logs sapcpcfhw --recent`.  
You may see info about your user and the JWT token. For more information about JWT and for a Web app to decode it, see [here](https://jwt.io/).  
Note that browsing the application `https://<URL for your app>/users` still works, as already pointed out in the previous chapter.  

## Step 3: Protect the application.
Remove the comment marks in the 3 lines containing `passport`-related code in `myApp/server.js`, and perform the following command:
```
cf push
```
Browsing the application `https://<URL for your app>/users` returns a `401 Unauthorized`. That is, the 3 lines ensure that only authenticated calls (using the application router) reach the application.  
If you browse again `https://<URL for the app router>/hw/users` the call will work, and if you check the logs `cf logs sapcpcfhw --recent` you'll see also information about the SecurityContext Object provided by the [XSSec](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.02/en-US/54513272339246049bf438a03a8095e4.html#loio54513272339246049bf438a03a8095e4__section_atx_2vt_vt) library.

