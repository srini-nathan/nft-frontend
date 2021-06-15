import { FormikHelpers, useFormik, FormikProvider, Form } from "formik";
import { InitialMetaDetailsSchema } from "../../schemaValidation/InitialMetaDetailsSchema";
import { pinFileToIPFS } from "../../services/nft/ipfs";
import { MetaDetailsForm } from "./MetaDetailsForm";
import fileType from "file-type";

const initialMetaDetailsValues = {
  nftName: "",
  nftDescription: "",
};

export type InitialMetaDetailsFormSubmitT = {
  nftName: string;
  nftDescription: string;
};

export const MetaDetailsContainer = ({
  formFile,
  uploadToIPFS,
}: {
  formFile: File | null;
  uploadToIPFS: ({
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
  }) => void;
}) => {
  const submitMetaDataInfoToIPFS = async (
    values: InitialMetaDetailsFormSubmitT
  ) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(formFile!);
    reader.onloadend = async () => {
      const ipfsContent = reader.result;
      const fileBuffer = Buffer.from(ipfsContent as Uint8Array);
      const type = await fileType.fromBuffer(fileBuffer);
      const fileName = formFile?.name ?? `unknown.${type?.ext}`;

      let IpfsHash: string = "";
      if (type?.mime.startsWith("image")) {
        try {
          const pinFileResult = await pinFileToIPFS(formFile!);
          IpfsHash = pinFileResult.data && pinFileResult.data.IpfsHash;
        } catch (error) {
          console.log(error);
          return
        }
      }

      uploadToIPFS({
        name: values.nftName,
        description: values.nftDescription,
        assetFileName: fileName,
        mimeType: type?.mime ?? fileName,
        ipfsHash: IpfsHash ?? "",
      });
    };
  };

  const formik = useFormik({
    initialValues: initialMetaDetailsValues,
    validationSchema: InitialMetaDetailsSchema,
    onSubmit: async (
      values: InitialMetaDetailsFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await submitMetaDataInfoToIPFS(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <MetaDetailsForm formik={formik} formFile={formFile} />
      </Form>
    </FormikProvider>
  );
};
