/**
 * ServiceNow Business Rule Example
 * Example: Async Business Rule
 *
 * Purpose:
 * Perform background processing after an Incident
 * is updated without making the user wait for
 * the additional processing to complete.
 *
 * Demonstrates:
 * - Async Business Rule
 * - Server-side JavaScript
 * - GlideRecord
 * - addQuery()
 * - query()
 * - next()
 * - Background processing
 *
 * Table: Incident [incident]
 * When: Async
 * Update: true
 */


/* ============================================================
   BUSINESS RULE - Async Update
   ============================================================ */

(function executeRule(current, previous) {

    var incidentSysId = current.getUniqueValue();

    var grTask = new GlideRecord('u_demo_related_task');

    grTask.addQuery(
        'u_incident',
        incidentSysId
    );

    grTask.addQuery(
        'u_active',
        true
    );

    grTask.query();

    while (grTask.next()) {

        grTask.setValue(
            'u_last_incident_update',
            new GlideDateTime()
        );

        grTask.update();
    }

    gs.info(
        'Async processing completed for Incident ' +
        current.getValue('number')
    );

})(current, previous);
