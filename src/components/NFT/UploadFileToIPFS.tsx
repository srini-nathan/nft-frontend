import { useEffect, useState } from "react";
import DragDropFileUploadLg from "../DragDropFileUploadLg";
import { v4 as uuidv4 } from "uuid";
import { convertGuidToInt } from "../common/convertGuidToInt";
import { ethers } from "ethers";
import { MetaDetailsContainer } from "./MetaDetailsContainer";
import { createImage, PINATA_BASE_GATEWAY_URL } from "../../services/nft/ipfs";
import hash from "object-hash";
import { uploadMetadata } from "./uploadMetadata";
import { useCreateIPFS } from "../../lib/hooks/useCreateIPFS";
import { Spinner } from "../common/spinner";
import ErrorMessage from "../common/ErrorMessage";
import _ from "lodash";
import useNotification from "../../lib/hooks/useNotification";
import NotificationDrawer from "../../components/NotificationDrawer/NotificationDrawer";
import useCurrentUser from "../../lib/hooks/useCurrentUser";
import { ViewNFTList } from "./ViewNFTList";
import { Container } from "react-bootstrap";
import { Collectables } from "./Collectables";

export const UploadFileToIPFS = ({
  provider,
}: {
  provider: 0 | ethers.providers.JsonRpcProvider | undefined;
}) => {
  const [formFile, setFormFile] = useState<File | null>(null);
  const { createNFT_IPFS, data, loading } = useCreateIPFS();
  const { data: myData, loading: meLoading } = useCurrentUser();
  const [errors, setErrors] = useState<string[]>([]);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (data) {
      addNotification("IPFS hash created successfully");
    }
  }, [data]);

  const patentId = convertGuidToInt(uuidv4()).toString();
  const signer = provider && provider.getSigner();

  let metadata = {
    patentId: patentId,
    name: "",
    description: "",
    image: "",
    media: {
      dimensions: "",
      size: formFile?.size,
      mimeType: "",
    },
  };

  const uploadToIPFS = async ({
    name,
    description,
    assetFileName,
    ipfsHash,
    mimeType,
  }: {
    name: string;
    description: string;
    assetFileName: string;
    ipfsHash: string;
    mimeType: string;
  }) => {
    const image = await createImage(formFile!);
    const jsonMetaDataInfo = {
      ...metadata,
      name,
      description,
      assetFileName,
      image: `${PINATA_BASE_GATEWAY_URL}${ipfsHash}`,
      media: {
        ...metadata.media,
        dimensions: `${image.width}x${image.height}`,
        mimeType: mimeType,
      },
    };

    const authenticateMetaData = hash(jsonMetaDataInfo);

    const jsonMetaDataInfoWithSign = {
      ...jsonMetaDataInfo,

      authentication: {
        metaDataHash: authenticateMetaData,
        signature: signer && (await signer.signMessage(authenticateMetaData)),
        creator: signer && (await signer.getAddress()),
      },
    };

    const metaDataHash =
      jsonMetaDataInfoWithSign.authentication.signature &&
      (await uploadMetadata(
        jsonMetaDataInfoWithSign,
        jsonMetaDataInfoWithSign.authentication.signature
      ));

    if (loading || meLoading) return <Spinner size={30} />;

    try {
      createNFT_IPFS({
        ipfsHash: metaDataHash,
        assetIndex:patentId,
        nftId: myData?.me?.nft?.id ?? null,
      });
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

  return (
    <>
      <ErrorMessage errors={errors} />
      <NotificationDrawer />
      <DragDropFileUploadLg setFormFile={setFormFile} />
      <hr />
      <MetaDetailsContainer formFile={formFile} uploadToIPFS={uploadToIPFS} />
      <br />
      <br />
      <hr/>
      <Container fluid>
        <ViewNFTList />
      </Container>
      <hr/>
      <br/>
      <br/>
      <Container fluid>
        <Collectables/>
      </Container>
    </>
  );
};
