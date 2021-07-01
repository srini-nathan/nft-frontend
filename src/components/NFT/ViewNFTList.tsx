import { useFetchMyNFT } from "../../lib/hooks/useFetchMyNFT";
import TableExpandable from "../../components/Table/TableExpandable";
import shortenHex from "../common/shortenHex";
import TableStyles from "../../components/Table/table.module.css";
import { Link } from "react-router-dom";
import { VerifyNFTStatus } from "./VerifyNFTStatus";

export const ViewNFTList = () => {
  const { nFTData } = useFetchMyNFT();

  const getColumns = () => [
    
    {
      dataField: "assetIndex",
      text: "Status",
      align: "left",
      formatter:(assetIndex:string) => {
        return <VerifyNFTStatus assetIndex={assetIndex} />
      }
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
    <h3>NFT Assets</h3>
      <TableExpandable
        keyField="id"
        data={nFTData}
        columns={getColumns()}
        tableStyle={TableStyles.greenTable}
      />
    </>
  );
};
