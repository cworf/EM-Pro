const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

admin.initializeApp(functions.config().firebase);

const db = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.detectConflict = functions.firestore.document(`inventory/{inventoryId}/orders/{orderId}`).onWrite(event => {
  const eventStatus = event.data.exists ? event.data.data() : event.data.previous.data()
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
  const getConflicts = db.collection('conflicts').get()

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

      const totalInStock = item.data().inStock
      let conflictToResolve

      if (totalRequestedQty > totalInStock) {
        db.collection('conflicts').add({
          item_name: itemName,
          affected: overlappingEvents,
          qty_request: totalRequestedQty,
          total_stock: totalInStock,
        })
      } else {
        conflicts.forEach(conflict => {
          const {affected, item_name} = conflict.data()
          if (item_name === itemName && affected.includes(eventRef)) {
            console.log('deleted conflict: ',conflict.id, '=>', itemName, '... conflict was resolved' );
            db.collection('conflicts').doc(conflict.id).delete()
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
