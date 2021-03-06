/**
 * Boston Civic Media Website
 * 
 * Home page Model
 * @module Home
 * @class Home
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Home model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Home = new keystone.List('Home', 
	{
		label: 'Home Page',
		singular: 'Home Page',
		track: true,
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main Home
 */
Home.add({
	name: { type: String, default: "Home Page", hidden: true, required: true, initial: true },
	features: { type: Types.Relationship, ref: 'HomeFeature', label: 'Features', note: 'These can be edited on the "Home Features" page.', many: true },
	background: { type: Types.CloudinaryImage, label: 'Home Page Background Image',  folder: 'boston-civic-media/logos' },
	missionStatements: { type: Types.TextArray, label: 'Mission Statement', note: 'First statement will be bolded and appear first, second statement will be regular and second. Only the first two statements will appear.' },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Home.defaultSort = '-createdAt';
Home.defaultColumns = 'name, updatedAt';
Home.register();
