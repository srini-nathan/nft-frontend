import { WireUpAssetDriving } from "./Dashboard/WireUpAssetDriving";
import { AllUserDetails } from "./Dashboard/AllUserDetails";
import { Row, Col } from "react-bootstrap";
import { ProvideMinterRole } from "./Dashboard/ProvideMinterRole";

export const AdminLayout = () => {
  return (
    <>
      <WireUpAssetDriving />

      <ProvideMinterRole />

      <br />

      <AllUserDetails />
    </>
  );
};
