var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

/**
 * class with methods to delete comments and swimhalls
 */
class Delete {
  /**
   * delete comment from specific swimhall with same id, and the comment with same id as commentid.
   * @param id
   * @param comment
   * @returns {Promise<string>}
   */
  async deleteComment(id, commentid) {
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      await deleteComment(client, id, commentid);
      return ('Comment removed');
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function deleteComment(client, idOfListing, value){
      let valueID = "kommentit." + value;
      await client.db('swim_halls').collection('halls_capital_area').updateOne({_id: idOfListing}, {$unset: {[valueID]: 1}});
      let result = await client.db('swim_halls').collection('halls_capital_area').updateOne({_id: idOfListing}, {$pull: {"kommentit": null}});
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
  }

  /**
   * deletes the swimhall with same id as parameter id.
   * @param id
   * @returns {Promise<string>}
   */
  async deleteSwimHall(id){
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      await deleteHall(client, id);
      return ('Comment removed');
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
    async function deleteHall(client, id) {
      await client.db('swim_halls').collection('halls_capital_area').deleteOne({_id: id});
    }

  }


  /*
  removeNotification(itemToDelete) {

    return("Notification removed");
  }
   */
}

module.exports = Delete;