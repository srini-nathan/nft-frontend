import style from "./MakePatent.module.css";
import { GrDatabase } from "react-icons/gr";
import { SiIpfs } from "react-icons/si";
import { FaWpexplorer } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";
import { Contract, ethers } from "ethers";
import { Card, Row } from "react-bootstrap";
import { GetMyIpfsHashDetail } from "../../../lib/hooks/useFetchNFTDetail";
import { GetBaseEtherscanURL } from "../../common/Helper";
import ErrorMessage from "../../common/ErrorMessage";
import _ from "lodash";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { MakePatentForm } from "./MakePatentForm";
import { useState } from "react";
import { useNotification } from "../../../lib/useNotification";

export const MakePatentContainer = ({
  myNFTDetail,
  tokenId,
  ethUSD,
  _ipfsHash,
  _assetPrice,
  isAssetOnSale,
  instance,
  tokenOwner
}: {
  myNFTDetail: GetMyIpfsHashDetail;
  tokenId: string;
  ethUSD: number;
  _ipfsHash: string;
  _assetPrice: number;
  isAssetOnSale: boolean;
  instance: Contract | undefined;
  tokenOwner:boolean
}) => {
  const baseURL = GetBaseEtherscanURL();
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();

  const buyNFT = async (values: { tokenId: Number }) => {
    console.log(values.tokenId);

    try {
      let transactionObject;
      transactionObject = instance && (await instance.buyNFT(values.tokenId));

      const TransactionReceipt =
        instance &&
        (await instance?.provider.waitForTransaction(transactionObject.hash));
      if (TransactionReceipt) {
        success("Success", "Transaction executed successfully");
      }
    } catch (error) {
      console.log(error);
      const graphQLErrors = _.get(error, "graphQLErrors", [error]);
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message];
        },
        []
      );
      setErrors([...errorMessages]);
    }
  };
  const formik = useFormik({
    initialValues: { tokenId: Number(tokenId) },
    onSubmit: async (
      values: { tokenId: Number },
      formikHelpers: FormikHelpers<any>
    ) => {
      await buyNFT(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <Card className="justify-content-md-center border-0">
      <Card.Header className="border-0">
        <h4>{myNFTDetail.name}</h4>
      </Card.Header>
      <Row>
        <div className="col-lg-6 col-md-6 mb-4">
          <Card.Img
            variant="top"
            src={myNFTDetail.image}
            style={{ width: "350px" }}
          />
        </div>
        <div className="col-lg-6 col-md-6 mb-4">
          <div className="justify-content-start">
            <b>Description :</b>
            <br />
            <div>{myNFTDetail.description}</div>
          </div>
          <hr />
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
          <br />
          <div>
            <h6 className="font-weight-bold mb-2">
              <div className=" d-flex justify-content-between">
                <div>{myNFTDetail.media.mimeType}</div>
                <div>{myNFTDetail.media.dimensions}</div>
                <div>{(myNFTDetail.media.size ?? 0) / 1000} KB</div>
              </div>
            </h6>
          </div>
          <hr />
          <Card.Title>
            <h2 className="border border-0">{_assetPrice} ETH</h2>
            <strong>
              $
              {(
                parseFloat(
                  ethers.utils.formatEther(
                    ethers.utils.parseEther(_assetPrice.toString())
                  )
                ) * ethUSD
              ).toFixed(2)}
            </strong>
          </Card.Title>

          <ErrorMessage errors={errors} />
          {isAssetOnSale ? (
            <FormikProvider value={formik}>
              <Form>
              {!tokenOwner  ? <MakePatentForm formik={formik} />: <h3 style={{ color: "red" }}>It is your token</h3>}
              </Form>
            </FormikProvider>
          ) : (
            <h2 style={{ color: "red" }}>Sold</h2>
          )}
        </div>
      </Row>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};
