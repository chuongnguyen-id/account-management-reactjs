import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.min.css";
import { Table, Input, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Contain, BgTable, IconButton, TableWrapper } from "../../styles";
import {
  selectListAccounts,
  selectSelectedRows,
} from "../../redux/selectors/accountSelector";
import {
  getListAccountAction,
  updateSelectedRowsAction,
} from "../../redux/actions/accountActions";
import AccountApi from "../../api/AccountApi";
import CreateUser from "./createUser";

const ListManager = (props) => {
  const data = props.accounts;
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);

  const tableProps = {
    size: "large",
    showHeader: true,
    rowSelection: {},
    tableLayout: undefined,
  };

  const getListAccounts = props.getListAccountAction;
  const { Search } = Input;

  // search
  const onSearch = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = data.filter((entry) =>
      entry.fullName.includes(currValue)
    );
    setDataSource(filteredData);
  };

  const onRefresh = () => {
    props.updateSelectedRowsAction([]);
    setDataSource(data);
    setFilteredInfo({});
    setSortedInfo({});
    getListAccounts();
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // delete
  const handleOnSelect = (row, isSelect) => {
    let selected = props.selectedRows;

    if (isSelect) {
      selected = [...props.selectedRows, row.id];
    } else {
      selected = props.selectedRows.filter((x) => x !== row.id);
    }

    props.updateSelectedRowsAction(selected);
  };

  const handleOnSelectAll = (isSelect, rows) => {
    let selected = props.selectedRows;

    const ids = rows.map((r) => r.id);
    if (isSelect) {
      selected = ids;
    } else {
      selected = [];
    }

    props.updateSelectedRowsAction(selected);
  };

  const deleteUser = async () => {
    if (props.selectedRows.length !== 0) {
      try {
        await AccountApi.deleteByIds(props.selectedRows);
        onRefresh();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Delete Failed");
    }
  };

  useEffect(() => {
    getListAccounts();
  }, [getListAccounts]);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortOrder: sortedInfo.columnKey === "fullName" ? sortedInfo.order : null,
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Manager",
          value: "Manager",
        },
        {
          text: "Employee",
          value: "Employee",
        },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      sortOrder: sortedInfo.columnKey === "userName" ? sortedInfo.order : null,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          onClick={() => setModalUpdateVisible(true)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const tableColumns = columns.map((item) => ({ ...item }));

  return (
    <BgTable bgImg="/assets/banners/home.jpg">
      <Contain>
        <TableWrapper>
          <h1>User Manager</h1>
          <Search
            placeholder="Search FullName"
            value={value}
            onSearch={onSearch}
            onChange={onSearch}
            onPressEnter={onSearch}
            style={{
              width: 200,
              float: "left",
            }}
          />
          <IconButton>
            <Button onClick={onRefresh} icon={<SyncOutlined />}></Button>
            <Button
              onClick={() => setModalCreateVisible(true)}
              icon={<PlusOutlined />}
            ></Button>
            <Button onClick={deleteUser} icon={<DeleteOutlined />}></Button>
          </IconButton>
          <Table
            {...tableProps}
            pagination={{
              position: ["bottomCenter"],
              pageSize: 10,
            }}
            rowKey="id"
            columns={tableColumns}
            dataSource={dataSource}
            onChange={handleChange}
            rowSelection={{
              type: "checkbox",
              clickToSelect: true,
              selections: props.selectedRows,
              onSelect: handleOnSelect,
              onSelectAll: handleOnSelectAll,
            }}
          />
        </TableWrapper>
      </Contain>
      <Modal
        style={{ top: 20 }}
        width={400}
        visible={modalCreateVisible}
        onOk={() => setModalCreateVisible(false)}
        onCancel={() => setModalCreateVisible(false)}
      >
        <CreateUser />
      </Modal>
      <Modal
        title="Update User"
        centered
        visible={modalUpdateVisible}
        onOk={() => setModalUpdateVisible(true)}
        onCancel={() => setModalUpdateVisible(false)}
      ></Modal>
    </BgTable>
  );
};

const mapGlobalStateToProps = (state) => {
  return {
    accounts: selectListAccounts(state),
    selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, {
  getListAccountAction,
  updateSelectedRowsAction,
})(ListManager);
