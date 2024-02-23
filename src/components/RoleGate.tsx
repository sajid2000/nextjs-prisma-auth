"use client";

import { UserRole } from "@prisma/client";

import FormError from "@/components/FormError";
import { useCurrentRole } from "@/hooks/use-current-role";

interface Props {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You do not have permission to view this content!" />;
  }

  return children;
};

export default RoleGate;
