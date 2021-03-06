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
// var moment = require('moment');
var LightningTalk = keystone.list('LightningTalk');
// var Resource = keystone.list('Resource');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'this_talk';
    // locals.sub_section = 'publications';

    // Load the current publication
    view.on('init', function(next) {

        /* This query gets a publication by the key in the
           URL and populates resources from its model */
        var talkQuery = LightningTalk.model.findOne({
            talk_key: req.params.talk_key
        });

        // Setup the locals to be used inside view
        talkQuery.exec(function(err, result) {
            
            if (result === null) {
                return res.notfound('Cannot find lightning talk', 'Sorry, but it looks like the talk you were looking for does not exist! Try <a href="http://elab.emerson.edu/events">going back</a> to the directory.');
            }

            // locals.date = moment(result.date).format();
            locals.this_talk = result;

            next(err);
        });
    });

    // Render the view
    view.render('lightning_talk');

};