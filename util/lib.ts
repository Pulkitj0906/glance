export type DataType = {
  id: number;
  slug: string;
  name: string;
  pfp: string | null;
  grids: GridType[];
  bio: string;
  Users: { email: string };
};
export type GridType = {
  title: string;
  link: string;
  favicon: string;
  id: string;
  username?: string;
  type?: string;
  span?: number[];
};
