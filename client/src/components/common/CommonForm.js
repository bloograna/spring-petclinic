import React from 'react';
import PropTypes from 'prop-types';
import { form2js } from 'form2js';
import { Form as RBSForm } from 'react-bootstrap';

class CommonForm extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    onChange: () => {}
  };

  onSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    const formData = form2js(e.currentTarget) || {};
    onSubmit(formData, e);
  };

  onChange = e => {
    const { onChange } = this.props;
    const formData = form2js(e.currentTarget) || {};
    onChange(formData, e);
  };

  render() {
    const { formValidated } = this.props;
    return (
      <RBSForm
        noValidate
        validated={formValidated}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      >
        {this.props.children}
      </RBSForm>
    );
  }
}

CommonForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default CommonForm;
