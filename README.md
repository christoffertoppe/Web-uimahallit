index.js includes all the REST-interface calls made to the back-end.

GET /api/location
takes the string that is found in the url after the = mark and use it for searchword.
Searchword is used the search the database where searchword is included in the field nimi.
return 
JSON: {nimi:[String],
 ratapituus
 'ratamäärä',
 puhelin,
 aika,
 hinta,
 alehinta,
 osoite,
 kaupunki,
 kommentit,
 url},...
 
GET /api/location/all
return all the data stored on database
return 
JSON: {nimi,
 ratapituus
 'ratamäärä',
 puhelin,
 aika,
 hinta,
 alehinta,
 osoite,
 kaupunki,
 kommentit,
 url},...
 
GET /api/location/city
return 
JSON: {nimi,
 ratapituus
 'ratamäärä',
 puhelin,
 aika,
 hinta,
 alehinta,
 osoite,
 kaupunki,
 kommentit,
 url},...


POST /api/comment
POST /api/add

PUT /api/update

DELETE /api/comment
DELETE /api/removeswimhall

