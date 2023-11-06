import React, { useEffect, useState, useContext, useRef } from "react";
import StyledTable from "../../components/StyledTable";
import { convertForTable, convertForTableAnt } from "../../util/TableUtil";
import { DataGrid } from "@mui/x-data-grid";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { BackboneContext } from "../../../Context";
import StyledDialog from "../../components/StyledDialog";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Table, Space, Form, Input } from "antd";
import type { InputRef } from "antd";
import dayjs from "dayjs";

interface ContractType {
  approvalStatus: string;
  awardDate: string;
  contractRef: string;
  contractTitle: string;
  contractTypeId: number;
  expectedCompletionDate: string;
  hibernateLazyInitializer: object;
  id: number;
  totalContractValue: number;
  vendorId: number;
}

const ManageContracts = () => {
  const [myContracts, setMyContracts] = useState({ columns: [], rows: [] });
  const [myContractsAnt, setMyContractsAnt] = useState({
    columns: [],
    rows: [],
  });

  const [contractDetailsForm] = Form.useForm();

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRecord, setCurrentRecord] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenAnt, setDialogOpenAnt] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [contractTypes, setContractTypes] = useState<any[]>([]);
  const [vendorNameDialog, setVendorNameDialog] = useState();

  const columns = [
    { id: "id", label: "Project ID" },
    { id: "projectname", label: "Project Name" },
    { id: "projectref", label: "Project Reference" },
    { id: "projectmanager", label: "Project Manager" },
    { id: "awarddate", label: "Project Award Date" },
  ];

  const rows = [
    {
      id: "1",
      projectname: "Project Name",
      projectref: "0001",
      projectmanager: "PM",
      awarddate: "01-OCT-2022",
    },
    {
      id: "2",
      projectname: "Project Name",
      projectref: "0001",
      projectmanager: "PM",
      awarddate: "01-OCT-2022",
    },
    {
      id: "3",
      projectname: "Project Name",
      projectref: "0001",
      projectmanager: "PM",
      awarddate: "01-OCT-2022",
    },
    {
      id: "4",
      projectname: "Project Name",
      projectref: "0001",
      projectmanager: "PM",
      awarddate: "01-OCT-2022",
    },
    {
      id: "5",
      projectname: "Project Name",
      projectref: "0001",
      projectmanager: "PM",
      awarddate: "01-OCT-2022",
    },
    {
      id: "6",
      projectname: "Project Name",
      projectref: "0001",
      projectmanager: "PM",
      awarddate: "01-OCT-2022",
    },
  ];

  const onSubmit = (data) => console.log(data);

  const renderDetailsButtonAnt = (record) => {
    return (
      <>
        <Space size="middle">
          {/* <strong> */}
          <a
            className=" text-black hover:text-black bg-slate-200 hover:bg-green-400 rounded-sm px-1"
            onClick={() => {
              setCurrentRecord(record);
              contractDetailsForm.setFieldsValue({
                ...record,
              });
              setDialogOpenAnt(true);
              console.log(record);
              console.log(selected);
              reset({});
            }}
          >
            View
          </a>
          {/* </strong> */}

          {/* <strong> */}
          <a
            className=" text-black hover:text-black bg-slate-200 hover:bg-green-400 rounded-sm px-1"
            onClick={() => {
              // console.log(params)
              navigate(`/contracts/edit`, {
                state: {
                  data: record,
                },
              });
            }}
          >
            Edit
          </a>
          {/* </strong> */}
        </Space>
        <div>
          <a
            style={{ display: "inline" }}
            className="whitespace-nowrap text-black hover:text-black bg-slate-200 hover:bg-green-400 rounded-sm px-1"
            onClick={() => {
              navigate(`/contracts/logs`, {
                state: {
                  data: record,
                },
              });
            }}
          >
            View Timeline
          </a>
        </div>
      </>
    );
  };

  useEffect(() => {
    var contractsAnt = convertForTableAnt(rows, [
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn,
      searchInput,
    ]);

    contractsAnt.columns.push({
      key: "actions",
      title: "Actions",
      width: 200,
      render: (_, record) => renderDetailsButtonAnt(record),
      // disableClickEventBubbling: true,
    });

    setLoading(false);
    setMyContractsAnt(contractsAnt);
    // console.log(contractsAnt.columns);
  }, []);

  return (
    <div className=" h-full w-full">
      <Typography variant="h4">Manage Contracts</Typography>
      <div className=" h-full w-full overflow-scroll overflow-y-hidden mt-5">
        <Table
          className="w-full"
          columns={myContractsAnt.columns}
          dataSource={myContractsAnt.rows}
          size="small"
          // pagination={{  }}
        />
      </div>

      <StyledDialog
        dialogOpen={dialogOpenAnt}
        setDialogOpen={setDialogOpenAnt}
        closable={true}
        title="Contract Details"
      >
        <DialogContent dividers>
          <Form
            form={contractDetailsForm}
            onFinish={onSubmit}
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            layout="vertical"
            disabled
          >
            <Form.Item<ContractType> label="Contract ID" {...register("id")}>
              <Input
                disabled
                style={{ color: "#5A5A5A" }}
                // readOnly
              />
            </Form.Item>

            <Form.Item<ContractType>
              label="Contract Title"
              style={{
                display: "inline-block",
                width: "calc(49% - 8px)",
              }}
              {...register("contractTitle")}
            >
              <Input style={{ color: "#5A5A5A" }} />
            </Form.Item>

            <Form.Item<ContractType>
              label="Contract Ref"
              style={{
                display: "inline-block",
                width: "calc(49% - 8px)",
                margin: "0 8px",
              }}
              {...register("contractRef")}
            >
              <Input style={{ color: "#5A5A5A" }} />
            </Form.Item>

            <Form.Item<ContractType>
              label="Vendor"
              style={{
                display: "inline-block",
                width: "calc(49% - 8px)",
                color: "#5A5A5A",
                maxWidth: "calc(49% - 8px)",
              }}
              {...register("vendorId")}
            >
              <Input prefix={vendorNameDialog} style={{ color: "#5A5A5A" }} />
            </Form.Item>

            <Form.Item<ContractType>
              label="Contract Type"
              style={{
                display: "inline-block",
                width: "calc(49% - 8px)",
                maxWidth: "calc(49% - 8px)",

                margin: "0 8px",
                color: "#5A5A5A",
              }}
              {...register("contractTypeId")}
            >
              <Input
                prefix={
                  contractTypes.length > 0 &&
                  contractTypes
                    .filter(
                      (x) =>
                        x.id == (currentRecord as ContractType).contractTypeId
                    )
                    .map((x) => x["contractType"])
                }
                style={{ color: "#5A5A5A" }}
              />
            </Form.Item>

            <Form.Item<ContractType>
              label="Award Date"
              style={{
                display: "inline-block",
                width: "calc(49% - 8px)",
                color: "#5A5A5A",
              }}
              {...register("awardDate")}
            >
              <Input
                type="datetime-local"
                // defaultValue={"2023-01-01"}
                style={{ color: "#5A5A5A" }}
              />
            </Form.Item>

            <Form.Item<ContractType>
              label="Expected Completion Date"
              style={{
                display: "inline-block",
                width: "calc(49% - 8px)",
                margin: "0 8px",
                color: "#5A5A5A",
              }}
              {...register("expectedCompletionDate")}
            >
              <Input type="datetime-local" style={{ color: "#5A5A5A" }} />
            </Form.Item>

            <Form.Item<ContractType>
              label="Total Contract Value"
              {...register("totalContractValue")}
            >
              <Input addonBefore="₦" style={{ color: "#5A5A5A" }} />
            </Form.Item>

            {/* <div className="w-full">
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </div> */}
          </Form>
        </DialogContent>
      </StyledDialog>
    </div>
  );
};

export default ManageContracts;
