/**
 * ServiceNow Business Rule Example
 * Example: Prevent Record Submission
 *
 * Purpose:
 * Prevent an Incident from being resolved when
 * mandatory resolution information is missing.
 *
 * Demonstrates:
 * - Before Business Rule
 * - current
 * - changesTo()
 * - nil()
 * - setAbortAction()
 * - gs.addErrorMessage()
 * - Server-side validation
 *
 * Table: Incident [incident]
 * When: Before
 * Update: true
 */


/* ============================================================
   BUSINESS RULE - Prevent Record Submission
   ============================================================ */

(function executeRule(current, previous) {

    // Check whether the Incident is changing to Resolved
    if (current.state.changesTo('6')) {

        // Validate that Resolution Notes contain information
        if (gs.nil(current.close_notes)) {

            gs.addErrorMessage(
                'Resolution Notes are required before resolving the Incident.'
            );

            // Stop the database operation
            current.setAbortAction(true);
        }
    }

})(current, previous);
