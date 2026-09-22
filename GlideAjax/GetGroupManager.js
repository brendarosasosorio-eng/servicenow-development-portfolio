/**
 * ServiceNow GlideAjax Example
 * Example: Retrieve Assignment Group Manager
 *
 * Purpose:
 * Retrieve the manager of a selected Assignment Group
 * without reloading the form.
 *
 * Demonstrates:
 * - onChange Client Script
 * - GlideAjax
 * - Client-callable Script Include
 * - AbstractAjaxProcessor
 * - GlideRecord
 * - Asynchronous client-server communication
 * - g_form
 */


/* ============================================================
   CLIENT SCRIPT - onChange
   ============================================================ */

function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading || newValue == '') {
        return;
    }

    var ga = new GlideAjax('PortfolioGroupAjax');

    ga.addParam('sysparm_name', 'getGroupManager');
    ga.addParam('sysparm_group_id', newValue);

    ga.getXMLAnswer(function(answer) {

        if (answer) {
            g_form.setValue('u_group_manager', answer);
        }
    });
}


/* ============================================================
   SCRIPT INCLUDE - Client Callable
   ============================================================ */

var PortfolioGroupAjax = Class.create();

PortfolioGroupAjax.prototype = Object.extendsObject(
    AbstractAjaxProcessor, {

        getGroupManager: function() {

            var groupId =
                this.getParameter('sysparm_group_id');

            var grGroup =
                new GlideRecord('sys_user_group');

            if (grGroup.get(groupId)) {
                return grGroup.getValue('manager');
            }

            return '';
        },

        type: 'PortfolioGroupAjax'
    }
);
