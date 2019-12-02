var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

class Add {

  async addComment(id, comment) {
    const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await updateField(client, id ,comment);
      return(result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
    async function updateField(client, idOfListing, updateInfo) {
      let result = await client.db('swim_halls').collection('halls_capital_area').
          updateOne({_id: idOfListing}, {$push: {kommentit: updateInfo}});
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
      return ('Comment added');
    }
  }

  async addNotification() {
    const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    return ('Notification added');
  }
}
module.exports = Add;