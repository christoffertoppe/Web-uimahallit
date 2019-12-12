# SearchView

Component that handles searching for inside swimming pools in the metropolitan area of Helsinki Finland. The search option are searching all swimming pools, searching pools by city and searching pools by keyword. The search result is in JSON format and are emitted to SearchResultView component that handles viewing the swimming pools.

## Events

<!-- @vuese:SearchView:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|searchResultFromFetch|emits event searchResultFromFetch|this.searchResultGrouped - and object containing information on swimming pools and grouped by their city this.latestSearchType - latest type of search, by city, keyword, all|

<!-- @vuese:SearchView:events:end -->


## Methods

<!-- @vuese:SearchView:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|searchAll|Function for searching every swimming pool in the database.|-|
|searchByCity|Function for searching swimming pools in the database by city name.|event - event object from clicking a DOM element|
|searchByName|Function for searching swimming pools in the database by keyword.|-|

<!-- @vuese:SearchView:methods:end -->


## Watch

<!-- @vuese:SearchView:watch:start -->
|Name|Description|Parameters|
|---|---|---|
|searchResult|Function that handles grouping of search result when searchResult-data changes. lodash library used for grouping. Emits searchResultGrouped to Home component that conveys it to be used in SearchResultView|-|

<!-- @vuese:SearchView:watch:end -->


