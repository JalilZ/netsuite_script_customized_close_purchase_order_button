/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record'], function (record) {
    function beforeLoad_addButton(scriptContext) {

      if (scriptContext.type === scriptContext.UserEventType.EDIT) {
            // In edit mode, do not display the button
            return;
        }

        var purchaseOrderId = scriptContext.newRecord.id;
        var purchaseOrderStatus = record.load({
            type: record.Type.PURCHASE_ORDER,
            id: purchaseOrderId
        }).getValue({
            fieldId: 'status'
        });

        // Check if the purchase order is in the "Closed" status
        if (purchaseOrderStatus === 'Closed') {
            // If the status is "Closed", do not display the button
            return;
        }


      
        // If none of the conditions above are met, add the "Close PO" button
        var form = scriptContext.form;
        form.addButton({
            id : 'custpage_buttonid',
            label : 'Close PO',
            functionName : 'closePoButton()'
        });
        form.clientScriptFileId = 193285; //internal id of the script file in the file cabinet
    }
    return {
        beforeLoad: beforeLoad_addButton
    }
});