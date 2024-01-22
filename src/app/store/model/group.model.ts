import { Member } from "./member.model";

export interface Group {
   id: string;
  groupName: string;
  adminName: string;
   members: Member[];
  isModified?: boolean;
}
