import {MessageType} from "@/constants/MessageType";

export interface IMessage extends Object {

  name: MessageType;

  data: any;

}
