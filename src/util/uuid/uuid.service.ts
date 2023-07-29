import { v4 as uuidV4 } from 'uuid';

export class UuidService {
  static getUuid(): string {
    return uuidV4();
  }
}
