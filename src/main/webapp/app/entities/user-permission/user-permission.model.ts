import { BaseEntity, User } from './../../shared';

export class UserPermission implements BaseEntity {
    constructor(
        public id?: number,
        public user?: User,
        public camerasThatHaveAccesses?: BaseEntity[],
    ) {
    }
}
