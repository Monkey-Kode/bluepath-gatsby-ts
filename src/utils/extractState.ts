const STATE_ABBREVIATIONS: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia",
};

const STATE_NAMES = new Set(
  Object.values(STATE_ABBREVIATIONS).map((s) => s.toLowerCase()),
);

export function extractState(address: string | null | undefined): string | null {
  if (!address) return null;

  const normalized = address.replace(/[\t\n]+/g, " ").trim();

  // Try two-letter abbreviation before a ZIP code: "City, TX 78249"
  const abbrMatch = normalized.match(/\b([A-Z]{2})\s+\d{5}/);
  if (abbrMatch && STATE_ABBREVIATIONS[abbrMatch[1]]) {
    return STATE_ABBREVIATIONS[abbrMatch[1]];
  }

  // Try full state name (case-insensitive)
  for (const [abbr, name] of Object.entries(STATE_ABBREVIATIONS)) {
    const re = new RegExp(`\\b${name}\\b`, "i");
    if (re.test(normalized)) {
      return name;
    }
  }

  // Try standalone two-letter abbreviation at end: "City, TX"
  const trailingAbbr = normalized.match(/\b([A-Z]{2})\s*$/);
  if (trailingAbbr && STATE_ABBREVIATIONS[trailingAbbr[1]]) {
    return STATE_ABBREVIATIONS[trailingAbbr[1]];
  }

  return null;
}
