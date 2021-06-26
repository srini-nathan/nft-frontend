import { ethers } from "ethers";
import { GetMyIpfsHashDetail } from "../../../lib/hooks/useFetchNFTDetail";
import style from "./ViewSaleAssetInfo.module.css";
import { GrDatabase } from "react-icons/gr";
import { SiIpfs } from "react-icons/si";
import { FaWpexplorer } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";
import { GetBaseEtherscanURL } from "../../common/Helper";
import { Link } from "react-router-dom";
export const ViewSaleAssetInfo = ({
  myNFTDetail,
  price,
  ethUSD,
  _ipfsHash,
  tokenId,
  _ownerAddress,
  tokenOwner,
}: {
  myNFTDetail: GetMyIpfsHashDetail;
  price: string;
  ethUSD: number;
  _ipfsHash: string;
  tokenId: string;
  _ownerAddress: string;
  tokenOwner: boolean;
}) => {
  const baseURL = GetBaseEtherscanURL();

  return (
    <>
      <div className="container">
        <div className="card border-0">
          <div className="path">#{myNFTDetail.patentId}</div>
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4">
              {" "}
              <img
                className="img-fluid"
                src={`${myNFTDetail.image}?fit=fill&q=100&w=2560?fit=fill&q=100&w=2560?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=97bace733cd75edf9ec8b4a2ef1fad7c`}
                width="350"
              />{" "}
            </div>
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="row title">
                <div className="col">
                  <h2 style={{ fontWeight: 600, fontSize: "50px" }}>
                    {myNFTDetail.name}
                  </h2>
                </div>

                {/* <div className="col text-right">
                      <a href="#">
                        <i className="fa fa-heart-o"></i>
                      </a>
                    </div> */}
              </div>

              <b>Price</b>
              <div className="d-flex">
                <h2 className="border border-0">{price} ETH</h2>
                <strong>
                  $
                  {(
                    parseFloat(
                      ethers.utils.formatEther(ethers.utils.parseEther(price))
                    ) * ethUSD
                  ).toFixed(2)}
                </strong>
              </div>

              <hr />
              {/* <span className="fa fa-star checked"></span>{" "}
            <span className="fa fa-star checked"></span>{" "}
            <span className="fa fa-star checked"></span>{" "}
            <span className="fa fa-star checked"></span>{" "}
            <span className="fa fa-star-half-full"></span>{" "} */}

              <h6 className="font-weight-bold mb-2">
                <div className=" d-flex justify-content-between">
                  <div>{myNFTDetail.media.mimeType}</div>
                  <div>{myNFTDetail.media.dimensions}</div>
                  <div>{(myNFTDetail.media.size ?? 0) / 1000} KB</div>
                </div>
              </h6>
              <div className={`${style.boxNFT}`}>
                <a
                  href={`${baseURL}/token/${process.env.REACT_APP_ASSET_NFT_ADDRESS}?a=${tokenId}`}
                  className={`${style.aTagNft}`}
                  target="_blank"
                >
                  <span>
                    <div className={`${style.nftCard}`}>
                      <FaWpexplorer /> View on etherscan <BsArrowRightShort />
                    </div>
                  </span>
                </a>

                <a
                  href={myNFTDetail.image}
                  className={`${style.aTagNft} `}
                  target="_blank"
                >
                  <span>
                    <div className={`${style.nftCard}`}>
                      <SiIpfs /> View on IPFS <BsArrowRightShort />
                    </div>
                  </span>
                </a>

                <a
                  href={`${process.env.REACT_APP_PINATA_BASE_URL}${_ipfsHash}`}
                  className={`${style.aTagNft} `}
                  target="_blank"
                >
                  <span>
                    <div className={`${style.nftCard}`}>
                      <GrDatabase /> View IPFS Metadata <BsArrowRightShort />
                    </div>
                  </span>
                </a>
              </div>
              <div className="d-flex justify-content-end mt-3">
                {!tokenOwner ? (
                  <Link
                    className="btn btn-block btn-primary"
                    to={`/nft/${_ownerAddress}/${myNFTDetail.patentId}`}
                  >
                    Buy now
                  </Link>
                ) : (
                  <h5 style={{ color: "black" }}>*It is your token*</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="container">
    //   <div className="row py-3">
    //     <div className="col-lg-6 col-md-6 mb-4">
    //       <div className={`${style.myCard} border-0`}>
    //         <img
    //           src={`${myNFTDetail.image}?fit=fill&q=100&w=2560?fit=fill&q=100&w=2560?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=97bace733cd75edf9ec8b4a2ef1fad7c`}
    //           className={`${style.nftCardImg}`}
    //         />
    //       </div>
    //     </div>
    //     <div className="col-lg-6 col-md-6 mb-4">
    //       <div className="row d-flex justify-content-center">
    //         <h2 style={{ fontWeight: 600, fontSize: "50px" }}>
    //           {myNFTDetail.name}
    //         </h2>
    //       </div>
    //       <br />

    //       <div className={`${style.myCardBody}`}>
    //         <span>
    //           <h6>Price</h6>
    //           <h5 className="border border-0">{price} ETH</h5>
    //         </span>
    //         <span>
    //           <h2>
    //             $
    //             {(
    //               parseFloat(
    //                 ethers.utils.formatEther(ethers.utils.parseEther(price))
    //               ) * ethUSD
    //             ).toFixed(2)}
    //           </h2>
    //         </span>
    //         <h6>Price</h6>
    //         <h5 className="border border-0">{price} ETH</h5>
    //         <hr />
    //         <h2>
    //           $
    //           {(
    //             parseFloat(
    //               ethers.utils.formatEther(ethers.utils.parseEther(price))
    //             ) * ethUSD
    //           ).toFixed(2)}
    //         </h2>
    //         <br />
    //         <h6>Description</h6>
    //         <h6 className="font-weight-bold mb-2">{myNFTDetail.description}</h6>
    //         <hr />
    //         <h6 className="font-weight-bold mb-2">
    //           <div className=" d-flex justify-content-between">
    //             <div>{myNFTDetail.media.mimeType}</div>
    //             <div>{myNFTDetail.media.dimensions}</div>
    //             <div>{(myNFTDetail.media.size ?? 0) / 1000} KB</div>
    //           </div>
    //         </h6>
    //         <br />

    //         <div className={`${style.boxNFT}`}>
    //           <a href="#" className={`${style.aTagNft} bg-light`}>
    //             <span>
    //               <div className={`${style.nftCard}`}>
    //                 <FaWpexplorer /> View on etherscan <BsArrowRightShort />
    //               </div>
    //             </span>
    //           </a>

    //           <a
    //             href={myNFTDetail.image}
    //             className={`${style.aTagNft} bg-light`}
    //           >
    //             <span>
    //               <div className={`${style.nftCard}`}>
    //                 <SiIpfs /> View on IPFS <BsArrowRightShort />
    //               </div>
    //             </span>
    //           </a>

    //           <a href={_ipfsHash} className={`${style.aTagNft} bg-light`}>
    //             <span>
    //               <div className={`${style.nftCard}`}>
    //                 <GrDatabase /> View IPFS Metadata <BsArrowRightShort />
    //               </div>
    //             </span>
    //           </a>
    //         </div>

    //         <p className="card-text color-dots">
    //           {/* Available in five different colors */}
    //         </p>
    //         <div className="text-right">
    //           <button className="btn btn-block btn-primary">
    //             Buy now
    //             <i className="lnr lnr-chevron-right pl-2"></i>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
