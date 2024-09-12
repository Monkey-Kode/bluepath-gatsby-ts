import React from "react";
import Housing from "../images/housing.svg";
import Industrial from "../images/industrial.svg";
import School from "../images/school.svg";
import Office from "../images/office.svg";
import University from "../images/university.svg";
import Government from "../images/government.svg";
import Hospital from "../images/hospital.svg";

export const getImageComponent = (entity: readonly (string | null)[]) => {
  const sanitizeEntity = String(entity).toLowerCase().trim();
  if (sanitizeEntity.includes("residential")) {
    return <Housing />;
  } else if (sanitizeEntity.includes("commercial")) {
    return <Office />;
  } else if (
    sanitizeEntity.includes("school") ||
    sanitizeEntity.includes("education")
  ) {
    return <School />;
  } else if (
    sanitizeEntity.includes("industrial") ||
    sanitizeEntity.includes("agricultural")
  ) {
    return <Industrial />;
  } else if (sanitizeEntity.includes("university")) {
    return <University />;
  } else if (sanitizeEntity.includes("municipal")) {
    return <Government />;
  } else if (sanitizeEntity.includes("hospital")) {
    return <Hospital />;
  }

  return null;
};
