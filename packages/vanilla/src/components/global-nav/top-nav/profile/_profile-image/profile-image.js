import './profile-image.scss';

import Template from './profile-image.html';
import Interface from 'interface.json';
import Core from '_core.js';

/**
 * Creates a ProfileImage
 *
 * @class
 */

class ProfileImage extends Core {
  constructor(options) {
    super(options);
    this._render(Template, options);
  }

  onClick(fn) {
    return this._attachListener('click', this.el, this.el, fn);
  }

  setImage(imageUrl) {
    this.el
      .querySelector('.hig__global-nav__top-nav__profile__profile-image__image')
      .setAttribute('src', imageUrl);
  }
}

ProfileImage._interface = {
  methods: {
    'onClick': {},
    'setImage': {}
  },
  defaults: {}
};
ProfileImage._defaults = {};

export default ProfileImage;
