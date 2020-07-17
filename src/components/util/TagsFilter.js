import React, { useState } from 'react';
import {
  Space, Button, Select,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const TagsFilter = ({
  tags, onFilter, onReset, confirm,
}) => {
  const [state, setState] = useState({
    filters: [],
  });
  const options = (tags || []).map((tag) => (
    <Option key={tag}>{tag}</Option>
  ));
  const handleChange = (value) => {
    setState({ filters: value });
  };

  return (
    <div className="filter-dropdown">
      <Select
        mode="tags"
        style={{ width: '100%' }}
        value={state.filters}
        onChange={handleChange}
      >
        {options}
      </Select>
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => {
            confirm();
            onFilter(state.filters);
          }}
        >
          Search
        </Button>
        <Button onClick={() => {
          setState({ filters: [] });
          onReset();
        }}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
};

export default TagsFilter;
