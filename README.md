# REST API for the project
## index.js includes all the REST-interface calls made to the back-end.
## methods are imported from other .js files to make the project organized. 


## GET /api/location?=value

Takes the string that is found in the url after the = mark and use it as search word.
Search is made on the database where search word is included in the field nimi.

### return JSON:   
```
{_id:[Integer],
nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}
 , { ... }
```
#### Example /api/location/?=Leppä
```
{"_id":3,
"nimi":"Leppävaaran
uimahalli",
"ratapituus":25,
"ratamäärä":8,
"puhelin":"0981657570",
"aika":["7.00-20.00","6.00-20.00","10.00-20.00","6.00-20.00","7.00-20.00","9.00–19.00","9.00–19.00"],
"hinta":5.5,
"alehinta":3,
"osoite":"Veräjäpellonkatu
15, 02650 Espoo",
"kaupunki":"Espoo",
"kommentit":["Hieno
uimahalli"],
"url":"https://www.espoo.fi/fi-FI/Kulttuuri_ja_liikunta/Liikunta/Liikunta_ja_ulkoilupaikat/Uimahallit/Leppavaara"}
 ```
## GET /api/location/all

return all the data stored on database
### return JSON: 
```
{_id:[Integer],
nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}
 , { ... }
 ```
## GET /api/location/city?=value

returns JSON with the swimhalls that have the same city name as in the url after = mark.
Search is made on the database where search word is included in the field kaupunki.
### return JSON:  
``` 
{_id:[Integer],
nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}
 , { ... }
```

## POST /api/comment

adds comment to the swimhall with the same id as included in JSON file
### received JSON:
```
{id:[Integer],
comment:[String],
type:[String]
```
### returns JSON with all the data that was last seen on the screen on frontend with the changes.
```
{_id:[Integer],
nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}
```

## POST /api/add

Receives a JSON with all the swimhall information. 
Information is added to the end of list in database as a new swimhall.
### received JSON:  
``` 
{_id:[Integer],
 nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]
}
```
adds it to the database

### returns the updated version of the whole database as JSON: 
``` 
{_id:[Integer],
 nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}...
```
## PUT /api/update

updates the information about a swimhall.
This call can handle two different JSON formats
### received JSON with two values: 
```
{id:[Integer],
hinta:[Double]}
```
### or 
### JSON that include all the fields:
```
{_id:[Integer],
nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}
 ``` 
### returns the updated version of the whole database as JSON: 
``` 
  {_id:[Integer],
   nimi:[String],
   ratapituus:[Integer],
   ratamäärä:[Integer],
   puhelin:[String],
   aika:[Array[String]],
   hinta:[Double],
   alehinta:[Double],
   osoite:[String],
   kaupunki:[String],
   kommentit:[Array[String]],
   url:[String]}...
```
## DELETE /api/comment

Deletes a comment with a specific value id of swimhall and comment number
### received JSON:
```
{id:[Integer],
comment:[Integer]}
```
## DELETE /api/removeswimhall

Removes swimhall with the specific id number
### received JSON:
```
{_id:[Integer]}
```
### returns the updated version of the whole database as JSON:   
```
{_id:[Integer],
 nimi:[String],
 ratapituus:[Integer],
 ratamäärä:[Integer],
 puhelin:[String],
 aika:[Array[String]],
 hinta:[Double],
 alehinta:[Double],
 osoite:[String],
 kaupunki:[String],
 kommentit:[Array[String]],
 url:[String]}...
```