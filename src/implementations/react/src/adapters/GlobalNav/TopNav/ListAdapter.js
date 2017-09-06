import * as PropTypes from "prop-types";
import HIGElement from "../../../elements/HIGElement";
import HIGNodeList from "../../../elements/HIGNodeList";
import HIGChildValidator from "../../../elements/HIGChildValidator";
import createComponent from "../../createComponent";

import AccountComponent, { AccountAdapter } from "./AccountAdapter";
import ProjectComponent, { ProjectAdapter } from "./ProjectAdapter";
import Project from "../../../elements/components/GlobalNav/TopNav/Project";
import Account from "../../../elements/components/GlobalNav/TopNav/Account";

export class ListAdapter extends HIGElement {
  constructor(HIGConstructor, initialProps) {
    super(HIGConstructor, initialProps);

    this.accounts = new HIGNodeList({
      AccountAdapter: {
        type: AccountAdapter,
        HIGConstructor: this.hig.partials.Item,
        onAdd: (instance, beforeInstance) => {
          this.hig.addList(instance, beforeInstance);
        }
      }
    });

    this.projects = new HIGNodeList({
      ProjectAdapter: {
        type: ProjectAdapter,
        HIGConstructor: this.hig.partials.Item,
        onAdd: (instance, beforeInstance) => {
          this.hig.addList(instance, beforeInstance);
        }
      }
    });
  }

  componentDidMount() {
    this.accounts.componentDidMount();
    this.projects.componentDidMount();
    this.commitUpdate(this.props);
  }

  insertBefore(instance, beforeChild = {}) {
    if (instance instanceof AccountAdapter) {
      this.accounts.insertBefore(instance);
    } else if (instance instanceof ProjectAdapter) {
      this.projects.insertBefore(instance);
    } else {
      throw new Error(
        `${this.constructor.name} cannot have a child of type ${instance.constructor.name}`
      );
    }
  }
}

const ListComponent = createComponent(
  ListAdapter
);

ListComponent.propTypes = {
  children: HIGChildValidator([
    Account,
    Project,
    AccountComponent,
    ProjectComponent
  ])
};

ListComponent.Account = AccountComponent;
ListComponent.Project = ProjectComponent;


export default ListComponent;
