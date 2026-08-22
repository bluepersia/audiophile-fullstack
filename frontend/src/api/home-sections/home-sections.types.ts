type SectionData = {
  id: number;
  sectionType?: number;
  productSlug: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  description?: string;
  alt: string;
  alias?: string;
};

export type { SectionData };
