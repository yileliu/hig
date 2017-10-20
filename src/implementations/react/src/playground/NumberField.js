import React from "react";
import { TextField } from "../hig-react";

class NumberField extends React.Component {
  state = { number: "" };

  setNumber = event => {
    // Strips out all characters other than numbers, comma, and period
    const formattedNumber = event.target.value.replace(/[^0-9.,]/g, "");
    this.setState({ number: formattedNumber });
  };

  render() {
    return (
      <TextField
        {...this.props}
        value={this.state.number}
        onInput={this.setNumber}
      />
    );
  }
}

export default NumberField;
