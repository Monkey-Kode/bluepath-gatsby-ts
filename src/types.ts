export interface Page {
  description: string;
  hidetitle: boolean;
  id: string;
  name: string;
  slug: {
    current: string;
  };
  boxLocation: string;
  background: {
    asset: {
      gatsbyImageData: any;
    };
    crop: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
}
export interface Event {
  name: string;
  slug: {
    current: string;
  };
  content: {
    children: {
      text: string;
    }[];
  };
  description: string;
  eventAt: string;
  image: {
    asset: {
      gatsbyImageData: any;
    };
  };
}

export interface SanityContentType {
  name: string;
  id: number;
}
export interface SanityImageAsset {
  gatsbyImageData: any;
}
export interface SanityImage {
  asset: SanityImageAsset;
}
export interface SanityColor {
  hex: string;
}
export interface SanitySlug {
  current: string;
}
export interface SanitySpan {
  marks: string[];
  text: string;
}
export interface SanityBlock {
  _type: string;
  children: SanitySpan[];
  style: string;
  list: string;
}
export interface SanityPageContent {
  _id: string;
  contentType: SanityContentType;
  Heading: string;
  background: SanityImage;
  mobilebackground: SanityImage;
  backgroundColor: SanityColor;
  content: string;
  description: string;
  hidetitle: boolean;
  id: number;
  name: string;
  sectionContentCTAjumpId: string;
  sectionContentCTApageLink: SanityPage;
  sectionContentCTAtext: string;
  sectionContentCTAurl: string;
  sectionHeadingPosition: boolean;
  seotitle: string;
  slug: SanitySlug;
  boxLocation: string;
  richcontent: SanityBlock[];
}
export interface SanityPage {
  content: SanityPageContent;
}
export interface SanityEventContent {
  id: number;
  name: string;
  slug: SanitySlug;
  image: SanityImage;
  description: string;
  content: SanityBlock[];
  eventAt: string;
}
export interface SanityEvent {
  content: SanityEventContent;
}
export interface SanityPageResponse {
  data: {
    allSanityPage: {
      nodes: SanityPageContent[];
    };
  };
}
export interface SanityEventResponse {
  data: {
    allSanityEvent: {
      nodes: SanityEventContent[];
    };
  };
}

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
