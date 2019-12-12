# SearchResultView

Component handles showing swimming pool search results, and the logic for displaying pool information and comments.

## Props

<!-- @vuese:SearchResultView:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|searchResult|searchResult - Contains information on the swimming pools. Receives the grouped object emitted from searchView by searchResult|`Object`|`false`|-|
|latestSearchType|latestSearchType - The most recent type of search, emitted from SearchView|`String`|`false`|-|

<!-- @vuese:SearchResultView:props:end -->


## Methods

<!-- @vuese:SearchResultView:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|updatePoolIndex|Updates the index of swimming pool array the user clicks. The pool information and comments are hidden if user clicks the same index twice|index - list item index the user clicked|
|updateCurrentCity|Updates the current city based on the location where the pool that user has clicked. Prevents displaying pool information from other cities with the same pool index.|name - name of the city|
|updateCurrentPool|Updates the pool that user has clicked, used to show corresponding comments|pool - pool that user has clicked|
|helper|Helper function that fires when user clicks a pool in the displayed pool array. Contains functions tha|pool - pool object from the pool list user has clicked index - index from the pool list user has clicked name - city name|
|sendComment|Fires when user clicks the corresponding button. Sends user comment string to api using http post request. Respond contains set of pool objects with updated comments|-|

<!-- @vuese:SearchResultView:methods:end -->


## Watch

<!-- @vuese:SearchResultView:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|searchResult|Fires when searchResult prop is changed. Sets comment section visibility to false, and resets current user clicked pool to empty. Sets searchResult prop to variable so it can be mutated.|-|

<!-- @vuese:SearchResultView:watch:end -->


