# showAllView

Component takes care of showing all the swimming halls of the database. It also offers the buttons for updating and deleting swimming halls. Retrieves the data from Admin through swimhalls array

## Props

<!-- @vuese:showAllView:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|swimhalls|swimhalls - An array of swimhall objects containing their infomation, fetched in Admin component|`Array`|`false`|-|

<!-- @vuese:showAllView:props:end -->


## Events

<!-- @vuese:showAllView:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|editHall|-|-|
|delete:swimhall|-|-|

<!-- @vuese:showAllView:events:end -->


## Methods

<!-- @vuese:showAllView:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|modifyHall|Offers the data of selected swimming hall for the updateView form by emitting the data of the chosen swimming hall to Admin component. Admin component conveys the data to updateView for showing it in the update form with hall Object.|-|
|deleteHall|Deletes the chosen swimming hall. Sends the index of the removable hall to the api using http delete request.|-|

<!-- @vuese:showAllView:methods:end -->


