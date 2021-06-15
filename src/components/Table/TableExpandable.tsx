import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

interface TableProps {
  data: any[];
  columns: ColumnDescription<any, any>[];
  tableStyle: string;
  keyField: string;
  [x: string]: any;
  testid?: string;
}

export const TableExpandable = ({
  t,
  data,
  columns,
  tableStyle,
  keyField,
  testid,
  ...rest
}: TableProps) => {
  if (!data || !data.length) {
    return (
      <p className="risiko" data-testid="no-data-notice">
        "No Data available"
      </p>
    );
  }

  return (
    <div className="table-container" data-testid={testid}>
      <BootstrapTable
        bootstrap4
        keyField={keyField}
        bordered={false}
        hover
        data={data}
        columns={columns}
        headerClasses={tableStyle}
        {...rest}
      />
    </div>
  );
};

export default TableExpandable;
