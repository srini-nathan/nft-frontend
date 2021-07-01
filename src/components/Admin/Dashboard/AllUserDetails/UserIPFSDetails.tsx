import { useEffect, useState } from "react";
import { GetUserIPFSByNftId_getUserIPFSByNftId } from "../../../../graphql/queries/__generated__/GetUserIPFSByNftId";
import { useFetchUserIPFSBynFTId } from "../../../../lib/hooks/useFetchUserIPFSBynFTId";
import TableExpandable from "../../../../components/Table/TableExpandable";
import TableStyles from "../../../../components/Table/table.module.css";
import { VerifyAndSetupMinterRole } from "./VerifyAndSetupMinterRole";

export const UserIPFSDetails = ({ nFTId }: { nFTId: string }) => {
  const { loading, data } = useFetchUserIPFSBynFTId(nFTId);

  const [userIPFSInfo, setUserIPFSInfo] = useState<
    (GetUserIPFSByNftId_getUserIPFSByNftId | null)[]
  >([]);

  useEffect(() => {
    if (data && data.getUserIPFSByNftId) {
      const userIPFSDetails = data.getUserIPFSByNftId ?? [];
      setUserIPFSInfo(userIPFSDetails);
    }
    if (loading) return;
  }, [data, loading]);

  const getColumns = () => [
    {
      dataField: "walletAddress",
      text: "",
      align: "left",
      formatter: (walletAddress: string) => {
        return <VerifyAndSetupMinterRole accountAddress={walletAddress} />;
      },
    },
  ];

  return (
    <TableExpandable
      keyField="id"
      data={userIPFSInfo}
      columns={getColumns()}
      tableStyle={TableStyles.greenTable}
    />
  );
};
