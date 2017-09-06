import * as PropTypes from "prop-types";
import HIGElement from "../../../elements/HIGElement";
import HIGNodeList from "../../../elements/HIGNodeList";
import HIGChildValidator from "../../../elements/HIGChildValidator";
import createComponent from "../../createComponent";
// import AccountComponent, { AccountAdapter } from "./AccountAdapter";
// import ProjectComponent, { ProjectAdapter } from "./ProjectAdapter";
// import Project from "../../../elements/components/GlobalNav/TopNav/Project";
// import Account from "../../../elements/components/GlobalNav/TopNav/Account";

import ListComponent, { ListAdapter } from "./ListAdapter";

export class ProjectAccountSwitcherAdapter extends HIGElement {
  constructor(HIGConstructor, initialProps) {
    super(HIGConstructor, initialProps);

    this.lists = new HIGNodeList({
      ListAdapter: {
        type: ListAdapter,
        HIGConstructor: this.hig.partials.List,
        onAdd: (instance, beforeInstance) => {
          this.hig.addList(instance, beforeInstance);
        }
      }
    });

    
  }

  componentDidMount() {
    this.lists.componentDidMount();

    if (this.initialProps.open === true) {
      this.hig.open();
    }
    if (this.initialProps.showCaret) {
      this.hig.showCaret();
    } else {
      this.hig.hideCaret();
    }

    this.commitUpdate(this.props);
  }

  commitUpdate(updatePayload, oldProps, newProp) {
    for (let i = 0; i < updatePayload.length; i += 2) {
      const propKey = updatePayload[i];
      const propValue = updatePayload[i + 1];

      switch (propKey) {
        case "open": {
          if (propValue) {
            this.hig.open();
          } else {
            this.hig.close();
          }
          break;
        }
        case "showCaret": {
          if (propValue) {
            this.hig.showCaret();
          } else {
            this.hig.hideCaret();
          }
          break;
        }
        case "activeLabel": {
          this.hig.setActiveLabel(propValue);
          break;
        }
        case "activeType": {
          this.hig.setActiveType(propValue);
          break;
        }
        case "activeImage": {
          this.hig.setActiveImage(propValue);
          break;
        }
        case "onClickOutside": {
          const dispose = this._disposeFunctions.get("onClickOutsideDispose");

          if (dispose) {
            dispose();
          }

          this._disposeFunctions.set(
            "onClickOutisdeDispose",
            this.hig.onClickOutside(propValue)
          );
          break;
        }
        case "onClick": {
          const dispose = this._disposeFunctions.get("onClick");

          if (dispose) {
            dispose();
          }

          this._disposeFunctions.set("onClick", this.hig.onClick(propValue));
          break;
        }
        case "children": {
          //no-op
          break;
        }
        default: {
          console.warn(`${propKey} is unknown`);
        }
      }
    }
  }

  createElement(ElementConstructor, props) {
    return this.lists.createElement(ElementConstructor, props);
  }

  insertBefore(instance, beforeChild = {}) {
    this.lists.insertBefore(instance, beforeChild);
  }
}

const ProjectAccountSwitcherComponent = createComponent(
  ProjectAccountSwitcherAdapter
);

ProjectAccountSwitcherComponent.propTypes = {
  open: PropTypes.bool,
  showCaret: PropTypes.bool,
  onAccountChange: PropTypes.func,
  onProjectChange: PropTypes.func,
  setProjectSectionTitle: PropTypes.func,
  setAccountSectionTitle: PropTypes.func,
  activeLabel: PropTypes.string,
  activeImage: PropTypes.string,
  activeType: PropTypes.string,
  children: HIGChildValidator([
    ListAdapter
  ])
};

ProjectAccountSwitcherComponent.__docgenInfo = {
  props: {
    open: {
      description: "{bool} opens the project/account switcher"
    },
    showCaret: {
      description: "shows a caret indicating a flyout in Project Account Switcher"
    },
    activeLabel: {
      description: "Sets the label displayed in the top nav"
    },
    activeImage: {
      description: "Sets the image displayed in the top nav"
    },
    activeType: {
      description: "Sets the type of the item displayed in the top nav"
    },
    onClickOutside: {
      description: "Calls the provided callback when the switcher is open and the user clicks outside the switcher"
    },
    onClick: {
      description: "Calls the provided callback when user clicks on the switcher in the top nav"
    },
    children: {
      description: "support adding Project and Account"
    }
  }
};

export default ProjectAccountSwitcherComponent;
