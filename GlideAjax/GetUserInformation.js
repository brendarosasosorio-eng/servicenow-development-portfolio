/**
 * ServiceNow GlideAjax Example
 * Example: Retrieve User Information
 *
 * Purpose:
 * Retrieve information about a selected user from the server
 * without reloading the form.
 *
 * Demonstrates:
 * - onChange Client Script
 * - GlideAjax
 * - Client-callable Script Include
 * - AbstractAjaxProcessor
 * - GlideRecord
 * - JSON.stringify / JSON.parse
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

    var ga = new GlideAjax('PortfolioUserAjax');

    ga.addParam('sysparm_name', 'getUserInformation');
    ga.addParam('sysparm_user_id', newValue);

    ga.getXMLAnswer(function(answer) {

        if (!answer) {
            return;
        }

        var user = JSON.parse(answer);

        g_form.setValue('u_user_name', user.name);
        g_form.setValue('u_user_email', user.email);
    });
}


/* ============================================================
   SCRIPT INCLUDE - Client Callable
   ============================================================ */

var PortfolioUserAjax = Class.create();

PortfolioUserAjax.prototype = Object.extendsObject(
    AbstractAjaxProcessor, {

        getUserInformation: function() {

            var userId =
                this.getParameter('sysparm_user_id');

            var grUser =
                new GlideRecord('sys_user');

            if (!grUser.get(userId)) {
                return '';
            }

            var result = {
                name: grUser.getDisplayValue('name'),
                email: grUser.getValue('email')
            };

            return JSON.stringify(result);
        },

        type: 'PortfolioUserAjax'
    }
);
