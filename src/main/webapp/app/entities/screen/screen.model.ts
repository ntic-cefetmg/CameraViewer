import { BaseEntity, User } from './../../shared';

export class Screen implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public cameras?: BaseEntity[],
        public usersWithAccesses?: User[],
    ) {
    }
}
