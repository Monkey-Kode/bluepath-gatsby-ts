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
