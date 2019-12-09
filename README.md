index.js includes all the REST-interface calls made to the back-end.


GET /api/location

takes the string that is found in the url after the = mark and use it for searchword.
Searchword is used the search the database where searchword is included in the field nimi.
return 
JSON:   
{nimi:[String],
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

 
GET /api/location/all

return all the data stored on database
return 
JSON:   
{nimi:[String],
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
 
GET /api/location/city

return 
JSON:   
{nimi:[String],
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


POST /api/comment

adds comment to the swimhall with the same id as included in JSON file
received JSON:
{id:[Integer],
comment:[String]
}

POST /api/add

Receives and JSON with all the swimhall information.
JSON:   
{nimi:[String],
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
adds it to the database

PUT /api/update

updates the information about a swimhall
can handle two different JSON formats
received JSON with two values: 
{id:[Integer],
hinta:[Double]}
or JSON that include all the fields:
{nimi:[String],
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
  
DELETE /api/comment
DELETE /api/removeswimhall

