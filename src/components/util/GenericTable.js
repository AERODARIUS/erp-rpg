import React, { useState, useRef } from 'react';
import {
  Table, Tag, Avatar, Input, Space, Button, InputNumber,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import TagsFilter from './TagsFilter';
import DetailsPopup from './DetailsPopup';
import './GenericTable.scss';

const SearchReslult = ({ text, searchWords }) => {
  const searchWordsList = Array.isArray(searchWords) ? searchWords : [searchWords];

  return (
    <>
      {searchWords && searchWords.length > 0 ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={searchWordsList}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : text}
    </>
  );
};

const textSorter = ({ column, order }) => ({
  compare: (a, b) => {
    if (a[column] === b[column]) {
      return 0;
    }
    if (a[column] > b[column]) {
      return 1;
    }

    return -1;
  },
  multiple: order,
});

const getColumnSorter = ({ type, column, order }) => {
  switch (type) {
    case 'text':
      return textSorter({ type, column });

    case 'link':
      return textSorter({ type, column });

    case 'number':
      return {
        compare: (a, b) => a[column] - b[column],
        multiple: order,
      };

    case 'tags':
      return {
        compare: (a, b) => {
          const setA = new Set(a[column]);
          const setB = new Set(b[column]);

          return setA.size - setB.size;
        },
        multiple: order,
      };

    default:
      return null;
  }
};

const GenericTable = ({ columns, previewInfo, rows }) => {
  const { title, details } = previewInfo || {};
  const [state, setState] = useState({
    filters: new Map(),
  });
  const { filters } = state;

  const getColumnRender = (columnKey, type) => {
    const searchText = filters.get(columnKey);

    switch (type) {
      case 'avatar':
        return (url) => <Avatar src={url} />;

      case 'currency':
        return (currency) => `$${currency}`;

      case 'link':
        return (text, row) => {
          if (!previewInfo) {
            return (
              <a href="/">
                <SearchReslult
                  text={text}
                  searchWords={searchText}
                />
              </a>
            );
          }

          return (
            <DetailsPopup
              title={row[title]}
              details={details.map(({ key, title: label, type: dataType }) => (
                {
                  label,
                  data: row[key],
                  dataType,
                }
              ))}
            >
              <a href="/">
                <SearchReslult
                  text={text}
                  searchWords={searchText}
                />
              </a>
            </DetailsPopup>
          );
        };

      case 'text':
        return (text) => (
          <SearchReslult
            text={`${text}`}
            searchWords={searchText}
          />
        );

      case 'tags':
        return (tags) => {
          if (!tags) {
            return null;
          }

          const tagsSet = new Set();

          return (
            <>
              {tags.map((tag) => {
                if (tagsSet.has(tag)) {
                  return null;
                }

                tagsSet.add(tag);

                return (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                );
              })}
            </>
          );
        };

      default:
        return (any) => any;
    }
  };

  const TextFilter = (key, confirm) => {
    const inputEl = useRef();
    const handleFilter = () => {
      confirm();
      setState(({ filters: filtersMap }) => ({
        filters: new Map(filtersMap.set(key, inputEl.current.state.value.toLowerCase())),
      }));
    };

    return (
      <div className="filter-dropdown">
        <Input
          ref={inputEl}
          styargile={{ width: 188, mnBottom: 8, display: 'block' }}
          onPressEnter={handleFilter}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleFilter}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              confirm();
              setState(({ filters: filtersMap }) => {
                filtersMap.delete(key);
                inputEl.current.setState({ value: '' });

                return {
                  filters: new Map(filtersMap),
                };
              });
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );
  };

  const NumberFilter = (key, confirm) => {
    const inputElMin = useRef();
    const inputElMax = useRef();
    const handleFilter = () => {
      confirm();
      setState(({ filters: filtersMap }) => ({
        filters: new Map(filtersMap.set(key, [
          inputElMin.current.state.value,
          inputElMax.current.state.value,
        ])),
      }));
    };

    return (
      <div className="filter-dropdown">
        <InputNumber
          ref={inputElMin}
          min={0}
          defaultValue=""
          style={{ marginRight: '0.5rem' }}
        />
        <InputNumber
          ref={inputElMax}
          min={0}
          defaultValue=""
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleFilter}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              confirm();
              setState(({ filters: filtersMap }) => {
                filtersMap.delete(key);
                inputElMin.current.setState({ value: '' });
                inputElMax.current.setState({ value: '' });

                return {
                  filters: new Map(filtersMap),
                };
              });
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );
  };

  const parseColumn = ({
    title, key, type, otherProps, tags, customRender,
  }, index) => {
    const column = {
      ...otherProps,
      title,
      dataIndex: key,
      key,
    };

    if (type) {
      const render = getColumnRender(key, type);
      column.render = customRender ? customRender(render) : render;
    }

    if (type === 'text' || type === 'link') {
      column.filterDropdown = ({ confirm }) => TextFilter(key, confirm);
    } else if (type === 'number') {
      column.filterDropdown = ({ confirm }) => NumberFilter(key, confirm);
    } else if (type === 'tags') {
      column.filterDropdown = ({ confirm }) => (
        <TagsFilter
          tags={tags}
          confirm={confirm}
          onFilter={(selectFilters) => setState(({ filters: filtersMap }) => {
            filtersMap.set(key, selectFilters);

            return {
              filters: new Map(filtersMap),
            };
          })}
          onReset={() => {
            setState(({ filters: filtersMap }) => {
              filtersMap.delete(key);

              return {
                filters: new Map(filtersMap),
              };
            });
          }}
        />
      );
    }

    const columnSorter = getColumnSorter({ type, column: key, order: index });

    if (columnSorter) {
      column.sorter = columnSorter;
      column.sortDirections = ['descend', 'ascend'];
    }

    return column;
  };

  const filterRow = (row) => [...filters.keys()].reduce(
    (isFilterMet, key) => {
      const filter = filters.get(key);
      const rowValue = row[key];

      if (Number.isInteger(rowValue)) {
        return filter[0] <= rowValue && rowValue <= filter[1];
      }

      if (Array.isArray(rowValue)) {
        const currentTags = new Set(rowValue);

        return filter.reduce((hasTags, tagFilter) => hasTags && currentTags.has(tagFilter), true);
      }

      return isFilterMet && !!rowValue && rowValue.toLowerCase().includes(filter);
    },
    true,
  );

  const parsedColumns = columns.map(parseColumn);

  return (
    <Table
      dataSource={rows.filter((row) => filterRow(row))}
      columns={parsedColumns}
      className="animate__animated animate__zoomIn"
      pagination={{ position: ['bottomRight', 'topRight'] }}
    />
  );
};

export default GenericTable;
