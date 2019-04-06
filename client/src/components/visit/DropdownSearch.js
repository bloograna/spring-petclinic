import React, { Component } from 'react';
import { FormControl, Dropdown, Button } from 'react-bootstrap';

class CustomToggle extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    return (
      <Button variant="outline-dark" onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
}

class CustomMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { value: '' };
  }

  handleChange = e => {
    this.setState({ value: e.target.value.toLowerCase().trim() });
  };

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy
    } = this.props;

    const { value } = this.state;

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().includes(value)
          )}
        </ul>
      </div>
    );
  }
}

class DropdownSearch extends Component {
  renderItems = () => {
    const { dropdownOptions, onClick } = this.props;
    return dropdownOptions.map(option => (
      <Dropdown.Item
        key={`dropdown-option-${option.name}-${option.id}`}
        onClick={onClick}
        name={option.id}
      >
        {option.name}
      </Dropdown.Item>
    ));
  };

  render() {
    const { title } = this.props;
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>{this.renderItems()}</Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownSearch;
