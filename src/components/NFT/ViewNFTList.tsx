import { useFetchMyNFT } from "../../lib/hooks/useFetchMyNFT";
import TableExpandable from "../../components/Table/TableExpandable";
import shortenHex from "../common/shortenHex";
import TableStyles from "../../components/Table/table.module.css";
import { Link } from "react-router-dom";

export const ViewNFTList = () => {
  const { nFTData } = useFetchMyNFT();

  const getColumns = () => [
    {
      dataField: "isMinted",
      text: "Is Minted",
      align: "left",
    },
    {
      dataField: "isAssetReady",
      text: "Is Asset Prepared",
      align: "left",
    },
    {
      dataField: "ipfsHash",
      text: "View details",
      formatter: (ipfsHash: string) => {
        return (
          <>
            <Link to={`/nft/detail/${ipfsHash}`} data-testid={`nft-detail`}>
              {shortenHex(ipfsHash)}
            </Link>
          </>
        );
      },

      align: "left",
    },
  ];

  return (
    <>
      <TableExpandable
        keyField="id"
        data={nFTData}
        columns={getColumns()}
        tableStyle={TableStyles.greenTable}
      />
    </>
  );
};
