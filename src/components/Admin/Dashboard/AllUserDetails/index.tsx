import { useState } from "react";
import { useEffect } from "react";
import {
  GetAllUser_getAllUser,
  GetAllUser_getAllUser_nft,
} from "../../../../graphql/queries/__generated__/GetAllUser";
import { useFetchAllUserDetails } from "../../../../lib/hooks/useFetchAllUserDetails";
import TableExpandable from "../../../Table/TableExpandable";
import TableStyles from "../../../../components/Table/table.module.css";
import { UserIPFSDetails } from "./UserIPFSDetails";

export const AllUserDetails = () => {
  const { data, loading } = useFetchAllUserDetails();
  const [userInfo, setUserInfo] = useState<(GetAllUser_getAllUser | null)[]>(
    []
  );

  useEffect(() => {
    if (data && data.getAllUser) {
      const userDetails = data.getAllUser ?? [];
      setUserInfo(userDetails);
    }
    if (loading) return;
  }, [data, loading]);

  console.log(userInfo);

  const getColumns = () => [
    {
      dataField: "email",
      text: "email",
      align: "left",
    },
    {
      dataField: "role",
      text: "Role",
      align: "left",
    },
    {
      dataField: "nft",
      text: "Wallet Information",
      align: "left",
      formatter: (values: GetAllUser_getAllUser_nft) => {
        console.log(values);

        return <UserIPFSDetails nFTId={values?.id ?? ""} />;
      },
    },
  ];

  return (
    <TableExpandable
      keyField="id"
      data={userInfo}
      columns={getColumns()}
      tableStyle={TableStyles.greenTable}
    />
  );
};
