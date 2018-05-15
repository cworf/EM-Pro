const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Moment = require('moment');
const MomentRange = require('moment-range');
const algoliasearch = require('algoliasearch');
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INVENTORY = 'inventory';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const moment = MomentRange.extendMoment(Moment);

admin.initializeApp(functions.config().firebase);

const db = admin.firestore()
// // Create and Deploy Your First Cloud Functions


// Update the search index every time an inventory item is written.
exports.onInventoryItemCreated = functions.firestore.document('companies/{companiesId}/inventory/{inventoryId}').onWrite(event => {
    // Get the inventory document
    const item = event.data.exists ? event.data.data() : event.data.previous.data()
    const isDeleted = event.data.exists ? false : true
    // Add an 'objectID' field which Algolia requires
    item.objectID = event.data.id;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INVENTORY);
    return isDeleted
      ? index.deleteObject(item.objectID)
      : index.saveObject(item)
});

exports.detectConflict = functions.firestore.document(`companies/{companyId}/inventory/{inventoryId}/orders/{orderId}`).onWrite(event => {
  const eventStatus = event.data.exists ? event.data.data() : event.data.previous.data()
    const {companyId} = event.params
  const isDeleted = event.data.exists ? false : true
  const triggerId = event.data.id
  const triggerStart = eventStatus.start
  const triggerEnd = eventStatus.end
  const triggerQty = isDeleted ? 0 : eventStatus.qty
  const triggerRange = moment.range(triggerStart, triggerEnd)
  const eventRef = eventStatus.event_ref
  const itemName = eventStatus.item_name
  const itemPath = eventStatus.item_ref
  const getItemOrders = db.collection(`${itemPath}/orders`).get()
  const getItem = db.doc(itemPath).get()
  const getConflicts = db.collection(`companies/${companyId}/conflicts`).get()

  return Promise.all([getItemOrders, getItem, getConflicts])
    .then(results => {
      const orders = results[0]
      const item = results[1]
      const conflicts = results[2]
      let totalRequestedQty = triggerQty
      const overlappingEvents = [eventRef]
      orders.forEach(order => { //loop through orders for this item and calculate total quantity requested
        if (order.id !== triggerId) {
          const {start, end, event_ref, qty} = order.data()
          const range2 = moment.range(start, end)
          if (triggerRange.overlaps(range2)) {
            overlappingEvents.push(event_ref) //create list of affected events
            totalRequestedQty += qty
          }
        }
      })

      const totalInStock = item.data().in_stock
      let conflictToResolve

      if (totalRequestedQty > totalInStock) {
        /*eslint-disable*/
        db.collection(`companies/${event.params.companyId}/conflicts`).add({
          item_name: itemName,
          affected: overlappingEvents,
          qty_request: totalRequestedQty,
          total_stock: totalInStock,
          from: triggerStart,
          to: triggerEnd,
        })
          .then((result) =>
          console.log('Conflict found!', result))
          .catch(e => console.log('error creating document'))
          /*eslint-enable*/
      } else {
        conflicts.forEach(conflict => {
          const {affected, item_name} = conflict.data()
          if (item_name === itemName && affected.includes(eventRef)) {
            console.log('deleted conflict: ',conflict.id, '=>', itemName, '... conflict was resolved' );
            db.collection(`companies/${companyId}/conflicts`).doc(conflict.id).delete()
          }
        })
      }
      return
    })
    .catch(err => {
      console.log(err);
    })


  // admin.firestore().collection
})


exports.cleanOrdersOnDelete = functions.firestore.document(`companies/{companyId}/events/{eventId}`).onDelete(event => {
  const eventData = event.data.previous.data()
  const {companyId, eventId} = event.params
  console.log('eventstuff', event);
  const orders = `companies/${companyId}/events/${eventId}/orders`

  return db.collection(orders).get()
    .then(eventOrders => {
      return eventOrders.forEach(order => {
        const {order_ref} = order.data()
        /*eslint-disable*/
        db.doc(order_ref).delete()
          .then(() => {
            console.log(order_ref, "successfully deleted")
            order.ref.delete()
              .then(() => console.log('reference document successfully deleted, all done!'))
          })
          .catch(e => console.log((e) => 'error deleting order', e))
          /*eslint-enable*/

      })
    })
})
