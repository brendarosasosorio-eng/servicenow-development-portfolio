/**
 * ServiceNow GlideAjax Example
 * Example: Dynamic Choice Population
 *
 * Purpose:
 * Dynamically populate a Choice field based on server-side data
 * associated with the selected user's company.
 *
 * Demonstrates:
 * - onChange Client Script
 * - GlideAjax
 * - Client-callable Script Include
 * - Multiple GlideRecord queries
 * - Arrays
 * - JSON.stringify / JSON.parse
 * - g_form.clearOptions()
 * - g_form.addOption()
 */


/* ============================================================
   CLIENT SCRIPT - onChange
   ============================================================ */

function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading || newValue == '') {
        return;
    }

    // Clear existing options
    g_form.clearOptions('u_region');

    // Add default option
    g_form.addOption(
        'u_region',
        '',
        '-- Select --'
    );

    var ga = new GlideAjax('PortfolioRegionAjax');

    ga.addParam(
        'sysparm_name',
        'getRegionsForUser'
    );

    ga.addParam(
        'sysparm_user_id',
        newValue
    );

    ga.getXMLAnswer(function(answer) {

        if (!answer) {
            return;
        }

        var regions = JSON.parse(answer);

        regions.sort();

        for (var i = 0; i < regions.length; i++) {

            g_form.addOption(
                'u_region',
                regions[i],
                regions[i]
            );
        }
    });
}


/* ============================================================
   SCRIPT INCLUDE - Client Callable
   ============================================================ */

var PortfolioRegionAjax = Class.create();

PortfolioRegionAjax.prototype = Object.extendsObject(
    AbstractAjaxProcessor, {

        getRegionsForUser: function() {

            var userId =
                this.getParameter('sysparm_user_id');

            /* ----------------------------------------------
               STEP 1: Retrieve the user's company
               ---------------------------------------------- */

            var grUser =
                new GlideRecord('sys_user');

            if (!grUser.get(userId)) {
                return '[]';
            }

            var companyId =
                grUser.getValue('company');


            /* ----------------------------------------------
               STEP 2: Retrieve regions for that company
               ---------------------------------------------- */

            var regions = [];

            // Demo table created only for portfolio purposes.
            var grRegion =
                new GlideRecord('u_demo_service_region');

            grRegion.addQuery(
                'u_company',
                companyId
            );

            grRegion.query();

            while (grRegion.next()) {

                var region =
                    grRegion.getValue('u_region');

                // Avoid duplicate values
                if (region &&
                    regions.indexOf(region) == -1) {

                    regions.push(region);
                }
            }


            /* ----------------------------------------------
               STEP 3: Return the array as JSON
               ---------------------------------------------- */

            return JSON.stringify(regions);
        },

        type: 'PortfolioRegionAjax'
    }
);
