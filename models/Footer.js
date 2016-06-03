/**
 * Boston Civic Media Website
 * 
 * Footer page Model
 * @module Footer
 * @class Footer
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Footer model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Footer = new keystone.List('Footer', 
	{
		label: 'Footer Page',
		singular: 'Footer Page',
		track: true,
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main Footer
 */
Footer.add({
	name: { type: String, default: "Footer Page", hidden: true, required: true, initial: true },
	'Stay Updated', {

        subscribe: {
            type: Types.Textarea,
            label: 'Subscribe Button Blurb'
        },
        listserv: {
            type: Types.Textarea,
            label: 'Listserv Button Blurb'
        },
	}, 
	'Main Footer', {

	    elLogo: {
            type: Types.CloudinaryImage, 
            label: 'EL Logo', 
            folder: 'site/logos'
        },
        bcmLogo: {
            type: Types.CloudinaryImage, 
            label: 'BCM Logo', 
            folder: 'site/logos'
        },
        content: {
            type: Types.TextArray, 
            label: 'Footer Content',
            note: "Each content item will be displayed as an individual line in the footer.", 
            folder: 'site/logos'
        },
	}, 
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Footer.defaultSort = '-createdAt';
Footer.defaultColumns = 'name, updatedAt';
Footer.register();