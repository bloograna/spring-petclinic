import React, { Component } from 'react';
import { FormControl, Dropdown, Button, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
      'aria-labelledby': labeledBy,
      onClear
    } = this.props;

    const { value } = this.state;

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <Form.Group as={Row} controlId="horizontal-input">
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={this.handleChange}
            value={value}
          />
          {onClear ? (
            <FontAwesomeIcon icon={faTimesCircle} onClick={onClear} />
          ) : null}
        </Form.Group>
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
  onSelect = event => {
    const { onClick } = this.props;
    const id = event.currentTarget.getAttribute('name');
    onClick(parseInt(id, 10));
  };

  renderItems = () => {
    const { dropdownOptions } = this.props;
    return dropdownOptions.map(option => (
      <Dropdown.Item
        key={`dropdown-option-${option.name}-${option.id}`}
        onClick={this.onSelect}
        name={option.id}
      >
        {option.name}
      </Dropdown.Item>
    ));
  };

  render() {
    const { title, onClear } = this.props;
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu} onClear={onClear}>
          {this.renderItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownSearch;
