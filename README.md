index.js includes all the REST-interface calls.

GET /api/location
takes the string that is found in the url after the = mark and use it for searchword.
Searchword is used the search the database where searchword is included in the field nimi.
return 
{nimi,
 ratapituus
 'ratamäärä',
 puhelin,
 aika,
 hinta,
 alehinta,
 osoite,
 kaupunki,
 kommentit,
 url
   }
GET /api/location/all
GET /api/location/city



POST /api/comment
POST /api/add

PUT /api/update

DELETE /api/comment
DELETE /api/removeswimhall

