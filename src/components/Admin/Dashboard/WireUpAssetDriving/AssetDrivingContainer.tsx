import { useState } from "react";
import _ from "lodash";
import ErrorMessage from "../../../common/ErrorMessage";

import { useNotification } from "../../../../lib/useNotification";
import { Contract } from "ethers";

export type ListForSaleSubmitT = {
  listOverMarkerInput: { _tokenId: number; _price: number };
};

export const AssetDrivingContainer = ({
  instance,
  drivingInstance,
}: {
  instance: Contract | undefined;
  drivingInstance: Contract | undefined;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();
  

  const addToDrivingMember = async () => {
    let transactionObject;
    try {
      transactionObject =
        instance &&
        drivingInstance &&
        (await drivingInstance.registerMember(instance.address));

      const TransactionReceipt =
        drivingInstance &&
        (await drivingInstance?.provider.waitForTransaction(
          transactionObject.hash
        ));
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

  return (
    <>
      <ErrorMessage errors={errors} />

      <div className="row">
        <div className="col-lg-3">
          <button
            className="btn btn-primary w-100"
            onClick={addToDrivingMember}
            type="submit"
          >
            WireUp
          </button>
        </div>
      </div>
    </>
  );
};
