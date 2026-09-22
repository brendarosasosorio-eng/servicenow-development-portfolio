/**
 * ServiceNow Business Rule Example
 * Example: Before Business Rule
 *
 * Purpose:
 * Automatically update a field before an Incident record
 * is saved when the priority changes to High.
 *
 * Demonstrates:
 * - Before Business Rule
 * - current
 * - previous
 * - changesTo()
 * - Server-side JavaScript
 * - Automatic field updates before database save
 *
 * Table: Incident [incident]
 * When: Before
 * Update: true
 */


/* ============================================================
   BUSINESS RULE - Before Update
   ============================================================ */

(function executeRule(current, previous) {

    // Check whether Priority changed to High (2)
    if (current.priority.changesTo('2')) {

        // Set the assignment group field as an example
        // Replace with a valid group sys_id in a real implementation
        current.setValue(
            'assignment_group',
            'EXAMPLE_GROUP_SYS_ID'
        );

        gs.info(
            'Incident ' +
            current.getValue('number') +
            ' changed to High Priority.'
        );
    }

})(current, previous);
