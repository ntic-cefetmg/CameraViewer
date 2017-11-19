import { BaseEntity, User } from './../../shared';

export class Camera implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public accessURL?: string,
        public usersWithAccesses?: User[],
    ) {
    }
}
