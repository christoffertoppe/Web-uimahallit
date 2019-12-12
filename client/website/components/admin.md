# admin

Component that holds showAllView, addView and updateView

## Methods

<!-- @vuese:admin:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getSwimHalls|Retrieves all the data from the swimming hall database and inserts it into swimhalls array to be shown in the showAllView table.|-|
|transferHall|Sets the swimming hall to be updated from the list of showAllView to the update form of the updateView. Also notifies the watcher when another hall from the list has been selected.|hall - swimming hall object that was chosen with showAllView's update button|
|addHall|Notifies the watcher when new swimming hall has been added in addView.|-|
|deleteHall|Notifies the watcher when swimming hall has been deleted in showAllView.|-|
|updateHall|Notifies the watcher when swimming hall has been edited in updateView.|-|

<!-- @vuese:admin:methods:end -->


## Watch

<!-- @vuese:admin:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|edited|Watcher updates the list of the swimming halls in showAllView with getSwimhalls function and thus keeping the view updated for the user.|-|

<!-- @vuese:admin:watch:end -->


