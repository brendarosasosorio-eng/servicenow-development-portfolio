/**
 * ServiceNow GlideRecord Example
 * Example: Retrieve a Single Record
 *
 * Purpose:
 * Retrieve a specific user record when the sys_id
 * of the record is already known.
 *
 * Demonstrates:
 * - GlideRecord
 * - get()
 * - getValue()
 * - getDisplayValue()
 * - Record validation
 * - Server-side JavaScript
 */


/* ============================================================
   GLIDERECORD - Retrieve a Single Record
   ============================================================ */

var userSysId = 'EXAMPLE_USER_SYS_ID';

var grUser = new GlideRecord('sys_user');

if (grUser.get(userSysId)) {

    var userName =
        grUser.getDisplayValue('name');

    var userEmail =
        grUser.getValue('email');

    var userDepartment =
        grUser.getDisplayValue('department');

    gs.info(
        'User: ' + userName +
        ' | Email: ' + userEmail +
        ' | Department: ' + userDepartment
    );

} else {

    gs.info(
        'User record was not found.'
    );
}
