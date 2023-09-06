# Netsuite script

This script creates a customized button to close purchase orders

# Procurement requests

1. Create a customized Close PO button
2. If the button is clicked, a pop-up window till open showing three buttons:
    1. Close PO - if clicked, an input bar should appear asking the procurement to provide reason for closing this PO, given reason should be stored in the customized field 'custbody_po_close_reason'
    2. Cancel PO - if clicked, an input bar should appear asking the procurement to provide reason for cancelling this PO, given reason should be stored in the customized field 'custbody_po_close_reason', clicking this Cancel PO button will also check the customized checkbox "custbody_oc_canceled_order"
    3. Exit - aborts closing the PO

Important note - the Close & Cancel buttons should close PO item lines only if quantity > quantity billed

## NetSuite Customize form & WorkFlow

For improved visualization, hide netsuite vanilla Close button & create a netsuite workflow that shows Order Cancelled label highlighted, if the order cancelled checkbox is True

## Author

Jalil

