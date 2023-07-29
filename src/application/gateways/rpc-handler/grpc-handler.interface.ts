export const GRPC_HANDLER = 'my_list_service_handler';
export interface MyListServiceHandler {
  searchByMemberCode(
    uid: string,
    userCd: string,
  ): Promise<SearchByMemberCodeRes>;
}
export type SearchByMemberCodeRes = {
  corporationCdList: string[];
};
