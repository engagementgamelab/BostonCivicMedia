/* Boston Civic Media */
/**
 * Route middleware
 * This file contains the common middleware used by all routes. Extend or replace these functions as the application requires.
 *
 * @class middleware
 * @namespace routes
 * @author Johnny Richardson
 * @constructor
 * @static
 **/

var keystone = require('keystone');
var Footer = require('keystone').list('Footer');
var _ = require('underscore');

/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

    var locals = res.locals;

    locals.navLinks = [{
        label: 'About',
        key: 'about',
        href: '/about'
    },
    {
        label: 'Get Involved',
        key: 'get-involved',
        href: '/get-involved'
    },
    {
        label: 'Syllabi',
        key: 'syllabi',
        href: '/syllabi'
    },
    {
        label: 'Lightning Talks',
        key: 'lightning-talk',
        href: '/lightning-talks'
    },
    // {
    //     label: 'CIRB',
    //     key: 'irb_proj',
    //     href: '/irb_proj'
    // },
    {
        label: 'Events',
        key: 'events',
        href: '/events'
    }];

    locals.user = req.user;

    next();

};

exports.Footer = function (req, res, next) {

    var locals = res.locals;

    var queryFooter = Footer.model.findOne({}, {}, {
        sort: {
            'createdAt': -1
        }
    });

    queryFooter.exec(function(err, resultFooter) {
        if (err) throw err;

        locals.footer = resultFooter;
        next(err);
    });

}

/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) {
        return msgs.length;
    }) ? flashMessages : false;

    next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }

};


/**
    Inits the error handler functions into `req`
*/

exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    };
    
    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    };
    
    next();
    
};