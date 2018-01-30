import { Camera } from './../camera';

export class Screen implements Camera {
    constructor(
        public id?: number,
        public description?: string,
        public cameras?: Camera[],
    ) {
    }
}
