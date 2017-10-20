import React from "react";
import { TextField } from "../hig-react";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class FormattedNumberField extends React.Component {
  state = { number: "" };

  setNumber = event => {
    // Strips out all characters other than numbers
    // then places commas in the appropriate places
    const formattedNumber = numberWithCommas(
      event.target.value.replace(/\D/g, "")
    );
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

export default FormattedNumberField;
