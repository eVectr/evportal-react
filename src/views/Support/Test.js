import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

class SearchableSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.defaultValue
    };
    this.getOptions = this.getOptions.bind(this);
  }

  handleChange = selectedOption => {
    this.setState({
      selectedOption: selectedOption
    });
    if (this.props.actionOnSelectedOption) {
      this.props.actionOnSelectedOption(selectedOption.value);
    }
  };

  mapOptionsToValues = options => {
    return options.map(option => ({
      value: option.id,
      label: option.name
    }));
  };

  getOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([]);
    }

    const searchApiUrl = "https://evportal.bashton.ca/api/test";
    const limit = this.props.limit || process.env['REACT_APP_DROPDOWN_ITEMS_LIMIT'] || 5;
    const queryAdder = searchApiUrl.indexOf('?') === -1 ? '?' : '&';
    const fetchURL = `${searchApiUrl}${queryAdder}search=${inputValue}&limit=${limit}`;

    fetch(fetchURL).then(response => {
      response.json().then(data => {
        const results = data;
        if (this.props.mapOptionsToValues)
          callback(this.props.mapOptionsToValues(results));
        else callback(this.mapOptionsToValues(results));
      });
    });
  };

  render() {
    const { defaultOptions, placeholder, inputId } = this.props;
    return (
      <AsyncSelect
        inputId={inputId}
        cacheOptions
        value={this.state.selectedOption}
        defaultOptions={defaultOptions}
        loadOptions={this.getOptions}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchableSelect;