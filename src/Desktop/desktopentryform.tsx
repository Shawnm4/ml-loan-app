import Input from "../Input";
import {
  DownOutlined,
  InfoCircleOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space, Tooltip, MenuProps } from "antd";
import { useEffect, useState } from "react";
import useApprovalReq from "../Hooks/sendApprovalReq";
import { EColors } from "../EColors";
import Spinner from "../Spinner";

type InputState = {
  meets_criteria: string | null;
  purpose: string | null;
  interest_rate: string | null;
  installments_owed: string | null;
  annual_income_log: string | null;
  debt_to_income_ratio: string | null;
  fico_score: string | null;
  cr_line: string | null;
  revolving_balance: string | null;
  rur: string | null;
  number_of_inquiries: string | null;
  delinq_2_years: string | null;
  derogatory_records: string | null;
};

interface ResponseData {
  prediction: string;
}

export default function DesktopEntryForm() {
  const initialState = {
    meets_criteria: "",
    purpose: "",
    interest_rate: "",
    installments_owed: "",
    annual_income_log: "",
    debt_to_income_ratio: "",
    fico_score: "",
    cr_line: "",
    revolving_balance: "",
    rur: "",
    number_of_inquiries: "",
    delinq_2_years: "",
    derogatory_records: "",
  };

  const [input, setInput] = useState<InputState>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [testData, setTestData] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const {
    mutate: sendApproval,
    isPending,
    isError,
    data: resData,
  } = useApprovalReq();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = [];
    data[0] = Number(input.meets_criteria);
    data[1] = input.purpose;
    data[2] = input.interest_rate;
    data[3] = input.installments_owed;
    data[4] = input.annual_income_log;
    data[5] = input.debt_to_income_ratio;
    data[6] = input.fico_score;
    data[7] = input.cr_line;
    data[8] = input.revolving_balance;
    data[9] = input.rur;
    data[10] = input.number_of_inquiries;
    data[11] = input.delinq_2_years;
    data[12] = input.derogatory_records;
    setTestData(data);
  }, [input]);
  function handleSubmit() {
    if (testData.length === 13) {
      sendApproval({ features: testData });
      setInput(initialState);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (key: string) => (e: any) => {
    let value = e.target.value;

    const numberKeys = [
      "interest_rate",
      "installments_owed",
      "annual_income_log",
      "debt_to_income_ratio",
      "fico_score",
      "cr_line",
      "revolving_balance",
      "number_of_inquiries",
      "delinq_2_years",
      "derogatory_records",
    ];

    if (numberKeys.includes(key)) {
      value = parseFloat(value);
    }

    setInput((i) => ({ ...i, [key]: value }));
  };

  useEffect(() => {
    setResponseData(resData);
  }, [resData]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const criteriaItems: MenuProps["items"] = [
    {
      label: "Yes",
      key: 1,
    },
    {
      label: "No",
      key: 0,
    },
  ];

  const purposeItems: MenuProps["items"] = [
    {
      label: "Debt Consolidation",
      key: "debt_consolidation",
    },
    {
      label: "Credit Card",
      key: "credit_card",
    },
    {
      label: "Other",
      key: "all_other",
    },
    {
      label: "Home Improvement",
      key: "home_improvement",
    },
    {
      label: "Small Business",
      key: "small_business",
    },
    {
      label: "Major Purchase",
      key: "major_purchase",
    },
    {
      label: "Educational",
      key: "educational",
    },
  ];

  const handleCriteriaClick: MenuProps["onClick"] = (e) => {
    setInput((i) => ({ ...i, meets_criteria: e.key }));
  };

  const handlePurposeClick: MenuProps["onClick"] = (e) => {
    setInput((i) => ({ ...i, purpose: e.key }));
  };

  const criteriaMenuProps = {
    items: criteriaItems,
    onClick: handleCriteriaClick,
  };

  const purposeMenuProps = {
    items: purposeItems,
    onClick: handlePurposeClick,
  };

  return (
    <section className="flex justify-center ">
      <div
        style={{ backgroundColor: "white" }}
        className="flex justify-center items-center w-11/12 h-auto mt-12 rounded-md drop-shadow-xl p-12 "
      >
        <div className="grid grid-cols-5 grid-rows-3 gap-12   ">
          <div className="flex gap-1 items-center">
            <Tooltip title="credit.policy">
              <InfoCircleOutlined />
            </Tooltip>
            <Dropdown menu={criteriaMenuProps}>
              <Button>
                <Space>
                  Meets Credit Criteria?
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="flex gap-1 items-center">
            <Tooltip title="purpose">
              <InfoCircleOutlined />
            </Tooltip>
            <Dropdown menu={purposeMenuProps}>
              <Button>
                <Space>
                  Purpose?
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="int.rate">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Interest Rate</div>
              <Input
                value={input.interest_rate || ""}
                type="number"
                onChange={handleInputChange("interest_rate")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="installment">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Installments Owed</div>

              <Input
                value={input.installments_owed || ""}
                type="number"
                onChange={handleInputChange("installments_owed")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="log.annual.inc">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Annual Income Log</div>
              <Input
                value={input.annual_income_log || ""}
                type="number"
                onChange={handleInputChange("annual_income_log")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="dti">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Debt to Income Ratio</div>
              <Input
                value={input.debt_to_income_ratio || ""}
                type="number"
                onChange={handleInputChange("debt_to_income_ratio")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="fico">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">FICO Score</div>
              <Input
                value={input.fico_score || ""}
                type="number"
                onChange={handleInputChange("fico_score")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="days.with.cr.line">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Days With CR Line</div>
              <Input
                value={input.cr_line || ""}
                type="number"
                onChange={handleInputChange("cr_line")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="revol.bal">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold"> Revolving Balance</div>
              <Input
                value={input.revolving_balance || ""}
                type="number"
                onChange={handleInputChange("revolving_balance")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="revol.util">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Revolving Util Rate</div>
              <Input
                value={input.rur || ""}
                type="number"
                onChange={handleInputChange("rur")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="inq.last.6mths">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Number of Inquiries</div>
              <Input
                value={input.number_of_inquiries || ""}
                type="number"
                onChange={handleInputChange("number_of_inquiries")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="delinq.2yrs">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Delinq 2 Years</div>
              <Input
                value={input.delinq_2_years || ""}
                type="number"
                onChange={handleInputChange("delinq_2_years")}
              />
            </div>
          </div>
          <div className="w-52 flex gap-1 items-center">
            <div className="self-end">
              <Tooltip title="pub.rec">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div>
              <div className="font-extrabold">Derogatory Records</div>
              <Input
                value={input.derogatory_records || ""}
                type="number"
                onChange={handleInputChange("derogatory_records")}
              />
            </div>
          </div>
          <Button
            style={{
              backgroundColor: EColors.primary,
              height: "3rem",
              fontFamily: "Inter",
            }}
            onClick={handleSubmit}
            className="font-extrabold"
          >
            Predict Loan Approval
          </Button>
          {!isError ? (
            <Spinner spinning={isPending}>
              {responseData && (
                <div className="font-extrabold">
                  {responseData?.prediction == "0"
                    ? "Loan Approved"
                    : "Loan Not Approved"}
                </div>
              )}
            </Spinner>
          ) : (
            <div className="flex">
              <FrownOutlined />
              <div>Failed to load result </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
