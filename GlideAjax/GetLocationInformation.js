/**
 * ServiceNow GlideAjax Example
 * Example: Retrieve Location Information
 *
 * Purpose:
 * Retrieve multiple values for a selected location
 * without reloading the form.
 *
 * Demonstrates:
 * - onChange Client Script
 * - GlideAjax
 * - Client-callable Script Include
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

    var ga = new GlideAjax('PortfolioLocationAjax');

    ga.addParam('sysparm_name', 'getLocationInformation');
    ga.addParam('sysparm_location_id', newValue);

    ga.getXMLAnswer(function(answer) {

        if (!answer) {
            return;
        }

        var location = JSON.parse(answer);

        g_form.setValue('u_street', location.street);
        g_form.setValue('u_city', location.city);
        g_form.setValue('u_state', location.state);
        g_form.setValue('u_postal_code', location.zip);
        g_form.setValue('u_country', location.country);
    });
}


/* ============================================================
   SCRIPT INCLUDE - Client Callable
   ============================================================ */

var PortfolioLocationAjax = Class.create();

PortfolioLocationAjax.prototype = Object.extendsObject(
    AbstractAjaxProcessor, {

        getLocationInformation: function() {

            var locationId =
                this.getParameter('sysparm_location_id');

            var grLocation =
                new GlideRecord('cmn_location');

            if (!grLocation.get(locationId)) {
                return '';
            }

            var result = {
                street: grLocation.getValue('street'),
                city: grLocation.getValue('city'),
                state: grLocation.getValue('state'),
                zip: grLocation.getValue('zip'),
                country: grLocation.getValue('country')
            };

            return JSON.stringify(result);
        },

        type: 'PortfolioLocationAjax'
    }
);
