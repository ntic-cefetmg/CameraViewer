import { BaseEntity } from './../../shared';

export class Screen implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public cameras?: BaseEntity[],
    ) {
    }
}
