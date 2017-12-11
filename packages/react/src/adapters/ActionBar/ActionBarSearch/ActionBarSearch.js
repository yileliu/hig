import React from "react";
import PropTypes from "prop-types";
import { ActionBarSearch as ActionBarSearchVanilla } from "hig-vanilla";
import HIGAdapter, {
  MapsPropToMethod,
  MapsEventListener,
  MountedByHIGParent,
  ControlsProp
} from "../../HIGAdapter";

function ActionBarSearchAdapter(props) {
  return (
    <HIGAdapter
      displayName="Search"
      HIGConstructor={ActionBarSearchVanilla}
      {...props}
    >
      {adapterProps => (
        <div>
          <MapsPropToMethod
            value={props.icon}
            setter="setIcon"
            {...adapterProps}
          />
          <MapsPropToMethod
            value={props.placeholder}
            setter="setPlaceholder"
            {...adapterProps}
          />
          <ControlsProp
            listener="onInput"
            handler={props.onInput}
            value={props.value}
            setter="setValue"
            {...adapterProps}
          />
          <MapsPropToMethod value={props.clearIconVisible} {...adapterProps}>
            {(instance, value) =>
              value ? instance.showClearIcon() : instance.hideClearIcon()}
          </MapsPropToMethod>
          <MapsEventListener
            listener="onFocusOut"
            handler={props.onBlur}
            {...adapterProps}
          />
          <MapsEventListener
            listener="onFocusIn"
            handler={props.onFocus}
            {...adapterProps}
          />
          <MapsEventListener
            listener="onClearIconClick"
            handler={props.onClearIconClick}
            {...adapterProps}
          />
          <MountedByHIGParent mounter="addSearch" {...adapterProps} />
        </div>
      )}
    </HIGAdapter>
  );
}

ActionBarSearchAdapter.propTypes = {
  onInput: PropTypes.func,
  clearIconVisible: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClearIconClick: PropTypes.func
};

ActionBarSearchAdapter.defaultProps = {
  onInput: undefined,
  clearIconVisible: undefined,
  onBlur: undefined,
  onFocus: undefined,
  icon: undefined,
  placeholder: undefined,
  value: undefined,
  onClearIconClick: undefined
};

export default ActionBarSearchAdapter;
