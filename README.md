# Chapter 3: Prepare authentication for Node.js RESTful API.

## Learning Goal
After finishing this chapter, you should have a setup that allows you to enable authentication for your RESTful API. You'll gain basic knowledge about [User Identity Management on SAP Cloud Platform](https://blogs.sap.com/2017/05/16/user-identity-management-on-sap-cloud-platform/), you'll learn about [Application Router](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/01c5f9ba7d6847aaaf069d153b981b51.html) and how to use it to [Secure Node.js Applications](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/3a8e4372f8e74d05b4ed03a484865e08.html).

## Prerequisite
You performed the previous chapter.


## Step 1: Create the needed service instances.
Perform the following commands:
```
cf create-service application-logs lite sapcpcfhw-al
cf create-service xsuaa application sapcpcfhw-uaa -c security/xs-security.json
```

## Step 2: Download the app router.
Download the application router using the following commands:
```
cd myApp
npm install
cd ../appRouter
npm install
cd ..
```

## Step 3: Push.
Perform the following command:
```
cf push
```
Check the output and note down the `URL` for the AppRouter.  
If you get any naming conflicts, please adjust all the occurrences of `sapcpcfhw` in the manifest.yml to some unique strings, except for the entries in the `services` categories. These must remain stable, as you already created service instances using those names.
Look up the value in the `urls` field when you push the application, and write down the URL for your application.

## Step 4: Test.
Browse: `https://<URL for the app router>/hw/users`. You'll be asked to log in; Use the e-mail address and the password you  use to access your SAP Cloud Platform [account](https://account.hanatrial.ondemand.com/).  
If you want to also test changing operations using the `Postman` extension, follow this procedure:
1. Start `Postman`, and switch the `Postman Interceptor` on.
2. Browse `https://<URL for the app router>/hw/users`, and log in if prompted.
3. Note down the `<URL for the app router>` as you'll have to use it in all the activities below.
4. Fetch a CSRF token, using the appropriate template `GET_Fetch_CSRF` in the Postman collection `Cloud_AppRouter`. For more information on CSRF in AppRouter, see this [document](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/c19f165084d742e096c5d1625cecd2d4.html#loioc19f165084d742e096c5d1625cecd2d4__section_xj4_pcg_2z). Remember to use the host name you noted down above.
5. Check the headers in the Response of the call above and write down the value for `x-csrf-token`.
6. Paste the CSRF token value in the appropriate field in the header of any of the change operations: POST, PUT, DELETE, adjust the URL using the `<URL for the app router>` and perform the call.  

__Note__: Please note that it is still possible to access your application without authentication, as described in the previous chapter, performing calls to `https://<URL for your app>/users`, where `<URL for your app>` is the one you noted down after checking the output of the `cf push` operation above. For information on how to protect this kind of access, see the next chapters.

