/**
 * ServiceNow GlideAjax Example
 * Example: Retrieve Employee Number
 *
 * Purpose:
 * Retrieve the employee number of a selected user
 * without reloading the form.
 *
 * Demonstrates:
 * - onChange Client Script
 * - GlideAjax
 * - Client-callable Script Include
 * - GlideRecord
 * - Asynchronous callback
 * - g_form
 */


/* ============================================================
   CLIENT SCRIPT - onChange
   ============================================================ */

function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading || newValue == '') {
        return;
    }

    var ga = new GlideAjax('PortfolioEmployeeAjax');

    ga.addParam('sysparm_name', 'getEmployeeNumber');
    ga.addParam('sysparm_user_id', newValue);

    ga.getXMLAnswer(function(answer) {

        if (answer) {
            g_form.setValue('u_employee_number', answer);
        }
    });
}


/* ============================================================
   SCRIPT INCLUDE - Client Callable
   ============================================================ */

var PortfolioEmployeeAjax = Class.create();

PortfolioEmployeeAjax.prototype = Object.extendsObject(
    AbstractAjaxProcessor, {

        getEmployeeNumber: function() {

            var userId =
                this.getParameter('sysparm_user_id');

            var grUser =
                new GlideRecord('sys_user');

            if (grUser.get(userId)) {
                return grUser.getValue('employee_number');
            }

            return '';
        },

        type: 'PortfolioEmployeeAjax'
    }
);
