/**
 * Boston Civic Media Website
 * Developed by Engagement Lab, 2016
 * ==============
 * Syllabi page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class syllabi
 * @author 
 *
 * ==========
 */
var keystone = require('keystone');
var Syllabi = keystone.list('Syllabi');
var Filter = keystone.list('Filter');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'this_syllabus';

    // Load the current publication
    view.on('init', function(next) {

        var filters = [];
        var filtersPopulate = [
                                {path:'institution', select:'key'},
                                {path:'discipline', select:'key'},
                                {path:'keyword', select:'key'},
                                {path:'faculty', select:'key'},
                                {path:'partnerOrg', select:'key'}
                              ];

        /* This query gets a publication by the key in the
           URL and populates resources from its model */
        var syllabusQuery = Syllabi.model.findOne({
            syllabus_key: req.params.syllabus_key
        })
        .populate('institution')
        .populate('discipline')
        .populate('keyword')
        .populate('faculty')
        .populate('partnerOrg');

        var queryFilters = Filter.model.find({});

        // Setup the locals to be used inside view
        syllabusQuery.exec(function(err, result) {
            
            if (!result)
                return res.notfound('Cannot find syllabus', 'Sorry, but it looks like the syllabus you were looking for does not exist!');
            
            queryFilters.exec(function(err, resultFilters) {

                locals.this_syllabus = result;
                // Chain the result for filters and map them into arrays of labels after grouping them into sub-objects
                // http://underscorejs.org/#groupBy
                // http://underscorejs.org/#map
                locals.filters =
                _
                .chain(resultFilters)
                .groupBy('category')
                .map(function(filter, name) {
                    return {
                        label: name,
                        values: filter
                                .map(function(category, catKey) { 
                                    var key = category.key;
                                    var name = category.name; 
                                    return { "key": key,  "name": name }; 
                                })
                    };
                })
                .value();

                next(err);
                 
            });
        });
    });

    // Render the view
    view.render('syllabus');

};