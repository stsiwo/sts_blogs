export declare type SortType = {
  value: number
  title: string
}

export enum SortEnum {
  DATE_ASC = 0,
  DATE_DESC = 1,
  TITLE_ASC = 2,
  TITLE_DESC = 3,
  CLAP_ASC= 4,
  CLAP_DESC= 5,
}

export const sortList: SortType[] = [
  {
    title: 'Date Asc',
    value: SortEnum.DATE_ASC 
  },
  {
    title: 'Title Asc',
    value: SortEnum.TITLE_ASC 
  },
  {
    title: 'Clap Asc',
    value: SortEnum.CLAP_ASC 
  },
  {
    title: 'Date Desc',
    value: SortEnum.DATE_DESC 
  },
  {
    title: 'Title Desc',
    value: SortEnum.TITLE_DESC 
  },
  {
    title: 'Clap Desc',
    value: SortEnum.CLAP_DESC 
  },
]
