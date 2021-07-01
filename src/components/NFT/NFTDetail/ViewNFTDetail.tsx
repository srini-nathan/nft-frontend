import { MetadataJson } from "../../../types/metadata";
import style from "./nFTDetailStyled1.module.css";
import { GoVerified } from "react-icons/go";
import { IoIosDoneAll } from "react-icons/io";
import { SiIpfs } from "react-icons/si";
import { PrepareAssetNFT } from "../PrepareAssetNFT";
import {
  defaultNFTAsset,
  useFetchNFTAsset,
} from "../../../lib/hooks/useFetchNFTAsset";
// import { useFetchMyNFT } from "../../../lib/hooks/useFetchMyNFT";
import { MintNFT } from "../MintNFT";
import shortenHex from "../../common/shortenHex";
import { ListOverMarketPlace } from "../ListOverMarketPlace";
import { useVerifyAssetIsOnSale } from "../../../lib/hooks/useVerifyAssetIsOnSale";
import { ethers } from "ethers";
import { useVerifyAccountHasMintRole } from "../../../lib/hooks/useVerifyAccountHasMintRole";
import { UpdateSellingPrice } from "./UpdateSellingPrice";

export const ViewNFTDetail = ({
  metadataJson,
}: {
  metadataJson: MetadataJson;
}) => {
  const { myNFTAsset, refetch } =
    useFetchNFTAsset(metadataJson.patentId) ?? defaultNFTAsset;

  const { data, loading } = useVerifyAssetIsOnSale(metadataJson.patentId);
  const { data: verifyMintRoleData, loading: verifyMintRoleLoading } =
    useVerifyAccountHasMintRole(myNFTAsset._ownerAddress);

  // const { nFTData } = useFetchMyNFT();

  if (loading || verifyMintRoleLoading) return <></>;

  // const nftDataByFilter = nFTData.find((x) => x.ipfsHash === ipfsHash);

  const owner: string = metadataJson.authentication.creator!.toString();
  const isOnSale = data?.verifyAssetIsOnSale;

  const currentOwnerAddressIsZero =
    myNFTAsset._ownerAddress === ethers.constants.AddressZero;
  const isUserHasMinterRole = verifyMintRoleData?.verifyMintRole ?? false;

  return (
    <>
      <div className="container">
        <div className="row d-md-flex-row  overflow-hidden">
          <div className="col-md-4  p-3 col-12 d-flex overflow-hidden ">
            <div className="card p-0 w-100 h-100 text-light border-0 ">
              <img
                className={`card-img w-100 ${style.shadow}`}
                src={`${metadataJson.image}?fit=fill&q=100&w=2560?fit=fill&q=100&w=2560?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=97bace733cd75edf9ec8b4a2ef1fad7c`}
                alt="Card image"
              />

              <div className="container mb-5 mt-5 bg-light">
                <div className="pricing card-deck flex-column flex-md-row mb-3">
                  <div
                    className={`card ${style.cardPricing} text-center px-3 mb-4 border-0`}
                  >
                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-lg">
                      Digitally Verified :{" "}
                      <GoVerified size="20" color="rgb(126,210,180)" />
                    </span>
                    <div className="bg-transparent card-header pt-4 border-0">
                      <h1
                        className="h1 font-weight-normal text-primary text-center mb-0"
                        data-pricing-value="15"
                      >
                        <span className="price">
                          {myNFTAsset._assetPrice ?? ""}
                        </span>
                        <span className="h6 text-muted ml-2">ETH</span>
                      </h1>
                    </div>

                    <div className="card-body pt-0">
                      <ul className={`${style.listUnstyled} mb-0`}>
                        <li>
                          <SiIpfs size="25" color="rgb(126,210,180)" />{" "}
                          <a
                            href={`${metadataJson.image}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            View On IPFS
                          </a>
                        </li>
                      </ul>
                      <UpdateSellingPrice patentId = {metadataJson.patentId} newPrice={myNFTAsset._assetPrice} isOnSale={isOnSale ?? false}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8  pt-5 pt-md-1  overflow-hidden bg-light">
            <div className="container-fluid p-md-5  align-items-center">
              <div className="row justify-content-md-center">
                <div className="col-md-8">
                  <h3 className="strong">#{metadataJson.patentId}</h3>

                  <h1 className="  mb-5 pt-md-2 pt-sm-4">
                    {metadataJson.name}
                  </h1>
                  <p>{metadataJson.description}</p>
                  <hr />

                  <div>
                    {myNFTAsset._status === "created" &&
                      currentOwnerAddressIsZero && (
                        <PrepareAssetNFT
                          metadataJson={metadataJson}
                          refetch={refetch}
                        />
                      )}

                    {myNFTAsset._status === "created" &&
                      !currentOwnerAddressIsZero && (
                        <MintNFT
                          metadataJson={metadataJson}
                          myNFTAsset={myNFTAsset}
                          refetch={refetch}
                          isUserHasMinterRole={isUserHasMinterRole}
                        />
                      )}

                    {myNFTAsset._status === "minted" && (
                      <ListOverMarketPlace
                        metadataJson={metadataJson}
                        myNFTAsset={myNFTAsset}
                        refetch={refetch}
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-4 pt-md-5">
                  <h5 className="mt-md-4 mb-3 small text-uppercase">
                    <b>Asset Information</b>
                  </h5>
                  <div className="mb-3 mt-2">
                    <span className="stacked-label">
                      {metadataJson.media.dimensions}
                    </span>
                  </div>
                  <div className="mb-3 mt-2">
                    <span className="stacked-label">
                      {metadataJson.media.mimeType}
                    </span>
                  </div>
                  <div className="mb-3 mt-2">
                    <span className="stacked-label">
                      {(metadataJson.media.size ?? 0) / 1000} KB
                    </span>
                  </div>
                  <h5 className="mt-md-5 mb-3 small text-uppercase">
                    <b>Owner</b>
                  </h5>
                  {myNFTAsset._status === "sold" ? (
                    <div className="mb-3 mt-2">
                      {shortenHex(myNFTAsset._ownerAddress)}
                    </div>
                  ) : (
                    <div className="mb-3 mt-2">
                      {shortenHex(myNFTAsset._ownerAddress)}
                      {metadataJson.authentication.creator ===
                      myNFTAsset._ownerAddress ? (
                        <IoIosDoneAll size="25" color="rgb(126,210,180)" />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  <h5 className="mt-md-5 mb-3 small text-uppercase">
                    <b>Status</b>
                  </h5>
                  <div className="mb-3 mt-2">
                    {myNFTAsset._status === "created" &&
                    currentOwnerAddressIsZero
                      ? "Ready"
                      : myNFTAsset._status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
