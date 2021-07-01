import { ethers } from "ethers";
import { useVerifyAccountHasMintRole } from "../../../../lib/hooks/useVerifyAccountHasMintRole";

export const VerifyAndSetupMinterRole = ({
    accountAddress,
}: {
    accountAddress: string;
}) => {

  const { data: verifyMintRoleData, loading: verifyMintRoleLoading } =
    useVerifyAccountHasMintRole(accountAddress ?? ethers.constants.AddressZero);

  if (verifyMintRoleLoading) return <></>;

  const hasMinterRole = verifyMintRoleData?.verifyMintRole ?? false;

  return (
    <div>
      {accountAddress ?? ethers.constants.AddressZero} {" "} <span className="badge bg-warning">{hasMinterRole ? "Minter":"Not A Minter"}</span>
    </div>
  );
};
