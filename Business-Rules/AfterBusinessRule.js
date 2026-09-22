/**
 * ServiceNow Business Rule Example
 * Example: After Business Rule
 *
 * Purpose:
 * Create a follow-up record after an Incident
 * changes to the Resolved state.
 *
 * Demonstrates:
 * - After Business Rule
 * - current
 * - previous
 * - changesTo()
 * - GlideRecord
 * - insert()
 * - Server-side JavaScript
 *
 * Table: Incident [incident]
 * When: After
 * Update: true
 */


/* ============================================================
   BUSINESS RULE - After Update
   ============================================================ */

(function executeRule(current, previous) {

    // Check whether the Incident changed to Resolved
    if (current.state.changesTo('6')) {

        var followUp = new GlideRecord('u_demo_follow_up');

        followUp.initialize();

        followUp.setValue(
            'u_incident',
            current.getUniqueValue()
        );

        followUp.setValue(
            'u_description',
            'Follow-up created for Incident ' +
            current.getValue('number')
        );

        followUp.setValue(
            'u_status',
            'pending'
        );

        var followUpSysId = followUp.insert();

        gs.info(
            'Follow-up record created for Incident ' +
            current.getValue('number') +
            '. Follow-up sys_id: ' +
            followUpSysId
        );
    }

})(current, previous);
