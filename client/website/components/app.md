# app

App component

## Methods

<!-- @vuese:app:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|login|Fires when user clicks corresponding button. Authenticates user by sending http post request to api that compares user input to credentials(environment variables) given in local .env file User is authenticated if api responds with "ACCEPTED", and vue router renders Admin component(s) Creates toasts according to user input that read "access denied" or "login successful"|-|
|setAuthToFalse|Sets user authentication flag to false when moving from admin page|-|

<!-- @vuese:app:methods:end -->


