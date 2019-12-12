# updateView

## Props

<!-- @vuese:updateView:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|hall|-|`Object`|`false`|-|

<!-- @vuese:updateView:props:end -->


## Events

<!-- @vuese:updateView:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:swimhall|-|-|

<!-- @vuese:updateView:events:end -->


## Methods

<!-- @vuese:updateView:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|updateSwimhall|Takes the form data when form is submitted. Sends this update data to api using a http put request. After the send method empties the form.|-|

<!-- @vuese:updateView:methods:end -->


## Watch

<!-- @vuese:updateView:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|hall|Watcher brings information of the selected swimming hall to the update form when hall object from Admin changes i.e. when user selects another swimming hall to update in showAllView.|-|

<!-- @vuese:updateView:watch:end -->


