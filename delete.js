var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

class Delete {
  async deleteComment(id, comment) {
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await deleteField(client, id, comment);
      return ('Comment removed');
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function deleteField(client, idOfListing, value){
      let valueID = "kommentit." + value;
      await client.db('swim_halls').collection('halls_capital_area').updateOne({_id: idOfListing}, {$unset: {[valueID]: 1}});
      let result = await client.db('swim_halls').collection('halls_capital_area').updateOne({_id: idOfListing}, {$pull: {"kommentit": null}});
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
  }

  /*
  export function removeNotification(itemToDelete) {

    return("Notification removed");
  }
   */
}

module.exports = Delete;