/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/ui/dialog'], function (currentRecord, record, dialog) {
  function pageInit(context) {

  }

  function closePOlines(rec) {
    var count = rec.getLineCount({sublistId: 'item' });
          //console.log("count: ", count)
          for (var i = 0; i < count; i++) {

              var quantityBilled = rec.getSublistValue({
                          sublistId: 'item',
                          fieldId: 'quantitybilled',
                          line: i
                        });
              var quantity = rec.getSublistValue({
                          sublistId: 'item',
                          fieldId: 'quantity',
                          line: i
                       });
            if (quantity > quantityBilled){
              rec.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'isclosed',
                  line: i,
                  value: true
              })
              }
          }

          rec.save()

          location.reload()
  }

  function closePoButton() {

      var curRec = currentRecord.get();
      //console.log("curRec:", curRec.id);

      var rec = record.load({

          type: record.Type.PURCHASE_ORDER,

          id: curRec.id

      })
    // console.log('rec:', rec)

     
      var reason = rec.getValue({
          fieldId: 'custbody_po_close_reason'
      })

      // Add a confirmation checkbox for "custbody_oc_canceled_order" in the popup
      var canceledOrder = rec.getValue({
          fieldId: 'custbody_oc_canceled_order'
      });

      //var r = confirm("Are you sure you want to close?");

      var options = {
              title: 'Purchase Order',
              // message: 'Click OK to Close PO, click Cancel to Cancel PO',
              message: 'Please Confirm Closing/Cancelling PO',
             buttons: [
                      { label: 'Close PO', value: 1 },
                      { label: 'Cancel PO', value: 2 },
                      { label: 'Exit', value: 3 }]
             };


      dialog.create(options).then(function (result) {
        
         if (result === 1) {
         var input_reason = prompt('Please enter closing reason', reason);
           if (input_reason == "" || input_reason == null) {
             input_reason = reason
           }
          rec.setValue({
              fieldId: 'custbody_po_close_reason',
              value: input_reason
          })
         closePOlines(rec);
           
         }
        else if (result === 2) {
          if (input_reason == "" || input_reason == null) {
             input_reason = reason
           }
          rec.setValue({
              fieldId: 'custbody_oc_canceled_order',
              value: true
          });
          var input_reason = prompt('Please enter closing reason', reason);
          rec.setValue({
              fieldId: 'custbody_po_close_reason',
              value: input_reason
          });
        closePOlines(rec);
        }
          
         else {
         alert('No changes made');
         }
        
      })
        .catch(function () {
      // The dialog was closed without clicking any button
      alert('No changes made');
      }
              );
    
  }

  return {
      pageInit: pageInit,
      closePoButton: closePoButton
  };
});