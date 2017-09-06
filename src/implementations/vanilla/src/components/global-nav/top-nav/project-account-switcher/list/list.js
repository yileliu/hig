import './list.scss';

var Template = require('./list.html');
var Interface = require('interface.json');
var Core = require('_core.js');

var Item = require('../item/item.js');

/**
 * Creates an List
 *
 * @class
 */

class List extends Core {

    constructor(options){
        super(options);
        this._render(Template, options);
    }

    addItem(newInstance, referenceInstance) {
      this.mountPartialToComment('ITEMS', newInstance, referenceInstance);
    }

    // addProject(newInstance, referenceInstance) {
    //     this.mountPartialToComment('PROJECTS', newInstance, referenceInstance);
    // }

    // addAccount(newInstance, referenceInstance) {
    //     this.mountPartialToComment('ACCOUNTS', newInstance, referenceInstance);
    // }

    // setProjectSectionTitle(title){
    //     const firstProjectItem = this._findDOMEl(".hig__global-nav__top-nav__project-account-switcher__item--project.hig__global-nav__top-nav__project-account-switcher__item--active:first-child");
    //    firstProjectItem.dataset.projectSectionTitle = title;
    // }

    // setAccountSectionTitle(title){
    //     const firstAccountItem = this._findDOMEl(".hig__global-nav__top-nav__project-account-switcher__item--account.hig__global-nav__top-nav__project-account-switcher__item--active:first-child");
    //     firstAccountItem.dataset.accountSectionTitle = title;
    // }

}

List._interface = Interface['components']['GlobalNav']['partials']['TopNav']['partials']['ProjectAccountSwitcher']['partials']['List'];
List._defaults = {
  "title": ""
};
List._partials = {
  Item: Item
};

module.exports = List;