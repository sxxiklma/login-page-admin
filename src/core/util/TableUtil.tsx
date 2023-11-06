// import { Button } from "@mui/material";
// import type { InputRef } from "antd";
import React from "react";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface td {
  columns: any;
  rows: any;
  columnVisibilityModel?: object;
}

export function convertForTable(obj) {
  var tableData: td = { columns: [], rows: [] };
  // const renderDetailsButton = (params) => {
  //     return (
  //         <strong>
  //             <Button
  //                 variant="contained"
  //                 color="primary"
  //                 size="small"
  //                 // style={{ marginLeft: 16 }}
  //                 onClick={() => { console.log(params) }}
  //             >
  //                 More Info
  //             </Button>
  //         </strong>
  //     )
  // }

  if (Array.isArray(obj)) {
    var item = obj[0];
    var keys = Object.keys(item);
    var cols: any = [];
    console.log(keys);
    keys.map((i) => {
      cols.push({ id: i, label: i, field: i, headerName: i });
      console.log(i);
    });
    // cols.push({ field: '', header: 'actions', renderCell: renderDetailsButton });
    // keys.forEach((i) => {
    //     cols.push[{ id: i, label: i }]
    // })

    tableData.columns = cols;
    tableData.rows = obj;
    // var x = obj.map((item) => ({ ...item, action: Button }))
    // console.log(x);

    // tableData.rows = obj.map((item) => ({ ...item, action: Button }))
  } else {
    var keys = Object.keys(obj);
    var cols: any = [];
    keys.map((i) => {
      cols.push({ id: i, label: i, field: i, headerName: i });
    });
    // keys.forEach((i) => {
    //     cols.push[{ id: i, label: i }]
    // })
    // cols.push({ field: 'actions', header: '' });

    tableData.columns = cols;
    tableData.rows = [obj];

    // tableData.rows = [{ ...obj, action: <Button /> }];
  }

  // tableData.initialState = {
  //     columns: {
  //         columnVisibilityModel: { 'id': false }
  //     }
  // }

  // tableData.columnVisibilityModel = {
  //     columnVisibilityModel: { 'id': false }

  // }

  tableData.columnVisibilityModel = { id: false };

  return tableData;
}

export function convertForTableAnt(obj, params) {
  var tableData: td = { columns: "", rows: [] };
  const [
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
  ] = params;
  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  // const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, color: "#111111", backgroundColor: "skyblue" }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // const renderDetailsButton = (params) => {
  //     return (
  //         <strong>
  //             <Button
  //                 variant="contained"
  //                 color="primary"
  //                 size="small"
  //                 // style={{ marginLeft: 16 }}
  //                 onClick={() => { console.log(params) }}
  //             >
  //                 More Info
  //             </Button>
  //         </strong>
  //     )
  // }

  if (Array.isArray(obj)) {
    var item = obj[0];
    var keys = Object.keys(item);
    var cols: any = [];
    keys.map((i) => {
      if (typeof item[i] == "number") {
        cols.push({
          key: i,
          dataIndex: i,
          title: toSentence(i),
          ...getColumnSearchProps(i),
          sorter: (a, b) => (a[i] ? a[i] : -1) - (b[i] ? b[i] : -1),
          sortDirections: ["descend", "ascend"],
        });
      } else if (typeof item[i] == "string") {
        cols.push({
          key: i,
          dataIndex: i,
          title: toSentence(i),
          ...getColumnSearchProps(i),
          sorter: (a, b) => (a[i] ? a[i] : "").localeCompare(b[i] ? b[i] : ""),
          sortDirections: ["descend", "ascend"],
        });
      } else {
        cols.push({
          key: i,
          dataIndex: i,
          title: toSentence(i),
          ...getColumnSearchProps(i),
        });
      }
    });

    // keys.map((i) => {
    //   console.log(typeof item[i]);
    // });
    // cols.push({ field: '', header: 'actions', renderCell: renderDetailsButton });
    // keys.forEach((i) => {
    //     cols.push[{ id: i, label: i }]
    // })

    tableData.columns = cols;
    tableData.rows = obj;
    // var x = obj.map((item) => ({ ...item, action: Button }))
    // console.log(x);

    // tableData.rows = obj.map((item) => ({ ...item, action: Button }))
  } else {
    var keys = Object.keys(obj);
    var cols: any = [];
    keys.map((i) => {
      cols.push({
        key: i,
        dataIndex: i,
        title: toSentence(i),
        ...getColumnSearchProps(i),
      });
    });
    // keys.forEach((i) => {
    //     cols.push[{ id: i, label: i }]
    // })
    // cols.push({ field: 'actions', header: '' });

    tableData.columns = cols;
    tableData.rows = [obj];

    // tableData.rows = [{ ...obj, action: <Button /> }];
  }

  // tableData.initialState = {
  //     columns: {
  //         columnVisibilityModel: { 'id': false }
  //     }
  // }

  // tableData.columnVisibilityModel = {
  //     columnVisibilityModel: { 'id': false }

  // }

  tableData.columnVisibilityModel = { id: false };

  return tableData;
}

function toSentence(str: string): string {
  const result = str.replace(/([A-Z])/g, " $1");

  // converting first character to uppercase and join it to the final string
  const final = result.charAt(0).toUpperCase() + result.slice(1);
  return final;
}
